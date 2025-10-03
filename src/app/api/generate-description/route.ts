import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  let title: string;
  
  try {
    const body = await request.json();
    title = body.title;

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  // Try OpenAI first, fallback to mock if it fails
  try {
    console.log('Attempting OpenAI API call for title:', title);
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional blog content writer. Generate engaging, informative blog descriptions that are 2-3 sentences long and capture the reader's interest. Make them compelling and SEO-friendly."
        },
        {
          role: "user",
          content: `Generate a compelling blog description for a blog post titled: "${title}"`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      throw new Error('No description generated from OpenAI');
    }

    console.log('OpenAI API call successful');
    return NextResponse.json({
      success: true,
      description,
      generatedAt: new Date().toISOString(),
      source: 'openai-gpt-3.5-turbo'
    });

  } catch (openaiError) {
    console.error('OpenAI API failed, using fallback:', openaiError);
    
    // Fallback to mock description
    const mockTemplates = [
      `Discover everything you need to know about ${title}. This comprehensive guide covers key concepts, practical applications, and expert insights to help you master this important topic.`,
      `Learn the fundamentals and advanced techniques of ${title} in this detailed exploration. Perfect for both beginners and experienced professionals looking to enhance their knowledge.`,
      `Explore the world of ${title} with our in-depth analysis. This resource provides valuable insights, best practices, and actionable tips for success in this domain.`,
      `Master ${title} with our comprehensive overview. From core principles to practical implementation, this guide offers everything you need to excel in this field.`
    ];
    
    const randomTemplate = mockTemplates[Math.floor(Math.random() * mockTemplates.length)];
    
    return NextResponse.json({
      success: true,
      description: randomTemplate,
      generatedAt: new Date().toISOString(),
      source: 'fallback-mock',
      note: 'OpenAI API unavailable, using fallback description'
    });
  }
}

// Optional: Add a GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'AI Description Generator API',
    usage: 'POST with { "title": "your blog title" }',
    status: 'active'
  });
}

/* 
// Alternative: Real OpenAI GPT API implementation
// Uncomment and configure with your OpenAI API key

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional blog content writer. Generate engaging, informative blog descriptions that are 2-3 sentences long and capture the reader's interest."
        },
        {
          role: "user",
          content: `Generate a compelling blog description for a blog post titled: "${title}"`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      throw new Error('No description generated');
    }

    return NextResponse.json({
      success: true,
      description,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error generating description:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
*/
