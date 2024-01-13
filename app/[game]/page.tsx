import GameTitle from "./title";
import { games } from "@/app/lib/games";

export default function Page({ params }: { params: { game: string } }) {
  const gameInfo: GameElement | undefined = games.find(
    (x) => x.page === params.game
  );

  if (gameInfo) {
    return (
      <div className="min-h-screen flex flex-column">
        <GameTitle gameName={gameInfo.name} image={gameInfo.imgsrc} />
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
