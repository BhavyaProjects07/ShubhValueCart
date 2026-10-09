import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production"
);

const COOKIE_NAME = "svc_session";
const REG_COOKIE_NAME = "svc_reg_token";

/**
 * Creates an encrypted JWT session and sets it as an HTTP-only cookie.
 */
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

/**
 * Verifies the JWT session and returns the decoded payload (e.g., userId).
 * Can be used anywhere (middleware, API routes, Server Components).
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload; // { userId, iat, exp }
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return null;
  }
}

/**
 * Destroys the current session by clearing the HTTP-only cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Creates a short-lived session for registration after OTP verification.
 */
export async function createRegistrationSession(phone) {
  const token = await new SignJWT({ phone })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(REG_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  return token;
}

/**
 * Verifies the registration session.
 */
export async function getRegistrationSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(REG_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload; // { phone }
  } catch {
    return null;
  }
}

/**
 * Destroys the registration session.
 */
export async function destroyRegistrationSession() {
  const cookieStore = await cookies();
  cookieStore.delete(REG_COOKIE_NAME);
}
