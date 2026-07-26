import nodemailer from 'nodemailer';

export function createMailTransporter() {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatRows(rows: Array<[string, string | number | boolean | null | undefined]>) {
  return rows
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([label, value]) => {
      const safe = escapeHtml(String(value));
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;width:40%;font-weight:600;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;word-break:break-word;">${safe}</td>
      </tr>`;
    })
    .join('');
}
