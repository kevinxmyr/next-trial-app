import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ data }: { data: string }) {

  if (!data) {
    return <>
      no data from getSServerSideProps.
    </>
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold uppercase text-center">this is a server side rendered page</h1>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      data: "hello"
    },
  };
};
