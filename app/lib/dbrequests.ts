import prisma from "@/prisma/db";

export async function getItem(itemHashName: string) {
  prisma.$connect();
  const item = await prisma.item.findUnique({
    where: { itemHashName: itemHashName },
    select: {
      itemNameId: true,
      itemName: true,
      itemHashName: true,
      itemIcon: true,
    },
  });
  prisma.$disconnect();
  return item;
}

export async function getApp(appId: number) {
  prisma.$connect();
  const game = await prisma.app.findUnique({
    where: { appId: appId },
    select: {
      appName: true,
      appId: true,
      appIcon: true,
      appDescription: true,
    },
  });
  prisma.$disconnect();
  return game;
}
