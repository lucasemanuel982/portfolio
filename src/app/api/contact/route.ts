import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: 'Corpo da requisição vazio' },
        { status: 400 }
      );
    }
    const { email, name, subject, message } = await request.json();

    // Validação dos campos obrigatórios
    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação das variáveis de ambiente
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('Variáveis de ambiente SMTP não configuradas');
      return NextResponse.json(
        { error: 'Configuração de e-mail não encontrada' },
        { status: 500 }
      );
    }

    // Configuração do transporter para Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Configuração do e-mail
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // E-mail de destino (seu e-mail)
      replyTo: email, // E-mail do remetente para resposta
      subject: `[Portfólio] ${subject} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Nova mensagem do portfólio
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">Informações do remetente:</h3>
              <p style="margin: 5px 0;"><strong>Nome:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>E-mail:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Assunto:</strong> ${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">Mensagem:</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
              <p>Esta mensagem foi enviada através do formulário de contato do seu portfólio.</p>
              <p>Você pode responder diretamente para este e-mail para entrar em contato com ${name}.</p>
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
        
        ---
        Esta mensagem foi enviada através do formulário de contato do seu portfólio.
        Você pode responder diretamente para este e-mail para entrar em contato com ${name}.
      `,
    };

    // Envio do e-mail
    await transporter.sendMail(mailOptions);

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
