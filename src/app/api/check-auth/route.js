import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get("admin")?.value === "true";
    
    if (isAuthenticated) {
      return NextResponse.json({ success: true, authenticated: true });
    } else {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
