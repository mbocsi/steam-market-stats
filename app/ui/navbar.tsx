import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const links: { [key: string]: string }[] = [
    {
      href: "/games",
      name: "Games",
    },
    {
      href: "/market",
      name: "Market",
    },
  ];

  return (
    <div className="fixed w-full z-10 top-0 ">
      <div className="bg-scroll bg-gradient-to-b from-black to-transparent h-32 w-full absolute"></div>
      <div className="h-16 w-full absolute items-center flex px-8 z-20">
        <div className="float-left items-center bg-white bg-opacity-0 hover:bg-opacity-20">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={200}
              height={64}
              alt="Steam market stats logo"
            />
          </Link>
        </div>
        <div className="mx-8 w-full h-full items-center content-center justify-center flex">
          <nav>
            <ul className="flex justify-center content-center items-center">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="rounded-full bg-white bg-opacity-0 px-4 py-2 hover:bg-opacity-10 duration-200 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="float-right h-full flex justify-center items-center">
          <Link
            href=""
            className="whitespace-nowrap bg-teal-500 px-4 py-2 rounded-lg text-lg"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
