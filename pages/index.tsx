import { FaArrowRight } from "react-icons/fa";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Tdata = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Home({ data }: { data: Tdata[] }) {
  // if (!data) {
  //   return (
  //     <>
  //       no data from getSServerSideProps.{" "}
  //     </>
  //   );
  // }

  const router = useRouter();

  return (
    <>
      Index Page
      <Button className="bg-slate-600" onClick={() => router.push("/chat")}>
        chat page <FaArrowRight size={10} />
      </Button>
    </>
    // <div className="flex flex-col items-center justify-center">
    //   <h1 className="text-3xl font-extrabold uppercase text-center">
    //     this is a server side rendered page HOMEPAGE
    //   </h1>

    //   <ul>
    //     {data &&
    //       data.map((d) => (
    //         <li key={d.id}>
    //           <p>TITLE: {d.title}</p>
    //           <span>STATUS: {d?.completed?.toString()}</span>
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  );
}

// export const getServerSideProps = async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//     const data = await response.json();

//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     console.log("error has occurred", error);
//   }
// };
