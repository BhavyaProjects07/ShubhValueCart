// lib/getOrCreateUser.js

import prisma from "@/lib/prisma";

export const getOrCreateUser = async (userId, userData) => {
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: userData?.email || "",
        name: userData?.name || "",
        image: userData?.image || "",
        cart: {},
      },
    });
  }

  return user;
};