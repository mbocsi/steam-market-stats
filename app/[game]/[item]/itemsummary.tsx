export default function ItemSummary(props: any) {
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
