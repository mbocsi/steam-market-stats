import { getItem } from "@/app/lib/dbrequests";
import { getItemOrders } from "@/app/lib/requests";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: {
    item: string;
  };
}) {
  const item = await getItem(decodeURI(params.item));
  let orders;
  try {
    orders = item ? await getItemOrders(item?.itemNameId, true) : null;
  } catch {
    orders = null;
  }

  return (
    <div className="flex flex-row p-4 justify-around">
      <div className="text-center">
        Sell orders
        {orders ? (
          <div
            dangerouslySetInnerHTML={{
              __html: orders["sell_order_table"],
            }}
          />
        ) : (
          <p>Error loading table!</p>
        )}
      </div>
      <div className="text-center">
        Buy orders
        {orders ? (
          <div
            dangerouslySetInnerHTML={{ __html: orders["buy_order_table"] }}
          />
        ) : (
          <p>Error loading table!</p>
        )}
      </div>
    </div>
  );
}
