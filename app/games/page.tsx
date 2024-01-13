import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { games } from "@/app/lib/games";

export default function Page() {
  games.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex min-h-screen flex-col bg-[url('/dark1.jpg')]">
      <div className="p-32">
        <header className="text-8xl font-bold">Games</header>
        <div className="p-2 rounded-full bg-white w-fit flex text-black items-center space-x-3 my-8">
          <button className="rounded-full bg-gray-300 bg-opacity-0 p-3 hover:bg-opacity-50 duration-200">
            <FaSearch size="1.5em" />
          </button>
          <input
            className="focus:outline-none text-2xl"
            placeholder="Search games"
          ></input>
        </div>
        <ul className="space-y-10 my-10 columns-3">
          {games.map((game) => (
            <li key={game.name} className="w-full flex">
              <Link
                href={game.name}
                className="rounded-full bg-white bg-opacity-0 px-2 py-2 hover:bg-opacity-10 duration-200 text-4xl w-full flex items-center"
              >
                <Image
                  src={game.href}
                  className="rounded-full aspect-square object-cover mr-4"
                  height={50}
                  width={50}
                  alt={`Image of ${game.name} logo`}
                ></Image>
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
