import GameTitle from "./title";
import { PrismaClient } from "@prisma/client";

export default async function Page({ params }: { params: { game: string } }) {
  const prisma = new PrismaClient();
  const game = await prisma.app.findUnique({
    where: { appId: parseInt(params.game) },
  });
  prisma.$disconnect();

  if (game) {
    return (
      <div className="min-h-screen flex flex-column">
        <GameTitle gameInfo={game} />
      </div>
    );
  } else {
    return (
      <div className="p-32 bg-white text-black min-h-screen">
        <header className="text-8xl font-bold">Unknown game</header>
      </div>
    );
  }
}
