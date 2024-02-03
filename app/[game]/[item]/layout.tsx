import ItemTitle from "./itemtitle";
import ItemStats from "./itemstats";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    game: string;
    item: string;
  };
}) {
  const { game, item } = params;
  const timestamp = new Date();
  // let gameData, itemData;
  // fetch(`/api/db/getApp?appid=${game}`)
  //   .then((res) => res.json())
  //   .then((json) => (gameData = json));
  // fetch(`/api/db/getItem?itemHashName=${item}`)
  //   .then((res) => res.json())
  //   .then((json) => {
  //     itemData = json;
  //   });
  return (
    <div className="min-h-screen flex flex-column">
      <div className="p-16 pt-24 pb-0 text-black min-h-screen bg-white w-full flex flex-col gap-12">
        <ItemTitle gameid={game} itemHash={item} timestamp={timestamp} />
        <ItemStats game={game} item={item}>
          {children}
        </ItemStats>
      </div>
    </div>
  );
}
