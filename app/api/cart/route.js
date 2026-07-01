import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// update user cart
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
  return NextResponse.json(
    { cart: {} },
    { status: 200 }
  );
}
        const { cart } = await request.json();
        
        // save the cart to the user obj

        const user = await prisma.user.findUnique({
  where: { id: userId }
});

if (!user) {
  return NextResponse.json(
    { error: "User not found" },
    { status: 404 }
  );
}

        await prisma.user.update({
            where:{id: userId},
            data:{cart:cart}
        })

        return NextResponse.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message || error.code }, { status: 500 });
    }
}


// get user cart
export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        const user = await prisma.user.findUnique({
            where:{id: userId}
        })
        if (!user) {
  return NextResponse.json({
    cart: {}
  });
}

return NextResponse.json({
  cart: user.cart || {}
});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message || error.code }, { status: 500 });
    }
}