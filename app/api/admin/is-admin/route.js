import { getSession } from "@/lib/auth";
import authAdmin from "@/middlewares/authAdmin";
import { NextResponse } from "next/server";

// Auth admin


export async function GET(request) {
    try {
        const session = await getSession();
    const userId = session?.userId;const isAdmin = await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        return NextResponse.json({ isAdmin: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}