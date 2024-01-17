import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function GameTitle(props: any) {
  const { gameInfo } = props;
  return (
    <div className="p-32 text-black min-h-screen bg-white w-full flex flex-col gap-12">
      <div className="flex items-center my-12">
        <Image
          src={gameInfo.imgsrc}
          className="aspect-square object-cover mr-4"
          height={100}
          width={100}
          alt={`Image of ${gameInfo.name} logo`}
        ></Image>
        <header className="text-6xl font-bold">{gameInfo.name}</header>
      </div>
      <p className="text-xl indent-10 w-1/2">{gameInfo.description}</p>
      <div className="p-3 rounded-full bg-gray-200 w-fit flex text-black items-center space-x-3">
        <button className="rounded-full bg-gray-300 bg-opacity-0 p-3 hover:bg-opacity-50 duration-200">
          <FaSearch size="2em" />
        </button>
        <input
          className="focus:outline-none text-3xl bg-transparent"
          placeholder="Search items here"
        ></input>
      </div>
    </div>
  );
}
