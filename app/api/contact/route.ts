import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Ensure this route only runs on the server
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('👉 [contact API] received:', body);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact form: ${body.subject}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    });
    console.log('✅ [contact] email sent successfully');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ [contact] error sending email:', err);
    return NextResponse.json(
      { error: `Failed to send message: ${err.message}` },
      { status: 500 }
    );
  }
} 