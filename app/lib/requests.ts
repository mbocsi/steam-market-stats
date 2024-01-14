export async function getPopularItems() {
  const res = await fetch(
    "https://steamcommunity.com/market/search/render/?query=&count=3&search_descriptions=0&sort_column=popular&sort_dir=desc&norender=1"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch top 3 items");
  }
  return res.json();
}
