import React, { useRef } from "react";
import { useRouter } from "next/router";
import ChatHeader from "./ChatHeader";
import { Dot } from "lucide-react";
import ChatList from "./ChatList";
import MyForm from "./MyForm";
import SideBarSheetMobile from "./ChatRouteComp/SideBarSheetMobile";

type Props = {
  isConnected?: boolean;
  transport?: string;
};

function ChatContainer({ isConnected, transport }: Props) {
  const router = useRouter();
  const pathname = (router.query.id as string) ?? "chat";
  const bottomRef = useRef<HTMLDivElement>(null); // FROM: CHATLIST COMPONENT

  // console.log(pathname);

  return (
    <div className="border-2">
      {/* CHAT HEADER */}

      <div className="relative flex p-2 justify-center border-2 border-black">
      <SideBarSheetMobile menulist={["General", "Tech", "Random"]} />
        <div className="mx-auto flex gap-2 items-center">
          <ChatHeader chatRoom={pathname} />
          {isConnected && <Dot size="2" color="green" />}
          {!isConnected && <Dot size="2" color="red" />}
          {transport === "polling" && <Dot size="2" color="yellow" />}
          {transport === "websocket" && <Dot size="2" color="blue" />}
        </div>
      </div>

      {/* CHATLIST */}
      <div className="flex flex-col place-content-center md:col-span-3">
        {/* h-[calc(100vh-4.5rem)]  */}
        <div className="overflow-scroll border- border-opacity-25">
          {/* max-h-[calc(100vh-5rem)] */}
          <ChatList bottomRef={bottomRef} height={"h-[calc(100svh-7.9rem)]"} />
        </div>

        {/* FORM CHATTAN */}
        <div className="px-4 py-3 w-full">
          <MyForm bottomRef={bottomRef} />
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
