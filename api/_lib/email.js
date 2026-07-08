// Team-notification email: builds the "Form details / Technical details"
// message and sends it via the Resend REST API. Dormant until RESEND_API_KEY
// is set — in that case it no-ops and reports { sent: false }.

function esc(v) {
  if (v === undefined || v === null || v === '') return '—';
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 16px;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eef2f7;">${esc(label)}</td>
    <td style="padding:8px 16px;color:#0f172a;font-size:14px;font-weight:600;vertical-align:top;border-bottom:1px solid #eef2f7;">${value}</td>
  </tr>`;
}

function section(title, rowsHtml) {
  return `<div style="margin:0 0 24px;">
    <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;font-weight:700;margin:0 0 8px;">${esc(title)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#ffffff;border:1px solid #eef2f7;border-radius:10px;overflow:hidden;">
      ${rowsHtml}
    </table>
  </div>`;
}

/** Builds the HTML body from normalized { form, meta }. */
export function buildLeadEmailHtml({ form, meta }) {
  const messageHtml = esc(form.message).replace(/\n/g, '<br>');

  const formRows = [
    row('Name', esc(form.name)),
    row('Email', `<a href="mailto:${esc(form.email)}" style="color:#2563eb;text-decoration:none;">${esc(form.email)}</a>`),
    row('WhatsApp', esc(form.whatsapp)),
    row('Country', esc(form.country)),
    row('Message', messageHtml),
  ].join('');

  const utm = meta.utm || {};
  const utmRows = Object.keys(utm).length
    ? Object.entries(utm).map(([k, v]) => row(k, esc(v))).join('')
    : '';

  const techRows = [
    row('IP address', esc(meta.ip)),
    row('Location', esc(meta.location)),
    row('ISP', esc(meta.isp)),
    row('Hostname (DNS)', esc(meta.hostname)),
    row('Device', esc(meta.device)),
    row('Device type', esc(meta.deviceType)),
    row('Browser', esc(meta.browser)),
    row('OS', esc(meta.os)),
    row('Timezone', esc(meta.timezone)),
    row('Language', esc(meta.language)),
    row('Screen / viewport', esc([meta.screen, meta.viewport].filter(Boolean).join(' / '))),
    row('Page', meta.page ? `<a href="${esc(meta.page)}" style="color:#2563eb;text-decoration:none;">${esc(meta.page)}</a>` : '—'),
    row('Referrer', esc(meta.referrer)),
    row('Received', esc(meta.receivedAt)),
    utmRows,
  ].join('');

  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;color:#0f172a;margin:0 0 4px;">New UKMLA contact enquiry</h1>
      <p style="font-size:13px;color:#64748b;margin:0 0 24px;">A visitor submitted the contact form on the UKMLA website.</p>
      ${section('Form details', formRows)}
      ${section('Technical details', techRows)}
      <p style="font-size:11px;color:#94a3b8;margin:16px 0 0;">Sent automatically by the UKMLA lead pipeline. Reply directly to reach the enquirer.</p>
    </div>
  </body></html>`;
}

/**
 * Sends the notification via Resend. Returns a status object instead of
 * throwing so a mail outage never blocks the submission response.
 */
export async function sendLeadEmail({ subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.TEAM_INBOX || 'leads-test@trulaoverseas.com';
  const from = process.env.MAIL_FROM || 'UKMLA Leads <onboarding@resend.dev>';

  if (!key) {
    return { sent: false, reason: 'RESEND_API_KEY not set (pipeline dormant)' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { sent: false, reason: data?.message || `Resend HTTP ${res.status}` };
    }
    return { sent: true, id: data?.id };
  } catch (err) {
    return { sent: false, reason: String(err?.message || err) };
  }
}
