import { getItemHistory2 } from "@/app/lib/requests";

export default async function Page() {
  const history = await getItemHistory2(730, "Falchion%20Case");
  const last = history.slice(history.length - 10, history.length);
  return (
    <div className="flex flex-col p-4 w-full items-center">
      <p className="text-3xl">Prices</p>
      {last.map((time: [string, number, string]) => (
        <p key={time[0]}>{`${time[0]} : ${time[1]}$`}</p>
      ))}
    </div>
  );
}
