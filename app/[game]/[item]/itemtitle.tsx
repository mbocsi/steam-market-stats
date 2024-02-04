"use client";

import { getItemCurrent, getItemHistory2 } from "@/app/lib/requests";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItemTitle(props: any) {
  const { item, app, timestamp } = props;
  // console.log(props);

  const [priceOverview, setPriceOverview] = useState<{
    lowest_price: string;
    volume: number;
  } | null>(null);

  const [priceHistory, setPriceHistory] = useState<
    [[string, number, string]] | null
  >(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getItemCurrent(app?.appId, encodeURIComponent(item?.itemHashName)).then(
      (json) => {
        setPriceOverview(json);
        setLoading(false);
      }
    );
    getItemHistory2(
      app?.appId,
      encodeURIComponent(item?.itemHashName),
      true
    ).then((data) => {
      setPriceHistory(data.slice(data.length - 30, data.length));
    });
    const interval = setInterval(() => {
      getItemCurrent(app?.appId, encodeURIComponent(item?.itemHashName)).then(
        (json) => {
          setPriceOverview(json);
        }
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [item, app]);

  let close;
  if (priceHistory) {
    const cur_date = new Date();
    cur_date.setHours(0, 0, 0, 0);
    // console.log(cur_date);
    close = priceHistory.find((point) => {
      const this_date = new Date(point[0]);
      // console.log(this_date);
      return cur_date.getTime() === this_date.getTime();
    });
  }

  let day_diff;
  if (priceOverview && close) {
    day_diff = [
      (100 *
        (parseFloat(priceOverview["lowest_price"].substring(1)) - close[1])) /
        close[1],
      parseFloat(priceOverview["lowest_price"].substring(1)) - close[1],
    ];
  }
  // console.log(close);
  return (
    <div className="flex flex-row items-center gap-10">
      <div className="aspect-square flex items-center bg-slate-200 rounded-full p-4">
        {isLoading ? (
          <div className="w-40 h-40 bg"></div>
        ) : (
          <Image
            src={`http://cdn.steamcommunity.com/economy/image/${item.itemIcon}`}
            width={160}
            height={160}
            alt={`Icon for ${item.itemName}`}
            className=""
          ></Image>
        )}
      </div>
      <div className="flex flex-col h-full justify-between">
        <header className="text-6xl">
          {isLoading ? "Loading" : item.itemName}
        </header>
        <Link href={isLoading ? "" : `/${app.appId}`}>
          <p className="text-xl text-cyan-500">
            {isLoading ? "Loading" : app.appName}
          </p>
        </Link>
        <div className="flex flex-row place-items-baseline">
          <p className="text-6xl font-semibold">
            {priceOverview
              ? priceOverview["lowest_price"].substring(1)
              : "Loading"}
          </p>
          <p className="mx-2 text-lg opacity-50 font-semibold">USD</p>
          {day_diff ? (
            <p
              className={`ml-2 font-semibold text-3xl ${
                day_diff[0] > 0 ? "text-green-600" : "text-red-400"
              }`}
            >
              {`${
                (day_diff[1] > 0 ? "+" : "") + day_diff[1].toFixed(3).toString()
              } ${
                (day_diff[0] > 0 ? "+" : "") + day_diff[0].toFixed(2).toString()
              }`}
              %
            </p>
          ) : (
            <></>
          )}
        </div>
        <p className="opacity-50">
          {priceOverview ? priceOverview["volume"] : "Unknown"} sold in last 24
          hours
        </p>
        <p className="opacity-50 font-semibold">
          At {timestamp.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
