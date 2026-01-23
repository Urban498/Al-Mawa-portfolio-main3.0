import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail, sendBackupCodesEmail, generateOTP } from '../libs/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type = 'otp' } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Test OTP email
    if (type === 'otp') {
      const otp = generateOTP();
      const result = await sendOTPEmail(email, otp);

      if (result) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'OTP email sent successfully',
            testOTP: otp, // For testing purposes only
            email
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: 'Failed to send OTP email' },
          { status: 500 }
        );
      }
    }

    // Test backup codes email
    if (type === 'backup-codes') {
      const backupCodes = Array.from({ length: 10 }, () =>
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );

      const result = await sendBackupCodesEmail(email, backupCodes);

      if (result) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Backup codes email sent successfully',
            email
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: 'Failed to send backup codes email' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email type. Use "otp" or "backup-codes"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Test email endpoint error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}
