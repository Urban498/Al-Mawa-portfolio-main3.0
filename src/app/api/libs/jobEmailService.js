import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_USE_SSL === 'True', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

// Send Job Application Confirmation Email
export async function sendJobApplicationEmail(
  email,
  firstName,
  lastName
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: '✅ Your Job Application Has Been Received - Al-Mawa International',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Application Received!</h1>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for your interest</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Greeting -->
                <p style="color: #333; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                  Hi <strong>${firstName}</strong>,
                </p>

                <!-- Main Message -->
                <p style="color: #555; font-size: 15px; margin: 0 0 25px 0; line-height: 1.8;">
                  We're excited to have received your job application! Your qualifications and interest in joining <strong>Al-Mawa International</strong> are much appreciated.
                </p>

                <!-- Application Details Box -->
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%); border-left: 4px solid #667eea; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <p style="color: #667eea; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">📋 Application Details</p>
                  
                  <div style="margin: 12px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Full Name</p>
                    <p style="color: #333; font-size: 16px; font-weight: 600; margin: 5px 0 0 0;">${firstName} ${lastName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Email Address</p>
                    <p style="color: #667eea; font-size: 15px; margin: 5px 0 0 0;">${email}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Submission Date</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <!-- What Happens Next -->
                <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 30px 0;">
                  <p style="color: #1e40af; font-weight: 700; margin: 0 0 12px 0; font-size: 14px;">⏭️ What Happens Next?</p>
                  <ol style="color: #1e40af; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Our HR team will review your application carefully</li>
                    <li style="margin-bottom: 8px;">We will evaluate your qualifications and experience</li>
                    <li style="margin-bottom: 8px;">If your profile matches our requirements, we'll contact you for further discussions</li>
                    <li>This process typically takes 5-7 business days</li>
                  </ol>
                </div>

                <!-- Tips Section -->
                <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 30px 0;">
                  <p style="color: #92400e; font-weight: 700; margin: 0 0 12px 0; font-size: 14px;">💡 Helpful Tips</p>
                  <ul style="color: #92400e; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Keep your email and phone number accessible</li>
                    <li style="margin-bottom: 8px;">Check your spam folder for our messages</li>
                    <li>Feel free to reach out if you have any questions</li>
                  </ul>
                </div>

                <!-- Closing Message -->
                <p style="color: #666; font-size: 15px; margin: 30px 0 20px 0; line-height: 1.8;">
                  We're impressed by your initiative and appreciate the time you've taken to apply. We look forward to learning more about you and exploring potential opportunities together.
                </p>

                <p style="color: #666; font-size: 15px; margin: 0;">
                  Best regards,<br>
                  <strong>The Al-Mawa International Team</strong>
                </p>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8f9fa; border-top: 1px solid #e5e7eb; padding: 30px; text-align: center; color: #666; font-size: 12px;">
                <p style="margin: 0 0 10px 0; color: #999;">
                  <strong>Al-Mawa International</strong><br>
                  Building Tomorrow's Leaders
                </p>
                <p style="margin: 10px 0; color: #999;">
                  📧 ${process.env.EMAIL_HOST_USER}<br>
                  © 2026 Al-Mawa International. All rights reserved.
                </p>
                <p style="margin: 15px 0 0 0; color: #bbb; font-size: 11px;">
                  This is an automated message. Please do not reply directly to this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Job application email sent to:', email);
    return true;
  } catch (error) {
    console.error('❌ Error sending job application email:', error);
    return false;
  }
}
