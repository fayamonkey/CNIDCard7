import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '@/config';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.idCardBase64) {
      return NextResponse.json(
        { error: 'Missing required fields: email and idCardBase64 are required' },
        { status: 400 }
      );
    }
    
    const { email, idCardBase64, userName } = body;
    
    // In a real application, this would:
    // 1. Use a service like SendGrid, AWS SES, or Nodemailer to send emails
    // 2. Attach the ID card as a PDF
    // 3. Track email sending status
    
    // For demo purposes, we'll just pretend we sent the email
    console.log(`Would send ID card to ${email} for user ${userName || 'Unknown'}`);
    
    // A real implementation would look something like this:
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
    
    const pdfBuffer = Buffer.from(idCardBase64.split(',')[1], 'base64');
    
    await transporter.sendMail({
      from: `${APP_CONFIG.name} <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Your ${APP_CONFIG.name} ID Card`,
      text: `Dear ${userName || 'Citizen'},\n\nThank you for registering with ${APP_CONFIG.name}. Your official digital ID card is attached to this email.\n\nBest regards,\nThe ${APP_CONFIG.name} Team`,
      html: `
        <h1>Welcome to ${APP_CONFIG.name}!</h1>
        <p>Dear ${userName || 'Citizen'},</p>
        <p>Thank you for registering with ${APP_CONFIG.name}. Your official digital ID card is attached to this email.</p>
        <p>Best regards,<br>The ${APP_CONFIG.name} Team</p>
      `,
      attachments: [
        {
          filename: `${APP_CONFIG.name}_ID_Card.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
    */
    
    return NextResponse.json({
      success: true,
      message: 'ID card sent successfully',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 