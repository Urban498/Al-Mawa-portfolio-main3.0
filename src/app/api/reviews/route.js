import { promises as fs } from 'fs';
import path from 'path';

const reviewsFile = path.join(process.cwd(), 'data', 'reviews.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(path.dirname(reviewsFile), { recursive: true });
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

// Get all reviews
async function getReviews() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(reviewsFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
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

export async function GET(request) {
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
    
    // Add timestamp
    newReview.createdAt = new Date().toISOString();
    
    const reviews = await getReviews();
    const updatedReviews = [newReview, ...reviews];
    
    await saveReviews(updatedReviews);
    
    return Response.json(updatedReviews, { status: 201 });
  } catch (error) {
    console.error('Error saving review:', error);
    return Response.json({ error: 'Failed to save review' }, { status: 500 });
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
