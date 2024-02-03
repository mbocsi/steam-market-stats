import prisma from "@/prisma/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appid = searchParams.get("appid");
  if (appid == null) {
    return new Response("Must provide valid appid as parameter!", {
      status: 400,
    });
  }
  prisma.$connect();
  const game = await prisma.app.findUnique({
    where: { appId: parseInt(appid) },
  });
  prisma.$disconnect();
  if (game == null) {
    return new Response(`Game ${appid} was not found!`, {
      status: 400,
    });
  }
  return Response.json(game);
}
