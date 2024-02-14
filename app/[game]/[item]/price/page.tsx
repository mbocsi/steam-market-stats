import { getItemHistory2 } from "@/app/lib/requests";

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: {
    game: string;
    item: string;
  };
}) {
  const { game, item } = params;
  const history = await getItemHistory2(parseInt(game), item);
  const last = history.slice(history.length - 10, history.length).reverse();
  return (
    <div className="flex flex-col p-4 w-full items-center">
      <p className="text-3xl">Prices</p>
      {last.map((time: [string, number, string]) => (
        <p key={time[0]}>{`${new Date(time[0])} : ${time[1]}$`}</p>
      ))}
    </div>
  );
}
