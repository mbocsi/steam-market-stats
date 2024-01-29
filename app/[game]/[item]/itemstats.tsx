"use client";
import { useState, useEffect } from "react";
import { getItemOrders } from "@/app/lib/requests";

enum Tab {
  Summary,
  Orders,
  History,
  Supply,
}

function ItemSummary(props: any) {
  const { item } = props;
  return (
    <div className="flex flex-col p-4">
      <div className="p-4 flex flex-row justify-between">
        <p>PREVIOUS CLOSE</p>
        <p>$xx.xx</p>
      </div>
      <div className="p-4 border-t-2 flex flex-row justify-between">
        <p>DAY RANGE</p>
        <p>$xx.xx - $xx.xx</p>
      </div>
      <div className="p-4 border-t-2 flex flex-row justify-between">
        <p>YEAR RANGE</p>
        <p>$xx.xx - $xx.xx</p>
      </div>
      <div className="p-4 border-t-2 flex flex-row justify-between">
        <p>MARKET CAP</p>
        <p>$xxxxx</p>
      </div>
    </div>
  );
}

function ItemHistory() {
  return (
    <div className="p-4 flex flex-col text-center justify-center">
      <p className="text-4xl">Item History Placeholder</p>
    </div>
  );
}

function ItemOrders(props: any) {
  const { item, orders } = props;
  console.log(orders);
  if (orders) {
    return (
      <div
        className="p-4"
        dangerouslySetInnerHTML={{ __html: orders["sell_order_table"] }}
      ></div>
    );
  } else {
    return <div className="p-4">Error getting orders</div>;
  }
}

function ItemSupply() {
  return (
    <div className="p-4 flex flex-col text-center justify-center">
      <p className="text-4xl">Item Supply Placeholder</p>
    </div>
  );
}

function ItemData(props: any) {
  const { tab, item, orders } = props;
  switch (tab) {
    case Tab.Summary:
      return <ItemSummary item={item} />;
    case Tab.History:
      return <ItemHistory />;
    case Tab.Orders:
      return <ItemOrders item={item} orders={orders} />;
    case Tab.Supply:
      return <ItemSupply />;
  }
}

export default function ItemStats(props: any) {
  const [tab, setTab] = useState(Tab.Summary);
  const { item, orders } = props;

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

      <ItemData tab={tab} item={item} orders={orders} />
    </div>
  );
}
