"use client";
import { useState } from "react";

enum Tab {
  Summary,
  Orders,
  History,
  Supply,
}

export default function ItemStats(props: any) {
  const [tab, setTab] = useState(Tab.Summary);
  const { orders } = props;

  return (
    <div className="bg-slate-100 h-full rounded-lg">
      <div className="flex flex-row border-b-2">
        <button
          onClick={() => setTab(Tab.Summary)}
          className={`bg-black ${
            tab == Tab.Summary ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Summary
        </button>
        <button
          onClick={() => setTab(Tab.Orders)}
          className={`bg-black ${
            tab == Tab.Orders ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Orders
        </button>
        <button
          onClick={() => setTab(Tab.History)}
          className={`bg-black ${
            tab == Tab.History ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Price History
        </button>
        <button
          onClick={() => setTab(Tab.Supply)}
          className={`bg-black ${
            tab == Tab.Supply ? "bg-opacity-10" : "bg-opacity-0"
          } p-4 hover:bg-opacity-25`}
        >
          Supply and Demand
        </button>
      </div>
      <div className="flex flex-col p-4">
        <div className="p-4 flex flex-row justify-between">
          <p>PREVIOUS CLOSE</p>
          <p>Price</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>DAY RANGE</p>
          <p>Price</p>
        </div>
        <div className="p-4 border-t-2 flex flex-row justify-between">
          <p>MARKET CAP</p>
          <p>Price</p>
        </div>
      </div>
    </div>
  );
}
