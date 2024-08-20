import { db } from "@/db";
import { Credentials } from "@/providers/auth";
import { ApiError } from "@/types/api-error";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIES } from "@/constants/cookies";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HTTP_CODES } from "@/constants/http";

const message = {
  401: "Invalid login credentials!",
  500: "An error occurred while trying to sign in",
};

const time = {
  secs: (seconds: number) => seconds,
  mins: (minutes: number) => minutes * 60,
  hours: (hours: number) => hours * 60 * 60,
  days: (days: number) => days * 60 * 60 * 24,
  weeks: (weeks: number) => weeks * 60 * 60 * 24 * 7,
  months: (months: number) => months * 60 * 60 * 24 * 30,
  years: () => 60 * 60 * 24 * 365,
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<User | ApiError>> {
  try {
    const { username, password } = (await request.json()) as Credentials;

    const { data: user, error: userError } = await db
      .from("users")
      .select("*")
      .eq("username", username)
      .returns<User[]>()
      .single();
    if (userError || !user) {
      return NextResponse.json(
        { message: message[HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED] },
        { status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED }
      );
    }

    const { data: credentials, error: passwordError } = await db
      .from("credentials")
      .select("*")
      .eq("id", user.id)
      .returns<Credentials[]>()
      .single();
    if (passwordError || !credentials) {
      return NextResponse.json(
        { message: message[HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED] },
        { status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED }
      );
    }

    const isValid = await bcrypt.compare(password, credentials.password);
    if (!isValid) {
      return NextResponse.json(
        { message: message[HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED] },
        { status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED }
      );
    }

    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      noTimestamp: true,
    });

    const cookieStore = cookies();
    cookieStore.set(COOKIES.AUTH.TOKEN, token, {
      path: "/",
      maxAge: time.hours(1),
      sameSite: "strict",
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set(COOKIES.AUTH.LOGGED_IN_AT, new Date().toISOString(), {
      path: "/",
      maxAge: time.hours(1),
      sameSite: "strict",
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: message[HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR] },
      { status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR }
    );
  }
}
