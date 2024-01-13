export default function Page({
  params,
}: {
  params: { game: string; item: string };
}) {
  return (
    <div className="p-32">
      <p>Item: {params.game}</p>
      <p>Item: {params.item}</p>
      <p>test</p>
    </div>
  );
}
