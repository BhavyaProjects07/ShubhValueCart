import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import authAdmin from "@/middlewares/authAdmin";
import { NextResponse } from "next/server";



// get all approved stores

export async function GET(request) {
    try {
        const session = await getSession();
    const userId = session?.userId;
        const isAdmin = await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }


        const stores = await prisma.store.findMany({
            where: { status: "approved" },
            include : {user : true}
        })

        return NextResponse.json({ stores })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}