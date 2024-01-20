import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import SearchBar from "@/app/ui/searchbar";

export default async function Page(props: any) {
  const { searchParams } = props;
  console.log(searchParams.query);
  const prisma = new PrismaClient();
  const games = searchParams.query
    ? await prisma.app.findMany({
        where: { appName: { contains: searchParams.query } },
      })
    : await prisma.app.findMany({});
  prisma.$disconnect();

  return (
    <div className="flex min-h-screen flex-col bg-[url('/dark1.jpg')]">
      <div className="p-32 flex flex-col gap-8">
        <header className="text-8xl font-bold">Games</header>
        <SearchBar placeholder="Search games" href="/games" />
        <ul className="space-y-10 my-10 columns-2">
          {games.map((game) => (
            <li key={game.appName} className="w-full flex">
              <Link
                href={`/${game.appId}`}
                className="rounded-full bg-white bg-opacity-0 px-2 py-2 hover:bg-opacity-10 duration-200 text-4xl w-full flex items-center"
              >
                <Image
                  src={game.appIcon}
                  className="rounded-full mr-4"
                  height={50}
                  width={100}
                  alt={`Image of ${game.appName} logo`}
                ></Image>
                {game.appName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
