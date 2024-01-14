import Image from "next/image";
import Link from "next/link";

export default function TopItems(props: any) {
  const { items } = props;
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item: any) => (
        <Link
          href="/games"
          key={item.name}
          className="flex flex-row items-center space-x-2 py-2 px-6 text-white rounded-full bg-neutral-800 bg-opacity-60 hover:bg-opacity-100 truncate"
        >
          <Image
            src={item.icon}
            width={80}
            height={80}
            alt={`Icon for ${item.name}`}
          />
          <div>
            <p className="font-semibold truncate">{item.name}</p>
            <p>{item.sell_price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
