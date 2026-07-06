import { NextResponse } from 'next/server';
import { addSubmission, addLog } from '../../../lib/store';

export async function POST(request) {
  try {
    const data = await request.json();
    const { fullName, email, phone, countryCode, message, gclid, utm_source, utm_medium, utm_campaign } = data;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const submission = {
      type: 'contact',
      fullName, email,
      phone: `${countryCode} ${phone}`,
      message,
      gclid: gclid || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
    };

    await addSubmission(submission);
    await addLog({ type: 'form', event: 'contact_submitted', detail: `${fullName} (${email})` });

    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Zeemaa Website" <${process.env.SMTP_USER}>`,
        to: 'hello@zeemaa.com',
        replyTo: email,
        subject: `New Contact Form Submission: ${fullName}`,
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\nMessage:\n${message}\n\nAttribution:\nGCLID: ${gclid || 'N/A'}\nUTM Source: ${utm_source || 'N/A'}\nUTM Medium: ${utm_medium || 'N/A'}\nUTM Campaign: ${utm_campaign || 'N/A'}`,
      });
    } catch (emailErr) {
      console.error('Email send failed (submission still saved):', emailErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
