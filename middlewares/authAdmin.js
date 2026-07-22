import { clerkClient } from "@clerk/nextjs/server";

const authAdmin = async (userId) => {
  try {
    console.log("Incoming userId:", userId);

    if (!userId) return false;

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const email = user.emailAddresses[0]?.emailAddress;

    console.log("User email:", email);
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

    const admins = process.env.ADMIN_EMAIL
      ?.split(",")
      .map((e) => e.trim().toLowerCase());

    console.log("Admin list:", admins);

    const isAdmin = admins.includes(email.toLowerCase());

    console.log("Is Admin:", isAdmin);

    return isAdmin;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default authAdmin;