import { Heading } from "@chakra-ui/react";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-black">
      <Heading>Steam Market Statistics</Heading>
      <p className={lusitana.className}>Hola</p>
      <Image
        src="/next.svg"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="alt tag"
      />
    </main>
  );
}
