import { db } from "@/db";
import { cookies } from "next/headers";
import { COOKIES } from "@/constants/cookies";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import type { User } from "@/types/user";
import type { Workspace } from "@/types/workspace";
import { HTTP_CODES } from "@/constants/http";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES.AUTH.TOKEN);

  if (!token) {
    return NextResponse.json(
      { message: "You need to log in to view workspaces" },
      {
        status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED,
      }
    );
  }

  try {
    const user = jwt.verify(token.value, process.env.JWT_SECRET!) as User;
    const { data: workspace, error } = await db
      .from("workspaces")
      .select("*")
      .eq("id", params.id)
      .returns<Workspace[]>()
      .single();

    if (error && error.code !== "22P02") {
      return NextResponse.json(
        { message: "An error occurred while fetching workspaces" },
        {
          status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
        }
      );
    }

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        {
          status: HTTP_CODES.CLIENT_ERROR.NOT_FOUND,
        }
      );
    }
    if (!workspace.members.includes(user.id) && workspace.private) {
      return NextResponse.json(
        { message: "You are not a member of this private workspace" },
        {
          status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED,
        }
      );
    }
    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token, try logging in again" },
      {
        status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED,
      }
    );
  }
}
