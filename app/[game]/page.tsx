import GameTitle from "./title";
import { games } from "@/app/lib/games";

export default function Page({ params }: { params: { game: string } }) {
  const gameName: string = decodeURI(params.game);
  const gameInfo: { [key: string]: string } | undefined = games.find(
    (x) => x.name === gameName
  );

  if (gameInfo) {
    return (
      <div className="min-h-screen flex flex-column">
        <GameTitle gameName={gameName} image={gameInfo.href} />
      </div>
    );
  } else {
    return (
      <div className="p-32 bg-white text-black">
        <header className="text-8xl font-bold">Unknown game</header>
      </div>
    );
  }
}
