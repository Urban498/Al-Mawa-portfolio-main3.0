import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_USE_SSL === 'True',
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

const DIRECTOR_EMAIL = process.env.DIRECTOR_EMAIL;

// Send Franchise Application Email
export async function sendFranchiseApplicationEmail(
  email,
  fullName,
  businessName,
  location,
  investmentCapacity
) {
  try {
    // Email to user
    const userMailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: '✅ Your Franchise Application Has Been Received - Al-Mawa International',
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
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Application Received!</h1>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for your interest in our franchise</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Greeting -->
                <p style="color: #333; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                  Hi <strong>${fullName}</strong>,
                </p>

                <!-- Main Message -->
                <p style="color: #555; font-size: 15px; margin: 0 0 25px 0; line-height: 1.8;">
                  We're excited to have received your franchise application! We appreciate your interest in becoming a part of the <strong>Al-Mawa International</strong> family.
                </p>

                <!-- Application Details Box -->
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%); border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <p style="color: #0ea5e9; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">📋 Application Details</p>
                  
                  <div style="margin: 12px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Full Name</p>
                    <p style="color: #333; font-size: 16px; font-weight: 600; margin: 5px 0 0 0;">${fullName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Business Name</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${businessName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Location</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${location}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Investment Capacity</p>
                    <p style="color: #0ea5e9; font-size: 15px; margin: 5px 0 0 0;">${investmentCapacity}</p>
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
                    <li style="margin-bottom: 8px;">Our franchise team will review your application thoroughly</li>
                    <li style="margin-bottom: 8px;">We'll evaluate your business background and investment capacity</li>
                    <li style="margin-bottom: 8px;">If your profile aligns with our vision, we'll schedule a call to discuss opportunities</li>
                    <li>This process typically takes 5-10 business days</li>
                  </ol>
                </div>

                <!-- Closing Message -->
                <p style="color: #666; font-size: 15px; margin: 30px 0 20px 0; line-height: 1.8;">
                  We're impressed by your entrepreneurial spirit and look forward to exploring this opportunity with you.
                </p>

                <p style="color: #666; font-size: 15px; margin: 0;">
                  Best regards,<br>
                  <strong>The Al-Mawa International Franchise Team</strong>
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
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Email to director
    const directorMailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: DIRECTOR_EMAIL,
      subject: `🎯 New Franchise Application - ${fullName}`,
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
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎯</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 600;">New Franchise Application</h1>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Review and manage new applications</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                
                <p style="color: #333; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                  A new franchise application has been received. Here are the details:
                </p>

                <!-- Application Details Box -->
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%); border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <p style="color: #0ea5e9; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">📋 Applicant Details</p>
                  
                  <div style="margin: 12px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Full Name</p>
                    <p style="color: #333; font-size: 16px; font-weight: 600; margin: 5px 0 0 0;">${fullName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Email</p>
                    <p style="color: #0ea5e9; font-size: 15px; margin: 5px 0 0 0;">${email}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Business Name</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${businessName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Location</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${location}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Investment Capacity</p>
                    <p style="color: #0ea5e9; font-size: 15px; font-weight: 600; margin: 5px 0 0 0;">${investmentCapacity}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Submission Date</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <!-- Action Items -->
                <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 30px 0;">
                  <p style="color: #92400e; font-weight: 700; margin: 0 0 12px 0; font-size: 14px;">📌 Action Required</p>
                  <ul style="color: #92400e; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Review the application details</li>
                    <li style="margin-bottom: 8px;">Evaluate the applicant's qualifications</li>
                    <li>Schedule a follow-up call if interested</li>
                  </ul>
                </div>

                <p style="color: #666; font-size: 15px; margin: 0;">
                  View all applications in your admin panel.
                </p>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8f9fa; border-top: 1px solid #e5e7eb; padding: 30px; text-align: center; color: #666; font-size: 12px;">
                <p style="margin: 0 0 10px 0; color: #999;">
                  <strong>Al-Mawa International</strong><br>
                  Building Tomorrow's Leaders
                </p>
                <p style="margin: 10px 0; color: #999;">
                  © 2026 Al-Mawa International. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(directorMailOptions);
    console.log('✅ Franchise application emails sent to user and director');
    return true;
  } catch (error) {
    console.error('❌ Error sending franchise application email:', error);
    return false;
  }
}

// Send Referral Application Email
export async function sendReferralApplicationEmail(
  email,
  fullName,
  companyName,
  designationPosition,
  interestedServices
) {
  try {
    // Email to user
    const userMailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: '✅ Your Referral Application Has Been Received - Al-Mawa International',
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
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Application Received!</h1>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for joining our referral program</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Greeting -->
                <p style="color: #333; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                  Hi <strong>${fullName}</strong>,
                </p>

                <!-- Main Message -->
                <p style="color: #555; font-size: 15px; margin: 0 0 25px 0; line-height: 1.8;">
                  We're thrilled to have received your referral application! We appreciate your interest in becoming part of our <strong>Al-Mawa International</strong> referral program and sharing your network with us.
                </p>

                <!-- Application Details Box -->
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%); border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <p style="color: #0ea5e9; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">📋 Application Details</p>
                  
                  <div style="margin: 12px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Full Name</p>
                    <p style="color: #333; font-size: 16px; font-weight: 600; margin: 5px 0 0 0;">${fullName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Company</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${companyName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Position</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${designationPosition}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Interested Services</p>
                    <p style="color: #0ea5e9; font-size: 15px; margin: 5px 0 0 0;">${interestedServices}</p>
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
                    <li style="margin-bottom: 8px;">Our referral team will review your application</li>
                    <li style="margin-bottom: 8px;">We'll verify your details and network scope</li>
                    <li style="margin-bottom: 8px;">If approved, we'll send you your referral code and guidelines</li>
                    <li>You can start earning commissions on successful referrals!</li>
                  </ol>
                </div>

                <!-- Commission Info -->
                <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin: 30px 0;">
                  <p style="color: #047857; font-weight: 700; margin: 0 0 12px 0; font-size: 14px;">💰 Commission Structure</p>
                  <ul style="color: #047857; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Web Services: 10-15%</li>
                    <li style="margin-bottom: 8px;">Digital Marketing: 8-12%</li>
                    <li>IT Services: 5-10%</li>
                  </ul>
                </div>

                <!-- Closing Message -->
                <p style="color: #666; font-size: 15px; margin: 30px 0 20px 0; line-height: 1.8;">
                  We're excited about the opportunity to collaborate with you and look forward to a mutually beneficial partnership.
                </p>

                <p style="color: #666; font-size: 15px; margin: 0;">
                  Best regards,<br>
                  <strong>The Al-Mawa International Referral Team</strong>
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
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Email to director
    const directorMailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: DIRECTOR_EMAIL,
      subject: `🎯 New Referral Application - ${fullName}`,
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
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎯</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 600;">New Referral Application</h1>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Review and manage new referral applications</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                
                <p style="color: #333; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                  A new referral application has been received. Here are the details:
                </p>

                <!-- Application Details Box -->
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%); border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <p style="color: #0ea5e9; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0;">📋 Applicant Details</p>
                  
                  <div style="margin: 12px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Full Name</p>
                    <p style="color: #333; font-size: 16px; font-weight: 600; margin: 5px 0 0 0;">${fullName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Email</p>
                    <p style="color: #0ea5e9; font-size: 15px; margin: 5px 0 0 0;">${email}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Company</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${companyName}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Position</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${designationPosition}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Interested Services</p>
                    <p style="color: #0ea5e9; font-size: 15px; font-weight: 600; margin: 5px 0 0 0;">${interestedServices}</p>
                  </div>

                  <div style="margin: 15px 0;">
                    <p style="color: #666; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Submission Date</p>
                    <p style="color: #333; font-size: 15px; margin: 5px 0 0 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <!-- Action Items -->
                <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 30px 0;">
                  <p style="color: #92400e; font-weight: 700; margin: 0 0 12px 0; font-size: 14px;">📌 Action Required</p>
                  <ul style="color: #92400e; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Review the applicant's details</li>
                    <li style="margin-bottom: 8px;">Verify their professional background</li>
                    <li>Approve and send registration details</li>
                  </ul>
                </div>

                <p style="color: #666; font-size: 15px; margin: 0;">
                  View all applications in your admin panel.
                </p>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8f9fa; border-top: 1px solid #e5e7eb; padding: 30px; text-align: center; color: #666; font-size: 12px;">
                <p style="margin: 0 0 10px 0; color: #999;">
                  <strong>Al-Mawa International</strong><br>
                  Building Tomorrow's Leaders
                </p>
                <p style="margin: 10px 0; color: #999;">
                  © 2026 Al-Mawa International. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(directorMailOptions);
    console.log('✅ Referral application emails sent to user and director');
    return true;
  } catch (error) {
    console.error('❌ Error sending referral application email:', error);
    return false;
  }
}
