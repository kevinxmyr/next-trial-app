import React, { Dispatch, SetStateAction } from "react";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";
import MyForm from "./MyForm";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { FaChevronLeft } from "react-icons/fa";

type Props = {
};

function ChatContainer({ }: Props) {
  const router = useRouter();
  const pathname = (router.query.id as string) ?? "chat";

  // console.log(pathname);

  return (
    <div className=" md:grid md:grid-cols-4 h-dvh border-2">
      <div className="sticky top-0">
        {pathname !== "chat" ? (
          <div className="relative flex items-center p-2">
            {/* Left-aligned Button */}
            <div className="absolute left-2">
              <Button variant="ghost" onClick={() => router.push("/chat")}>
                <FaChevronLeft />
                General
              </Button>
            </div>

            {/* Centered ChatHeader */}
            <div className="mx-auto">
              <ChatHeader chatRoom={pathname} />
            </div>
          </div>
        ) : (
          <div className="relative flex p-2">
            <div className="flex gap-2 absolute left-2">
              <Button variant="ghost" onClick={() => router.push("/chat/tech")}>
                Tech
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/chat/random")}
              >
                Random
              </Button>
            </div>
            <div
              className="mx-auto"
              //   style={{ padding: "1rem" }}
            >
              <ChatHeader chatRoom={pathname} />
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block col-span-1 bg-blue-500 p-4">
        <p>Left Column (25%)</p>
      </div>

      <div className="flex flex-col place-content-center md:col-span-3">
        {/* h-[calc(100vh-4.5rem)]  */}
        <div className="overflow-scroll border-2 border-cyan-500 ">
          {/* max-h-[calc(100vh-5rem)] */}
          <ChatList
            height={"h-[calc(100svh-7.9rem)]"}
            />
        </div>

        <div className="px-4 py-3 w-full">
          <MyForm />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;

// const contacts = {
//    A: ["Andrew Alfred", "Aisha Houston", "Amanda Clark", "Albert King"],
//    B: ["Bob Alfred", "Billie Jean", "Barbara Smith", "Ben Carson"],
//    C: ["Charlie Puth", "Carla Lewis", "Clara Oswald", "Chris Evans"],
//    D: ["Diana Ross", "Daniel Craig", "Donna Noble", "Derek Hale"],
//    E: ["Eve Adams", "Ethan Hunt", "Eliza Thornberry", "Edward Cullen"],
//    F: ["Frank Ocean", "Fiona Apple", "Fred Weasley", "Florence Welch"],
//    G: ["George Michael", "Gina Torres", "Gordon Ramsay", "Gwen Stacy"],
//    H: ["Harry Styles", "Hannah Montana", "Hugh Jackman", "Haley James"],
//    I: ["Isaac Newton", "Iris West", "Ian McKellen", "Imogen Heap"],
//    J: ["Jack Sparrow", "Jenna Ortega", "James Bond", "Jane Foster"],
//    K: ["Kanye West", "Katy Perry", "Keira Knightley", "Kyle Reese"],
//    L: ["Lana Del Rey", "Luke Skywalker", "Liam Neeson", "Laura Palmer"],
//    M: ["Michael Scott", "Megan Fox", "Miles Morales", "Meryl Streep"],
//    N: ["Nick Fury", "Nina Dobrev", "Noah Centineo", "Nancy Drew"],
//    O: ["Olivia Rodrigo", "Oscar Isaac", "Oprah Winfrey", "Orlando Bloom"],
//    P: ["Peter Parker", "Penelope Cruz", "Paul Rudd", "Phoebe Buffay"],
//    Q: ["Quentin Tarantino", "Queen Latifah", "Quavo", "Quinn Fabray"],
//    R: ["Rachel Green", "Ryan Reynolds", "Rihanna", "Robert Downey Jr."],
//    S: ["Steve Rogers", "Selena Gomez", "Sandra Bullock", "Stephen Curry"],
//    T: ["Taylor Swift", "Tom Holland", "Tessa Thompson", "Tobey Maguire"],
//    U: ["Uma Thurman", "Ulysses Grant", "Ulrich Nielsen", "Ursula"],
//    V: ["Vin Diesel", "Victoria Beckham", "Vera Farmiga", "Vanessa Hudgens"],
//    W: ["Will Smith", "Winona Ryder", "Wanda Maximoff", "Walter White"],
//    X: ["Xander Harris", "Xiomara Villanueva", "Xenia Onatopp", "Xiao Zhan"],
//    Y: ["Yara Shahidi", "Yolanda Adams", "Yasmine Bleeth", "Yusuf Islam"],
//    Z: ["Zayn Malik", "Zendaya", "Zoe Saldana", "Zachary Levi"],
//  };
// const colors = [
//   "bg-red-500",
//   "bg-orange-500",
//   "bg-amber-500",
//   "bg-yellow-500",
//   "bg-lime-500",
//   "bg-green-500",
//   "bg-emerald-500",
//   "bg-teal-500",
//   "bg-cyan-500",
//   "bg-sky-500",
//   "bg-blue-500",
//   "bg-indigo-500",
//   "bg-violet-500",
//   "bg-purple-500",
//   "bg-pink-500",
// ];

{
  /*<div className="h-screen overflow-y-auto"></div>
 {
   Object.entries(contacts).map(([letter, names]) => {
      return <div key={letter} className="px-5 relative">
         <p className={`sticky top-0 z-50 text-xl font-bold text-center py-2 px-4 border-2 rounded-lg ${colors[Math.floor(Math.random() * colors.length)]}`}>{letter}</p>
         <div className="flex flex-col gap-2">
            {
               names.map((name) => {
                  return <p key={name}>{name}</p>
               })
            }
         </div>
      </div>
   })
} */
}

{
  /* {Object.entries(contacts).map(([letter, names]) => (
        <div key={letter}>
          <div className="sticky top-0 z-50 bg-rose-500 px-4 py-2 border-b text-lg font-semibold">
            {letter}
          </div>
          <div className="px-4 py-2 space-y-3">
            {names.map((name) => {
              const initials = name
                .split(" ")
                .map((n) => n[0].toUpperCase())
                .join("");
              return (
                <div key={name} className="flex items-center gap-3">
                  <img
                    src={`https://placehold.co/60x60/transparent/999?text=${initials}`}
                    alt={name}
                    className="w-10 h-10 rounded-full border-2 border-rose-500"
                  />
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      </div>*/
}
