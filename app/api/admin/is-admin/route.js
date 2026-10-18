import { getSession } from "@/lib/auth";
import authAdmin from "@/middlewares/authAdmin";
import { NextResponse } from "next/server";

// Auth admin


export async function GET(request) {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ isAdmin: false, error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json({ isAdmin: false, error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error("IS-ADMIN ERROR:", error);
    return NextResponse.json({ isAdmin: false, error: error.message }, { status: 500 });
  }
}