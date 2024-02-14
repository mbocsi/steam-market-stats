"use client";
import { useState } from "react";
import Link from "next/link";

enum Tab {
  Summary,
  Orders,
  History,
  Supply,
}

export default function ItemStats(props: any) {
  const [tab, setTab] = useState(Tab.Summary);
  const { game, item, children } = props;

  return (
    <div className="bg-slate-100 h-full rounded-lg">
      <div className="flex flex-row border-b-2">
        <Link
          onClick={() => {
            setTab(Tab.Summary);
          }}
          href={`/${game}/${item}`}
          className={`bg-black ${
            tab == Tab.Summary ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Summary
        </Link>
        <Link
          onClick={() => {
            setTab(Tab.Orders);
          }}
          href={`/${game}/${item}/orders`}
          className={`bg-black ${
            tab == Tab.Orders ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Orders
        </Link>
        <Link
          onClick={() => {
            setTab(Tab.History);
          }}
          href={`/${game}/${item}/price`}
          className={`bg-black ${
            tab == Tab.History ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Price History
        </Link>
        <Link
          onClick={() => setTab(Tab.Supply)}
          href={`/${game}/${item}`}
          className={`bg-black ${
            tab == Tab.Supply ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Supply and Demand
        </Link>
      </div>
      {children}
    </div>
  );
}
