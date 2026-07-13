// POST /api/submit-lead
// Single ingestion point for the contact form. Validates, enriches with
// server-side metadata, then fans out to (a) the team email and
// (b) the HubSpot lead stub — both independently, so one failing never
// blocks the other or the user's success response.

import {
  getClientIp,
  getVercelGeo,
  parseUserAgent,
  reverseDns,
  ipIntel,
} from './_lib/metadata.js';
import { buildLeadEmailHtml, sendLeadEmail } from './_lib/email.js';
import { createHubSpotLead } from './_lib/hubspot.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  // Body may arrive parsed (object) or raw (string) depending on runtime.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const {
    name = '',
    email = '',
    dialCode = '',
    whatsapp = '',
    country = '',
    message = '',
    website = '', // honeypot — real users never fill this
    clientMeta = {},
  } = body;

  // Silently accept & drop bot submissions (honeypot tripped).
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  // Minimal server-side validation (mirrors the client rules).
  if (!String(name).trim() || !/\S+@\S+\.\S+/.test(email) || !String(message).trim()) {
    res.status(400).json({ ok: false, error: 'Missing or invalid required fields.' });
    return;
  }

  // --- Server-side enrichment ------------------------------------------
  const ip = getClientIp(req);
  const geo = getVercelGeo(req);
  const ua = req.headers['user-agent'] || clientMeta.userAgent || '';
  const uaParsed = parseUserAgent(ua);
  const [hostname, intel] = await Promise.all([reverseDns(ip), ipIntel(ip)]);

  const location = [
    geo.city || intel.city,
    geo.countryRegion || intel.region,
    geo.country || intel.country,
  ].filter(Boolean).join(', ');

  const meta = {
    ip,
    location,
    isp: intel.isp || intel.org || '',
    hostname: hostname || intel.hostname || '',
    device: uaParsed.device,
    deviceType: uaParsed.deviceType,
    browser: uaParsed.browser,
    os: uaParsed.os,
    timezone: clientMeta.timezone || geo.timezone || '',
    language: clientMeta.language || req.headers['accept-language'] || '',
    screen: clientMeta.screen || '',
    viewport: clientMeta.viewport || '',
    page: clientMeta.page || req.headers.referer || '',
    referrer: clientMeta.referrer || req.headers.referer || 'direct',
    userAgent: ua,
    utm: clientMeta.utm || {},
    receivedAt: new Date().toISOString(),
  };

  const form = {
    name: String(name).trim(),
    email: String(email).trim(),
    whatsapp: `${dialCode} ${whatsapp}`.trim(),
    country,
    message: String(message).trim(),
  };

  // --- Fan out (never rejects) -----------------------------------------
  const html = buildLeadEmailHtml({ form, meta });
  const [emailResult, hubspotResult] = await Promise.allSettled([
    sendLeadEmail({ subject: `New UKMLA enquiry — ${form.name}`, html, replyTo: form.email }),
    createHubSpotLead({ form, meta }),
  ]);

  // Surface any unexpected rejection in the server logs. Expected "dormant"
  // states (SMTP/HubSpot not configured) resolve with { sent/created: false }
  // and are logged closer to the source; this catches genuine throws.
  if (emailResult.status === 'rejected') {
    console.error('[submit-lead] email task rejected:', emailResult.reason);
  }
  if (hubspotResult.status === 'rejected') {
    console.error('[submit-lead] hubspot task rejected:', hubspotResult.reason);
  }

  res.status(200).json({
    ok: true,
    email:
      emailResult.status === 'fulfilled'
        ? emailResult.value
        : { sent: false, reason: String(emailResult.reason) },
    hubspot:
      hubspotResult.status === 'fulfilled'
        ? hubspotResult.value
        : { created: false, reason: String(hubspotResult.reason) },
  });
}
