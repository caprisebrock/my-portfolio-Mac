import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure your SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: Request) {
  // 1) Log incoming data for debugging
  const body = await req.clone().json()
  console.log('👉 [contact] received body:', body)

  const { name, email, subject, message } = body

  // 2) Basic validation
  if (!name || !email || !message) {
    console.log('⚠️ [contact] missing fields:', { name, email, message })
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  try {
    // 3) Send the email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `[Website] ${subject || 'New message'}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '(none)'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    console.log('✅ [contact] email sent successfully')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ [contact] error sending email:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
