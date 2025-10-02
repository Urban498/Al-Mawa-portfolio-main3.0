// CORS utility for API routes
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Helper function to add CORS headers to NextResponse
export const addCorsHeaders = (response) => {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

// Handle preflight OPTIONS requests
export const handleOptions = () => {
  return new Response(null, { status: 200, headers: corsHeaders });
};
