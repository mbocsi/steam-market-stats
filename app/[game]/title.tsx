import Image from "next/image";

export default function GameTitle(props: any) {
  const { gameName, image } = props;
  return (
    <div className="p-32 text-black min-h-screen bg-white w-full">
      <div className="flex items-center">
        <Image
          src={image}
          className="rounded-full aspect-square object-cover mr-4"
          height={100}
          width={100}
          alt={`Image of ${gameName} logo`}
        ></Image>
        <header className="text-8xl font-bold">{gameName}</header>
      </div>
    </div>
  );
}
