// HubSpot lead creation — DORMANT STUB for a later version.
//
// The pipeline calls this on every submission, but it no-ops until
// HUBSPOT_ACCESS_TOKEN is set. When you activate it (Phase 4 of the
// architecture), implement inside the `if (token)` block:
//   1. Upsert a Contact (dedupe on email) via
//      POST /crm/v3/objects/contacts  (idProperty=email)
//   2. Create a Lead via POST /crm/v3/objects/leads (hs_lead_status = NEW)
//   3. Associate the Lead to the Contact
// Map fields per the field-mapping table in the architecture doc.

export async function createHubSpotLead({ form, meta }) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    return { created: false, reason: 'HUBSPOT_ACCESS_TOKEN not set (integration dormant)' };
  }

  // --- Placeholder property mapping (ready for activation) -------------
  // const properties = {
  //   email: form.email,
  //   firstname: form.name.split(' ')[0],
  //   lastname: form.name.split(' ').slice(1).join(' '),
  //   phone: form.whatsapp,
  //   country: form.country,
  //   ukmla_enquiry_message: form.message,
  //   lead_source: 'Website Contact Form',
  //   ukmla_ip_address: meta.ip,
  //   ukmla_geo_city: meta.location,
  //   ukmla_isp: meta.isp,
  //   ukmla_hostname: meta.hostname,
  //   ukmla_browser: meta.browser,
  //   ukmla_os: meta.os,
  //   ukmla_device_type: meta.deviceType,
  //   ukmla_timezone: meta.timezone,
  //   ukmla_language: meta.language,
  //   ukmla_referrer_url: meta.referrer,
  //   ukmla_landing_page: meta.page,
  //   ukmla_utm_source: meta.utm?.utm_source,
  //   ukmla_utm_medium: meta.utm?.utm_medium,
  //   ukmla_utm_campaign: meta.utm?.utm_campaign,
  // };
  // ... call the HubSpot CRM v3 API here ...

  return { created: false, reason: 'HubSpot integration not yet activated' };
}
