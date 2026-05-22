import prisma from "@/lib/prisma"
import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { phone, email } = await req.json()

    let normalizedPhone = phone?.startsWith("+91") ? phone : `+91${phone}`

    // Check your DB by phone
    const dbUser = await prisma.user.findUnique({
      where: { phone: normalizedPhone }
    })

    if (dbUser) {
      return NextResponse.json({ exists: true, user: dbUser })
    }

    // ✅ Also check Clerk by email (catches partial failures)
    if (email) {
      const client = await clerkClient()
      const cleanEmail = email.trim().toLowerCase()
      const existing = await client.users.getUserList({ emailAddress: [cleanEmail] })

      if (existing.data.length > 0) {
        // Clerk user exists but not in DB — treat as existing to avoid duplicate
        return NextResponse.json({ 
          exists: true, 
          clerkOnly: true,  // frontend can use this to show "please login" 
          user: null 
        })
      }
    }

    return NextResponse.json({ exists: false, user: null })

  } catch (error) {
    console.error("check-user error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}