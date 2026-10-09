import prisma from "@/lib/prisma";

const authSeller = async (userId) => {
  try {
    if (!userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { store: true }
    });

    if (!user || !user.phone) return false;
    const phone = user.phone;

    // ==========================
    // ✅ MANAGER ACCESS
    // ==========================
    const managerPhones = (process.env.STORE_MANAGERS || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (managerPhones.includes(phone)) {
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
    if (user.store?.status === "approved") {
      return user.store.id;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authSeller;