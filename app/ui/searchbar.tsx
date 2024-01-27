import { FaSearch } from "react-icons/fa";
import { redirect } from "next/navigation";

export default function SearchBar(props: any) {
  const { placeholder, href, bg } = props;

  async function search(formData: FormData) {
    "use server";

    redirect(`${href}?query=${formData.get("searchText")}`);
  }
  return (
    <form
      action={search}
      className={`p-3 rounded-full ${
        bg ? bg : "bg-white"
      } w-fit flex flex-row text-black items-center`}
    >
      <button
        type="submit"
        value="Submit"
        className="rounded-full bg-gray-300 bg-opacity-0 p-3 hover:bg-opacity-50 duration-200 ml-0"
      >
        <FaSearch size="2em" />
      </button>
      <input
        className="focus:outline-none text-3xl bg-transparent"
        name="searchText"
        placeholder={placeholder}
      ></input>
    </form>
  );
}
