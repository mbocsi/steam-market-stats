import { getItemCurrent, getItemHistory2 } from "@/app/lib/requests";
import {
  getClose,
  getDayRange,
  getTimestampPrice,
  getYearRange,
} from "@/app/lib/pricehistory";

export const revalidate = 60;

export default async function ItemSummary({
  itemHash,
  appId,
}: {
  itemHash: string;
  appId: number;
}) {
  let priceHistory: [string, number, number][] | null = null;
  try {
    priceHistory = await getItemHistory2(appId, itemHash);
  } catch {}
  let priceOverview: { lowest_price: string } | null = null;
  try {
    priceOverview = await getItemCurrent(appId, itemHash);
  } catch {}

  const cur_price = priceOverview
    ? parseFloat(priceOverview.lowest_price.substring(1))
    : null;

  let close: number | null = null;
  let day_range: { min: number; max: number } | null = null;
  let year_range: { min: number; max: number } | null = null;
  let performance: {
    day7: number | null;
    month1: number | null;
    month3: number | null;
    year1: number | null;
    year3: number | null;
    year5: number | null;
    lifetime: number | null;
  } | null = null;

  if (priceHistory) {
    const cur_date = new Date();

    close = getClose(priceHistory, cur_date);
    year_range = getYearRange(priceHistory, cur_date);
    day_range = getDayRange(
      priceHistory.length > 100 ? priceHistory.slice(-100) : priceHistory,
      cur_date
    );
    performance = getTimestampPrice(priceHistory, cur_date);

    if (cur_price) {
      if (year_range.max < cur_price) {
        year_range.max = cur_price;
      } else if (year_range.min > cur_price) {
        year_range.min = cur_price;
      }
      if (day_range.max < cur_price) {
        day_range.max = cur_price;
      } else if (day_range.min > cur_price) {
        day_range.min = cur_price;
      }
    }
  }

  const day7_diff =
    performance && performance.day7 && cur_price
      ? (100 * (cur_price - performance.day7)) / cur_price
      : null;

  const month1_diff =
    performance && performance.month1 && cur_price
      ? (100 * (cur_price - performance.month1)) / cur_price
      : null;

  const month3_diff =
    performance && performance.month3 && cur_price
      ? (100 * (cur_price - performance.month3)) / cur_price
      : null;

  const year1_diff =
    performance && performance.year1 && cur_price
      ? (100 * (cur_price - performance.year1)) / cur_price
      : null;

  const year3_diff =
    performance && performance.year3 && cur_price
      ? (100 * (cur_price - performance.year3)) / cur_price
      : null;

  const year5_diff =
    performance && performance.year5 && cur_price
      ? (100 * (cur_price - performance.year5)) / cur_price
      : null;

  const lifetime_diff =
    performance && performance.lifetime && cur_price
      ? (100 * (cur_price - performance.lifetime)) / cur_price
      : null;

  return (
    <div className="flex flex-row p-4">
      <div className="flex flex-col w-full">
        <div className="p-4 flex flex-row justify-between">
          <p>PREVIOUS CLOSE</p>
          <p className="font-semibold">
            {close ? "$" + close.toFixed(3).toString() : "$xx.xx"}
          </p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>DAY RANGE</p>
          <p className="font-semibold">
            {day_range ? "$" + day_range.min.toFixed(3).toString() : "$xx.xx"} -{" "}
            {day_range ? "$" + day_range.max.toFixed(3).toString() : "$xx.xx"}
          </p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>52 WEEK RANGE</p>
          <p className="font-semibold">
            {year_range ? "$" + year_range.min.toFixed(3).toString() : "$xx.xx"}{" "}
            -{" "}
            {year_range ? "$" + year_range.max.toFixed(3).toString() : "$xx.xx"}
          </p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>MARKET CAP</p>
          <p className="font-semibold">$xxxxx</p>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="p-4 flex flex-row justify-between">
          <p>7 DAY</p>
          {day7_diff ? (
            <p
              className={`font-semibold ${
                day7_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(day7_diff > 0 ? "+" : "") + day7_diff.toFixed(2).toString()}%{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>1 MONTH</p>
          {month1_diff ? (
            <p
              className={`font-semibold ${
                month1_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(month1_diff > 0 ? "+" : "") + month1_diff.toFixed(2).toString()}
              %{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>3 MONTH</p>
          {month3_diff ? (
            <p
              className={`font-semibold ${
                month3_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(month3_diff > 0 ? "+" : "") + month3_diff.toFixed(2).toString()}
              %{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>1 YEAR</p>
          {year1_diff ? (
            <p
              className={`font-semibold ${
                year1_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(year1_diff > 0 ? "+" : "") + year1_diff.toFixed(2).toString()}%{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>3 YEAR</p>
          {year3_diff ? (
            <p
              className={`font-semibold ${
                year3_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(year3_diff > 0 ? "+" : "") + year3_diff.toFixed(2).toString()}%{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>5 YEAR</p>
          {year5_diff ? (
            <p
              className={`font-semibold ${
                year5_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(year5_diff > 0 ? "+" : "") + year5_diff.toFixed(2).toString()}%{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>ALL TIME</p>
          {lifetime_diff ? (
            <p
              className={`font-semibold ${
                lifetime_diff >= 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {(lifetime_diff > 0 ? "+" : "") +
                lifetime_diff.toFixed(2).toString()}
              %{" "}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
    </div>
  );
}
