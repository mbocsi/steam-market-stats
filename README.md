# Steam APIS
```
http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json
```
Gets all steam games (Not used now)
```
https://store.steampowered.com/api/appdetails?appids=730
```
Gets info on one game
```
https://steamcommunity.com/market/search/render/?query=&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&norender=1
```
Gets all steam market items (first 100 by popularity)
```
https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=StatTrak%E2%84%A2%20M4A1-S%20|%20Hyper%20Beast%20(Minimal%20Wear)
```
Gets current price and volume for item
```
https://steamcommunity.com/market/pricehistory/?currency=1&appid=730&market_hash_name=Danger%20Zone%20Case
```
Gets price history for the item
```
https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=176024744&two_factor=0
```
Gets price orders on an item

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.