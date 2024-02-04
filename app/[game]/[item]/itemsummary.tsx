import { getItemCurrent, getItemHistory2 } from "@/app/lib/requests";

export default async function ItemSummary({
  itemHash,
  appId,
}: {
  itemHash: string;
  appId: number;
}) {
  let priceHistory: [[string, number, number]] | null = null;
  try {
    priceHistory = await getItemHistory2(appId, itemHash);
  } catch {}
  let priceOverview: { lowest_price: number } | null = null;
  try {
    priceOverview = await getItemCurrent(appId, itemHash);
  } catch {}

  let close;
  let day_max;
  let day_min;
  let year_max;
  let year_min;

  if (priceHistory) {
    const cur_date = new Date();
    cur_date.setHours(0, 0, 0, 0);
    // console.log(cur_date);
    close = priceHistory.find((point) => {
      const this_date = new Date(point[0]);
      // console.log(this_date);
      return cur_date.getTime() === this_date.getTime();
    });
    const todayPrice = priceHistory.filter((point) => {
      const this_date = new Date(point[0]);
      return this_date.getTime() >= cur_date.getTime();
    });
    day_min = todayPrice.reduce((acc, current) => [
      current[0],
      Math.min(acc[1], current[1]),
      current[2],
    ]);

    day_max = todayPrice.reduce((acc, current) => [
      current[0],
      Math.max(acc[1], current[1]),
      current[2],
    ]);

    cur_date.setFullYear(cur_date.getFullYear() - 1);
    const yearPrice = priceHistory.filter((point) => {
      const this_date = new Date(point[0]);
      return this_date.getTime() >= cur_date.getTime();
    });
    year_min = yearPrice.reduce((acc, current) => [
      current[0],
      Math.min(acc[1], current[1]),
      current[2],
    ]);

    year_max = yearPrice.reduce((acc, current) => [
      current[0],
      Math.max(acc[1], current[1]),
      current[2],
    ]);
    if (priceOverview) {
      if (year_max[1] < priceOverview["lowest_price"]) {
        year_max[1] = priceOverview["lowest_price"];
      } else if (year_min[1] > priceOverview["lowest_price"]) {
        year_min[1] = priceOverview["lowest_price"];
      }
      if (day_max[1] < priceOverview["lowest_price"]) {
        day_max[1] = priceOverview["lowest_price"];
      } else if (day_min[1] > priceOverview["lowest_price"]) {
        day_min[1] = priceOverview["lowest_price"];
      }
    }
  }
  return (
    <div className="flex flex-row p-4">
      <div className="flex flex-col w-full">
        <div className="p-4 flex flex-row justify-between">
          <p>PREVIOUS CLOSE</p>
          <p>{close ? "$" + close[1].toFixed(3).toString() : "$xx.xx"}</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>DAY RANGE</p>
          <p>
            {day_min ? "$" + day_min[1].toFixed(3).toString() : "$xx.xx"} -{" "}
            {day_max ? "$" + day_max[1].toFixed(3).toString() : "$xx.xx"}
          </p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>54 WEEK RANGE</p>
          <p>
            {year_min ? "$" + year_min[1].toFixed(3).toString() : "$xx.xx"} -{" "}
            {year_max ? "$" + year_max[1].toFixed(3).toString() : "$xx.xx"}
          </p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>MARKET CAP</p>
          <p>$xxxxx</p>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="p-4 flex flex-row justify-between">
          <p>1 MONTH</p>
          <p>$xxxxx</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>3 MONTH</p>
          <p>$xxxxx</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>1 YEAR</p>
          <p>$xxxxx</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>3 YEAR</p>
          <p>$xxxxx</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>ALL TIME</p>
          <p>$xxxxx</p>
        </div>
      </div>
    </div>
  );
}
