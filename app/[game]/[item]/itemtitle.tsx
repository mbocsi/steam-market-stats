"use client";

import { getClose } from "@/app/lib/pricehistory";
import { getItemCurrent, getItemHistory2 } from "@/app/lib/requests";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItemTitle({
  item,
  app,
}: {
  item: null | { itemHashName: string; itemName: string; itemIcon: string };
  app: null | { appId: number; appName: string };
}) {
  const [timestamp, setTimestamp] = useState<Date>();

  const [priceOverview, setPriceOverview] = useState<{
    lowest_price: string;
    volume: number;
  } | null>(null);

  const [priceHistory, setPriceHistory] = useState<
    [string, number, number][] | null
  >(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!app || !item) {
      return;
    }
    getItemCurrent(
      app?.appId,
      encodeURIComponent(item?.itemHashName),
      true
    ).then((json) => {
      setPriceOverview(json);
      setLoading(false);
      setTimestamp(new Date());
    });
    getItemHistory2(
      app?.appId,
      encodeURIComponent(item?.itemHashName),
      true
    ).then((data) => {
      setPriceHistory(data.slice(data.length - 30, data.length));
    });
    const interval = setInterval(() => {
      getItemCurrent(
        app?.appId,
        encodeURIComponent(item?.itemHashName),
        true
      ).then((json) => {
        setPriceOverview(json);
        setTimestamp(new Date());
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [item, app]);

  const cur_price = priceOverview
    ? parseFloat(priceOverview["lowest_price"].substring(1))
    : null;
  let close;
  if (priceHistory && timestamp) {
    close = getClose(priceHistory, timestamp);
  }

  let day_diff;
  if (cur_price && close) {
    day_diff = [(100 * (cur_price - close)) / close, cur_price - close];
  }
  // console.log(close);
  return (
    <div className="flex flex-row items-center gap-10">
      <div className="aspect-square flex items-center bg-slate-200 rounded-full p-4">
        {isLoading ? (
          <div className="w-40 h-40 bg"></div>
        ) : (
          <Image
            src={`http://cdn.steamcommunity.com/economy/image/${item?.itemIcon}`}
            width={160}
            height={160}
            alt={`Icon for ${item?.itemName}`}
            className=""
          ></Image>
        )}
      </div>
      <div className="flex flex-col h-full justify-between">
        <header className="text-6xl">
          {isLoading ? "Loading" : item?.itemName}
        </header>
        <Link href={isLoading ? "" : `/${app?.appId}`}>
          <p className="text-xl text-cyan-500">
            {isLoading ? "Loading" : app?.appName}
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
                day_diff[0] >= 0 ? "text-green-600" : "text-red-400"
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
          At {timestamp?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
