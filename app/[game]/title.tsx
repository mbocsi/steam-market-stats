import Image from "next/image";
import SearchBar from "@/app/ui/searchbar";

export default function GameTitle(props: any) {
  const { gameInfo } = props;
  return (
    <div className="p-32 pb-16 bg-white w-full flex flex-col gap-12">
      <div className="flex items-center my-12">
        <Image
          src={gameInfo.appIcon}
          className="object-cover mr-4"
          height={100}
          width={200}
          alt={`Image of ${gameInfo.appName} logo`}
        ></Image>
        <header className="text-6xl font-bold">{gameInfo.appName}</header>
      </div>
      <p className="text-xl indent-10 w-1/2">{gameInfo.appDescription}</p>
      <SearchBar
        placeholder="Search items here"
        href={`/${gameInfo.appId}/search`}
        bg="bg-gray-200"
        searchBg="bg-gray-300"
      />
    </div>
  );
}
