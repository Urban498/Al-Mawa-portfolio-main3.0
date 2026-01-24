import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const reviewsFile = path.join(process.cwd(), 'data', 'reviews.json');

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

// Send email to director for feedback approval
async function sendFeedbackToDirector(feedback) {
  try {
    const directorEmail = process.env.DIRECTOR_EMAIL;
    if (!directorEmail) {
      console.error('DIRECTOR_EMAIL not configured in .env');
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: directorEmail,
      subject: `📝 New Feedback Received - Review & Approval Required`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h1 style="color: #1f2937; margin-bottom: 20px;">📝 New Feedback Submission</h1>
            
            <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">
              A new feedback has been submitted and requires your review and approval.
            </p>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #6b7280; margin: 10px 0;"><strong>Client Name:</strong> ${feedback.name || 'N/A'}</p>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Email:</strong> ${feedback.email || 'N/A'}</p>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Mobile Number:</strong> ${feedback.mobile || 'N/A'}</p>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Designation:</strong> ${feedback.designation || 'N/A'}</p>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Rating:</strong> ${'⭐'.repeat(feedback.rating || 5)}</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">
              <p style="color: #1f2937; margin: 10px 0;"><strong>Feedback:</strong></p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${feedback.feedback || 'N/A'}</p>
            </div>

            ${feedback.image ? `<p style="color: #6b7280; font-size: 12px; margin: 10px 0;"><strong>Image Attached:</strong> Yes</p>` : ''}
            
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              <strong>Submitted on:</strong> ${feedback.createdAt ? new Date(feedback.createdAt).toLocaleString() : 'N/A'}
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
    console.log('✅ Feedback notification email sent to director');
    return true;
  } catch (error) {
    console.error('❌ Error sending feedback notification to director:', error);
    return false;
  }
}

// Send thank you email to client
async function sendThankYouEmailToClient(clientEmail, clientName) {
  try {
    if (!clientEmail) {
      console.error('Client email not provided');
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: clientEmail,
      subject: `Thank You for Your Valuable Feedback! 🙏`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-align: center;">🙏 Thank You!</h1>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 30px 20px; border-radius: 0 0 12px 12px;">
            <p style="color: #1f2937; font-size: 16px; margin: 0 0 20px 0;">
              Dear ${clientName || 'Valued Client'},
            </p>
            
            <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0 0 20px 0;">
              Thank you for taking the time to share your valuable feedback with us! Your insights and suggestions are incredibly important to Al-Mawa International.
            </p>
            
            <div style="background-color: #ffffff; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <p style="color: #4b5563; font-size: 14px; margin: 0; font-style: italic;">
                "At Al-Mawa International, we believe that every piece of feedback helps us improve and serve you better."
              </p>
            </div>
            
            <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 20px 0;">
              Your feedback has been successfully received and will be carefully reviewed by our team. We appreciate your trust in us and your commitment to help us grow.
            </p>
            
            <div style="background-color: #f0f9ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="color: #1e40af; font-size: 13px; margin: 0;">
                <strong>What happens next?</strong><br>
                Our team will review your feedback and take necessary actions to enhance our services for you.
              </p>
            </div>
            
            <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 20px 0;">
              If you have any additional questions or concerns, feel free to reach out to us. We're always here to help!
            </p>
            
            <p style="color: #4b5563; font-size: 15px; margin: 20px 0;">
              Best regards,<br>
              <strong style="color: #1f2937;">Al-Mawa International Team</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                <strong>Al-Mawa International</strong><br>
                &copy; 2026 - All rights reserved<br>
                <a href="#" style="color: #667eea; text-decoration: none;">Visit our website</a> | 
                <a href="#" style="color: #667eea; text-decoration: none;">Contact us</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Thank you email sent to client');
    return true;
  } catch (error) {
    console.error('❌ Error sending thank you email to client:', error);
    return false;
  }
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(path.dirname(reviewsFile), { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Get all reviews
async function getReviews() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(reviewsFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Save reviews
async function saveReviews(reviews) {
  try {
    await ensureDataDir();
    await fs.writeFile(reviewsFile, JSON.stringify(reviews, null, 2));
  } catch (err) {
    console.error('Error saving reviews:', err);
    throw err;
  }
}

export async function GET() {
  try {
    const reviews = await getReviews();
    return Response.json(reviews);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newReview = await request.json();
    
    // Add timestamp and status
    newReview.createdAt = new Date().toISOString();
    newReview.status = 'pending'; // New feedback is pending by default
    
    const reviews = await getReviews();
    const updatedReviews = [newReview, ...reviews];
    
    await saveReviews(updatedReviews);
    
    // Send feedback notification email to director for review and approval
    await sendFeedbackToDirector(newReview);
    
    // Send thank you email to client
    await sendThankYouEmailToClient(newReview.email, newReview.name);
    
    return Response.json(updatedReviews, { status: 201 });
  } catch (error) {
    console.error('Error saving review:', error);
    return Response.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const index = searchParams.get('index');

    if (index === null || isNaN(index)) {
      return Response.json({ error: 'Invalid review index' }, { status: 400 });
    }

    const reviews = await getReviews();
    const reviewIndex = parseInt(index);

    if (reviewIndex < 0 || reviewIndex >= reviews.length) {
      return Response.json({ error: 'Review not found' }, { status: 404 });
    }

    const { status } = await request.json();
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Update the feedback status
    reviews[reviewIndex].status = status;
    reviews[reviewIndex].updatedAt = new Date().toISOString();
    
    await saveReviews(reviews);

    return Response.json({ success: true, message: `Feedback ${status} successfully`, reviews });
  } catch (error) {
    console.error('Error updating review status:', error);
    return Response.json({ error: 'Failed to update review status' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const index = searchParams.get('index');

    if (index === null || isNaN(index)) {
      return Response.json({ error: 'Invalid review index' }, { status: 400 });
    }

    const reviews = await getReviews();
    const reviewIndex = parseInt(index);

    if (reviewIndex < 0 || reviewIndex >= reviews.length) {
      return Response.json({ error: 'Review not found' }, { status: 404 });
    }

    // Remove review at specified index
    reviews.splice(reviewIndex, 1);
    await saveReviews(reviews);

    return Response.json({ success: true, message: 'Review deleted successfully', reviews });
  } catch (error) {
    console.error('Error deleting review:', error);
    return Response.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
