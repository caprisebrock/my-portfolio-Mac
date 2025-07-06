import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Ensure this route only runs on the server
export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.clone().json()
    console.log('👉 [contact API] received:', body)
    const { name, email, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `[Website] ${subject || 'New message'}`,
      html: `
        <b>Name:</b> ${name}<br/>
        <b>Email:</b> ${email}<br/>
        <b>Subject:</b> ${subject || ''}<br/>
        <b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    )
  }
} 