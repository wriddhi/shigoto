import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIES } from "@/constants/cookies";

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIES.AUTH.TOKEN);
  return NextResponse.json({ message: "Signed out successfully" });
}
