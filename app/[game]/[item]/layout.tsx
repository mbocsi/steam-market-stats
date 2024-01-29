export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-column">
      <div className="p-16 pt-24 pb-0 text-black min-h-screen bg-white w-full flex flex-col gap-12">
        {children}
      </div>
    </div>
  );
}
