import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handle(req, res) {
  const stores = await prisma.store.findMany();
  res.json(stores);
}
