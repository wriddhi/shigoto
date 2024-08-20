import jwt from "jsonwebtoken";
import { COOKIES } from "@/constants/cookies";
import { ApiError } from "@/types/api-error";
import { Workspace } from "@/types/workspace";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/user";
import { db } from "@/db";
import { HTTP_CODES } from "@/constants/http";

export async function GET(): Promise<NextResponse<ApiError | Workspace[]>> {
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
    const { id } = user;

    const { data: workspaces, error } = await db
      .from("workspaces")
      .select("*")
      .contains("members", [id])
      .returns<Workspace[]>();

    if (error) {
      return NextResponse.json(
        { message: "An error occurred while fetching workspaces" },
        {
          status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
        }
      );
    }
    return NextResponse.json(workspaces ?? []);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token, try logging in again" },
      {
        status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED,
      }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiError | Workspace>> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES.AUTH.TOKEN);

  if (!token) {
    return NextResponse.json(
      { message: "You need to log in to create a workspace" },
      {
        status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED,
      }
    );
  }

  try {
    const user = jwt.verify(token.value, process.env.JWT_SECRET!) as User;
    const { id } = user;

    const { name, description, info, isPrivate } = await request.json();

    const { data: workspace, error } = await db
      .from("workspaces")
      .insert({
        name,
        description,
        owner: id,
        members: [id],
        private: isPrivate,
        info,
      })
      .single<Workspace>();

    if (error) {
      return NextResponse.json(
        { message: "An error occurred while creating the workspace" },
        {
          status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
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

export async function DELETE(request: NextRequest) {
  const { id: workspaceId } = (await request.json()) as { id: string };

  if (!workspaceId) {
    return NextResponse.json(
      { message: "Workspace ID is required" },
      {
        status: HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
      }
    );
  }

  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES.AUTH.TOKEN);

  if (!token) {
    return NextResponse.json(
      { message: "You need to log in to delete a workspace" },
      {
        status: HTTP_CODES.CLIENT_ERROR.UNAUTHORIZED,
      }
    );
  }

  try {
    const user = jwt.verify(token.value, process.env.JWT_SECRET!) as User;
    const { id: userId } = user;

    const { data: workspace, error } = await db
      .from("workspaces")
      .delete()
      .match({ id: workspaceId, owner: userId })
      .single<Workspace>();

    if (error) {
      return NextResponse.json(
        { message: "An error occurred while deleting the workspace" },
        {
          status: HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
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
