import { NextRequest, NextResponse } from 'next/server';
import { createMailTransporter, formatRows } from '@/lib/mailer';

const recentVisits = new Map<string, number>();
const RATE_LIMIT_MS = 30 * 60 * 1000;

type ClientVisitPayload = {
  url?: string;
  pathname?: string;
  referrer?: string;
  language?: string;
  languages?: string[];
  platform?: string;
  userAgent?: string;
  vendor?: string;
  cookieEnabled?: boolean;
  doNotTrack?: string | null;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  maxTouchPoints?: number;
  screenWidth?: number;
  screenHeight?: number;
  screenAvailWidth?: number;
  screenAvailHeight?: number;
  screenColorDepth?: number;
  screenPixelDepth?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  devicePixelRatio?: number;
  timezone?: string;
  timezoneOffset?: number;
  connectionType?: string;
  connectionEffectiveType?: string;
  connectionDownlink?: number;
  connectionRtt?: number;
  connectionSaveData?: boolean;
  localTime?: string;
  sessionId?: string;
};

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function isBot(userAgent: string) {
  return /bot|crawl|spider|slurp|facebookexternalhit|preview|headless/i.test(userAgent);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ClientVisitPayload;
    const ip = getClientIp(request);
    const serverUserAgent = request.headers.get('user-agent') || body.userAgent || '';
    const now = Date.now();

    if (isBot(serverUserAgent)) {
      return NextResponse.json({ skipped: true, reason: 'bot' });
    }

    const lastVisit = recentVisits.get(ip);
    if (lastVisit && now - lastVisit < RATE_LIMIT_MS) {
      return NextResponse.json({ skipped: true, reason: 'rate_limit' });
    }

    const transporter = createMailTransporter();
    if (!transporter || !process.env.SMTP_EMAIL) {
      return NextResponse.json(
        { error: 'Configuração de e-mail não encontrada' },
        { status: 500 }
      );
    }

    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-country-code');
    const region =
      request.headers.get('x-vercel-ip-country-region') ||
      request.headers.get('x-region');
    const city = request.headers.get('x-vercel-ip-city');

    const rows: Array<[string, string | number | boolean | null | undefined]> = [
      ['Data/Hora (servidor)', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })],
      ['Horário local do visitante', body.localTime],
      ['IP', ip],
      ['País', country],
      ['Região', region],
      ['Cidade', city],
      ['URL', body.url],
      ['Pathname', body.pathname],
      ['Referrer (cliente)', body.referrer || 'Direto / sem referrer'],
      ['Referer (header)', request.headers.get('referer')],
      ['Idioma principal', body.language],
      ['Idiomas', body.languages?.join(', ')],
      ['Accept-Language', request.headers.get('accept-language')],
      ['Timezone', body.timezone],
      ['Timezone offset (min)', body.timezoneOffset],
      ['Plataforma', body.platform],
      ['Vendor', body.vendor],
      ['User-Agent (cliente)', body.userAgent],
      ['User-Agent (servidor)', serverUserAgent],
      ['Cookies habilitados', body.cookieEnabled],
      ['Do Not Track', body.doNotTrack],
      ['CPU cores', body.hardwareConcurrency],
      ['Device Memory (GB)', body.deviceMemory],
      ['Max touch points', body.maxTouchPoints],
      ['Tela', body.screenWidth && body.screenHeight ? `${body.screenWidth}x${body.screenHeight}` : undefined],
      ['Tela disponível', body.screenAvailWidth && body.screenAvailHeight ? `${body.screenAvailWidth}x${body.screenAvailHeight}` : undefined],
      ['Color depth', body.screenColorDepth],
      ['Pixel depth', body.screenPixelDepth],
      ['Viewport', body.viewportWidth && body.viewportHeight ? `${body.viewportWidth}x${body.viewportHeight}` : undefined],
      ['Device Pixel Ratio', body.devicePixelRatio],
      ['Conexão (type)', body.connectionType],
      ['Conexão (effectiveType)', body.connectionEffectiveType],
      ['Downlink (Mbps)', body.connectionDownlink],
      ['RTT (ms)', body.connectionRtt],
      ['Save-Data', body.connectionSaveData],
      ['Session ID', body.sessionId],
      ['Host', request.headers.get('host')],
      ['Origin', request.headers.get('origin')],
      ['Sec-CH-UA', request.headers.get('sec-ch-ua')],
      ['Sec-CH-UA-Mobile', request.headers.get('sec-ch-ua-mobile')],
      ['Sec-CH-UA-Platform', request.headers.get('sec-ch-ua-platform')],
    ];

    const tableHtml = formatRows(rows);
    const textBody = rows
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `[Portfólio] Nova visita — ${country || ip}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;padding:20px;background:#f4f4f5;">
          <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 10px rgba(0,0,0,.08);">
            <h2 style="margin:0 0 8px;color:#2563eb;">Nova visita no portfólio</h2>
            <p style="margin:0 0 20px;color:#666;font-size:14px;">Detalhes coletados do navegador e da requisição.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${tableHtml}
            </table>
          </div>
        </div>
      `,
      text: `Nova visita no portfólio\n\n${textBody}`,
    });

    recentVisits.set(ip, now);

    for (const [key, timestamp] of recentVisits.entries()) {
      if (now - timestamp > RATE_LIMIT_MS) {
        recentVisits.delete(key);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erro ao notificar visita:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
