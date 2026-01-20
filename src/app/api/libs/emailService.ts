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

// Generate OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP Email
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: 'Your Admin Login OTP - Do Not Share',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h1 style="color: #1f2937; margin-bottom: 20px;">🔐 Admin Login Verification</h1>
            
            <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">
              You requested to log in to your Admin Panel. Use the OTP below to complete your login.
            </p>
            
            <div style="background-color: #ffffff; border: 2px dashed #3b82f6; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0;">
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 10px;">Your One-Time Password:</p>
              <p style="font-size: 48px; font-weight: bold; color: #3b82f6; letter-spacing: 10px; margin: 0;">${otp}</p>
            </div>
            
            <p style="color: #ef4444; font-weight: bold; margin: 20px 0; padding: 15px; background-color: #fee2e2; border-radius: 4px;">
              ⚠️ This OTP will expire in 5 minutes. Do not share this code with anyone.
            </p>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              If you didn't request this login, please ignore this email or contact support immediately.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              Al-Mawa International &copy; 2026 - All rights reserved
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    return false;
  }
}

// Send Backup Codes Email
export async function sendBackupCodesEmail(email: string, codes: string[]): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: 'Your Admin Panel Backup Codes - Store Safely',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h1 style="color: #1f2937; margin-bottom: 20px;">🔐 Your Backup Codes</h1>
            
            <p style="color: #ef4444; font-weight: bold; font-size: 16px; margin-bottom: 20px;">
              ⚠️ Save these codes in a safe place. You'll need them if you lose access to your email.
            </p>
            
            <div style="background-color: #ffffff; border: 2px solid #fbbf24; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 15px; font-weight: bold;">BACKUP CODES:</p>
              <div style="font-family: monospace; font-size: 14px; line-height: 2;">
                ${codes.map((code, index) => `<p style="margin: 5px 0; color: #1f2937;">${index + 1}. ${code}</p>`).join('')}
              </div>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              Each backup code can only be used once. Once used, you'll need to use another code or receive a new OTP via email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              Al-Mawa International &copy; 2026 - All rights reserved
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ Error sending backup codes email:', error);
    return false;
  }
}
