import prisma from "@/lib/prisma";

function normalizePhone(p) {
  if (!p) return "";
  const digits = String(p).replace(/\D/g, "");
  return digits.slice(-10); // Last 10 digits
}

const DEFAULT_STORE_MANAGERS = ["8955497322"];

const authSeller = async (userId) => {
  try {
    if (!userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { store: true },
    });

    if (!user) return false;

    // 1. Direct approved store owner
    if (user.store && user.store.status === "approved") {
      return user.store.id;
    }

    // 2. Check if user is a designated store manager or admin phone
    const userPhone10 = normalizePhone(user.phone);

    const envManagers = [
      ...(process.env.STORE_MANAGERS || "").split(","),
      ...(process.env.ADMIN_PHONE || "").split(","),
    ]
      .map((e) => normalizePhone(e.trim()))
      .filter(Boolean);

    const allManagerPhones = new Set([
      ...DEFAULT_STORE_MANAGERS,
      ...envManagers,
    ]);

    if (userPhone10 && allManagerPhones.has(userPhone10)) {
      // Find user's store or the primary approved store
      const primaryStore =
        user.store ||
        (await prisma.store.findFirst({
          where: { status: "approved" },
          orderBy: { createdAt: "asc" },
        })) ||
        (await prisma.store.findFirst({
          orderBy: { createdAt: "asc" },
        }));

      if (primaryStore) {
        return primaryStore.id;
      }
    }

    return false;
  } catch (error) {
    console.error("authSeller error:", error);
    return false;
  }
};

export default authSeller;