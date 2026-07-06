import { NextResponse } from 'next/server';
import { addSubmission, addLog } from '../../../lib/store';

export async function POST(request) {
  try {
    const data = await request.json();
    const { fullName, email, phone, countryCode, company, eventType, demoPreference, message, gclid, utm_source, utm_medium, utm_campaign } = data;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const submission = {
      type: 'demo',
      fullName, email,
      phone: `${countryCode} ${phone}`,
      company: company || null,
      eventType: eventType || null,
      demoPreference: demoPreference || null,
      message: message || null,
      gclid: gclid || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
    };

    addSubmission(submission);
    addLog({ type: 'form', event: 'demo_requested', detail: `${fullName} (${company || email})` });

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
        subject: `Demo Request: ${fullName} | ${company || 'Unknown Company'}`,
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\nCompany: ${company || 'N/A'}\nEvent Type: ${eventType || 'N/A'}\nDemo Preference: ${demoPreference || 'N/A'}\nDetails:\n${message || 'N/A'}\n\nAttribution:\nGCLID: ${gclid || 'N/A'}\nUTM Source: ${utm_source || 'N/A'}\nUTM Medium: ${utm_medium || 'N/A'}\nUTM Campaign: ${utm_campaign || 'N/A'}`,
      });
    } catch (emailErr) {
      console.error('Email send failed (submission still saved):', emailErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Demo form error:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
