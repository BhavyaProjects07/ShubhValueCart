import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

const authSeller = async (userId) => {
  try {
    if (!userId) return false;

    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email = clerkUser.emailAddresses[0].emailAddress
      .trim()
      .toLowerCase();

    // ==========================
    // ✅ MANAGER ACCESS
    // ==========================
    const managerEmails = (process.env.STORE_MANAGERS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (managerEmails.includes(email)) {
      const clientStore = await prisma.store.findFirst({
        where: {
          email: process.env.STORE_OWNER_EMAIL,
          status: "approved",
        },
      });

      return clientStore?.id || false;
    }

    // ==========================
    // ✅ NORMAL STORE OWNER
    // ==========================
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        store: true,
      },
    });

    if (user?.store?.status === "approved") {
      return user.store.id;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authSeller;