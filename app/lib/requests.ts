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

export async function getItemHistory(appid: number, item: string) {
  const url = `https://steamcommunity.com/market/pricehistory/?currency=1&appid=${appid}&market_hash_name=${item}`;
  // console.log(`Attempted fetch: ${url}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch item history");
  }
  return res.json();
}

export async function getItemCurrent(appid: number, item: string) {
  const url = `https://steamcommunity.com/market/priceoverview/?appid=${appid}&currency=1&market_hash_name=${item}`;
  // console.log(`Attempted fetch: ${url}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch item history");
  }
  return res.json();
}
