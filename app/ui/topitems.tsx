import Image from "next/image";
import Link from "next/link";

export default function TopItems(props: any) {
  const { items } = props;

  return (
    <div className="grid grid-cols-6 gap-4">
      {items.map((item: any) => {
        return (
          <Link
            href={item.appid ? `/${item.appid}/${item.name}` : "/"}
            key={item.name}
            className="flex flex-row items-center space-x-2 py-2 px-6 text-white rounded-full bg-neutral-800 bg-opacity-60 hover:bg-opacity-100 truncate"
          >
            <Image
              src={item.icon}
              width={50}
              height={50}
              alt={`Icon for ${item.name}`}
            />
            <div>
              <p className="font-bold text-xl">{item.sell_price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
