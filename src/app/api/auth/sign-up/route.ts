import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import type { User } from "@/types/user";
import type { Credentials } from "@/providers/auth";
import type { ApiError } from "@/types/api-error";
import { HTTP_CODES } from "@/constants/http";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiError | User>> {
  const body = await request.json();

  const { username, name, email } = body as User;
  const { password } = body as Credentials;

  if (!username || !name || !email || !password) {
    return NextResponse.json(
      { message: "Please provide all required fields" },
      {
        status: HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
      }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { data: credentials, error: credentialsError } = await db
    .from("credentials")
    .insert({ password: passwordHash })
    .select()
    .returns<{ id: string; password: string }[]>()
    .single();

  if (!credentials || credentialsError) {
    console.error("credentialsError => ", credentialsError);
    return NextResponse.json(
      { message: "An error occurred while creating storing user credentials" },
      {
        status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      }
    );
  }

  const { data: user, error: userError } = await db
    .from("users")
    .insert({ id: credentials.id, username, name, email })
    .select()
    .returns<User[]>()
    .single();

  if (userError) {
    await db.from("credentials").delete().eq("id", credentials.id);
    if (userError.code === "23505") {
      const duplicatedProperty = userError.details.match(/\(([^)]+)\)/)?.[1];
      return NextResponse.json(
        { message: `User with this ${duplicatedProperty} already exists` },
        {
          status: HTTP_CODES.CLIENT_ERROR.CONFLICT,
        }
      );
    }
    console.log("userError => ", userError);
    return NextResponse.json(
      { message: "An error occurred while creating user" },
      {
        status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "An error occurred while creating user" },
      {
        status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      }
    );
  }

  return NextResponse.json(user);
}
