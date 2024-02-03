import prisma from "@/prisma/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemHashName = searchParams.get("itemHashName");
  if (itemHashName == null) {
    return new Response("Must provide valid itemHashName as parameter!", {
      status: 400,
    });
  }
  prisma.$connect();
  const item = await prisma.item.findUnique({
    where: { itemHashName: itemHashName },
  });
  prisma.$disconnect();
  if (item == null) {
    return new Response(`Item ${itemHashName} not found!`, {
      status: 400,
    });
  }
  return Response.json(item);
}
