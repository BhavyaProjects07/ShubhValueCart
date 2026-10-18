import prisma from "@/lib/prisma";

function normalizePhone(p) {
  if (!p) return "";
  const digits = String(p).replace(/\D/g, "");
  return digits.slice(-10); // Last 10 digits
}

const DEFAULT_ADMIN_PHONES = ["8955497322"];

const authAdmin = async (userId) => {
  try {
    if (!userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, phone: true }
    });

    if (!user || !user.phone) return false;
    const userPhone10 = normalizePhone(user.phone);
    if (!userPhone10) return false;

    const envAdmins = (process.env.ADMIN_PHONE || "")
      .split(",")
      .map((e) => normalizePhone(e.trim()))
      .filter(Boolean);

    const allAdminPhones = new Set([...DEFAULT_ADMIN_PHONES, ...envAdmins]);

    return allAdminPhones.has(userPhone10);
  } catch (err) {
    console.error("authAdmin error:", err);
    return false;
  }
};

export default authAdmin;