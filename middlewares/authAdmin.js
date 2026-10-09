import prisma from "@/lib/prisma";

const authAdmin = async (userId) => {
  try {
    if (!userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.phone) return false;
    const phone = user.phone;

    const admins = process.env.ADMIN_PHONE
      ?.split(",")
      .map((e) => e.trim()) || [];

    return admins.includes(phone);
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default authAdmin;