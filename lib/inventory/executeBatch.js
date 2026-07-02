import prisma from "@/lib/prisma";

export default async function executeBatch(
  operations,
  batchSize = 250
) {
  for (let i = 0; i < operations.length; i += batchSize) {
    const batch = operations.slice(
      i,
      i + batchSize
    );

    await prisma.$transaction(batch);
  }
}