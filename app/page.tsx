import { FaSearch } from "react-icons/fa";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-[url('/dark1.jpg')]">
      <div className="min-h-screen flex flex-col ">
        <div className="p-32">
          <header className="text-8xl w-2/3 font-bold">
            Steam Market Statistics
          </header>
          <p className="text-2xl my-8 font-semibold">
            Find complete market statistics on any item from any game on steam.
          </p>
          <div className="p-3 rounded-full bg-white w-fit flex text-black items-center space-x-3 my-8">
            <button className="rounded-full bg-gray-300 bg-opacity-0 p-3 hover:bg-opacity-50 duration-200">
              <FaSearch size="2em" />
            </button>
            <input
              className="focus:outline-none text-3xl"
              placeholder="Search items here"
            ></input>
          </div>
        </div>
      </div>
    </main>
  );
}
