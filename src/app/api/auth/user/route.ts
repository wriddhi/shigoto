import { COOKIES } from "@/constants/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { User } from "@/types/user";
import { ApiError } from "@/types/api-error";
import { HTTP_CODES } from "@/constants/http";

export async function GET(
  request: NextRequest
): Promise<NextResponse<User | ApiError>> {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIES.AUTH.TOKEN);
  if (!token) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED }
    );
  }

  try {
    const user = jwt.verify(token.value, process.env.JWT_SECRET!) as User;
    return NextResponse.json(user);
  } catch (error) {
    cookieStore.delete(COOKIES.AUTH.TOKEN);
    return NextResponse.json(
      {
        message:
          "You tried to modify your token, this behaviour will be flagged",
      },
      { status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED }
    );
  }
}
