export async function getPopularItems() {
  const url =
    "https://steamcommunity.com/market/search/render/?query=&count=3&search_descriptions=0&sort_column=popular&sort_dir=desc&norender=1";
  // console.log(`Attempted fetch: ${url}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch top 3 items");
  }
  return res.json();
}

export async function getPopularGameItems(appId: number, count: number) {
  const url = `https://steamcommunity.com/market/search/render/?query=appid:${appId}&count=${count}&search_descriptions=1&sort_column=popular&sort_dir=desc&norender=1`;
  // console.log(`Attempted fetch: ${url}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch top 3 items");
  }
  return res.json();
}

export async function getItemHistory(appid: number, item: string) {
  const url = `https://steamcommunity.com/market/pricehistory/?currency=1&appid=${appid}&market_hash_name=${item}`;
  // console.log(`Attempted fetch: ${url}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch item history ${res.status} ${res.statusText}\nhttps://steamcommunity.com/market/pricehistory/?currency=1&appid=${appid}&market_hash_name=${item}`
    );
  }
  return res.json();
}

export async function getItemHistory2(
  appid: number,
  itemHash: string,
  proxy = false
) {
  const url =
    (proxy ? "/api" : "https://steamcommunity.com") +
    `/market/listings/${appid}/${itemHash}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch item page ${res.status} ${res.statusText}\n${url}`
    );
  }

  let html_content = await res.text();
  const pos = html_content.search("var line1");
  if (pos == -1) {
    throw new Error(`Failed to find history in page ${url}`);
  }
  html_content = html_content.substring(pos);
  const init_pos = html_content.indexOf("[[");
  const final_pos = html_content.indexOf("]]");
  const history_string = html_content.substring(init_pos, final_pos + 2);
  return JSON.parse(history_string);
}

export async function getItemCurrent(
  appid: number,
  item: string,
  proxy: boolean = false
) {
  const url =
    (proxy ? "/api" : "https://steamcommunity.com") +
    `/market/priceoverview/?appid=${appid}&currency=1&market_hash_name=${item}`;
  // console.log(`Attempted fetch: ${url}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch current item status ${res.status} ${res.statusText}\n${url}`
    );
  }
  return res.json();
}

export async function getItemOrders(
  itemNameId: number,
  proxy: boolean = false
) {
  const url =
    (proxy ? "/api" : "https://steamcommunity.com") +
    `/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=${itemNameId}&two_factor=0`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch item orders ${res.status} ${res.statusText}\n${url}`
    );
  }
  return res.json();
}
