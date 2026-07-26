import { NextRequest, NextResponse } from 'next/server';
import { createMailTransporter, escapeHtml } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: 'Corpo da requisição vazio' },
        { status: 400 }
      );
    }

    const { email, name, subject, message } = await request.json();

    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const transporter = createMailTransporter();
    if (!transporter || !process.env.SMTP_EMAIL) {
      console.error('Variáveis de ambiente SMTP não configuradas');
      return NextResponse.json(
        { error: 'Configuração de e-mail não encontrada' },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `[Portfólio] ${subject} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Nova mensagem do portfólio
            </h2>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">Informações do remetente:</h3>
              <p style="margin: 5px 0;"><strong>Nome:</strong> ${safeName}</p>
              <p style="margin: 5px 0;"><strong>E-mail:</strong> ${safeEmail}</p>
              <p style="margin: 5px 0;"><strong>Assunto:</strong> ${safeSubject}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">Mensagem:</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
                ${safeMessage}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
              <p>Esta mensagem foi enviada através do formulário de contato do seu portfólio.</p>
              <p>Você pode responder diretamente para este e-mail para entrar em contato com ${safeName}.</p>
            </div>
          </div>
        </div>
      `,
      text: `
        Nova mensagem do portfólio

        Informações do remetente:
        Nome: ${name}
        E-mail: ${email}
        Assunto: ${subject}

        Mensagem:
        ${message}
      `,
    });

    return NextResponse.json(
      { message: 'E-mail enviado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
