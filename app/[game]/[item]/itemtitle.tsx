"use client";

import { getItemCurrent } from "@/app/lib/requests";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItemTitle(props: any) {
  const { item, app, timestamp } = props;
  console.log(props);
  const [priceOverview, setPriceOverview] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getItemCurrent(app?.appId, encodeURIComponent(item?.itemHashName)).then(
      (json) => {
        setPriceOverview(json);
        setLoading(false);
      }
    );
  }, [item, app]);
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
        <div className="flex flex-row align-bottom">
          <p className="text-6xl font-semibold">
            {priceOverview ? priceOverview["lowest_price"] : "Loading"}
          </p>
          <div className="flex flex-col justify-end">
            <p className="opacity-50 ml-2">
              {priceOverview ? priceOverview["volume"] : "Unknown"} sold in last
              24 hours
            </p>
          </div>
        </div>
        <p className="opacity-50 font-semibold">
          At {timestamp.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
