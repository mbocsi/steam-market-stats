import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const appList: number[] = [730, 440, 570, 252490, 578080];

async function main() {
  let id;
  for (id of appList) {
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    );
    const data = (await res.json())[`${id}`].data;
    // console.log(data);

    const game = await prisma.app.upsert({
      where: { appId: id },
      update: {},
      create: {
        appId: id,
        appName: data.name,
        appIcon: data.header_image,
        appDescription: data.short_description,
        appWebsite: data.website,
      },
    });
    console.log(game);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
