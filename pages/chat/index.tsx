import ChatList from "@/mycomponents/ChatList";
import MyForm from "@/mycomponents/MyForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../socket.js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router.js";
import ChatHeader from "../../mycomponents/ChatHeader";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [chatList, setChatList] = useState<string[]>([

  ]);
  const rooms = ["general", "tech", "random"];
  const route = useRouter();
  const pathname = route.pathname?.slice(1);

  useEffect(() => { //.POPULATE CHATLIST
    (
      async () => {
        const resp = await axios.get('https://dummyjson.com/users');
        const data = await resp.data;
        console.log(data.users);
        // setChatList((prev) => [...prev, data.users.firstName]);
        setChatList(data.users.map((user: any) => user.university))
      }
    )()

  }, [])


  // useEffect(() => {
  //   // CHECKIN IF THE API FOLDER IS STILL WORKING KASI MERON AKONG CUSTOM SERVER
  //   async function getAPI() {
  //     const response = await axios.get("http://localhost:3000/api/hello");
  //     const data = response.data;
  //     console.log(data.name);
  //   }
  //   getAPI();
  // }, []);

  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      onConnect();
    }

    // let timer: NodeJS.Timeout; //for testing purposes para ma dc lang after 10 seconds
    function onConnect() {
      console.log(`recovered? ${socket?.recovered}`);
      console.log("Connected to backend via Socket.IO");

      // timer = setTimeout(() => {
      //   if(socket?.io.engine){
      //     socket.io.engine.close();
      //   }
      // }, 10000);

      if (socket?.recovered) {
        console.log("recovered", socket.recovered);
      } else {
        console.log("not recovered", socket?.recovered);
      }
      setIsConnected(true);

      if (socket?.io?.engine?.transport) {
        setTransport(socket.io.engine.transport.name);

        socket.io.engine.on("upgrade", (transport: any) => {
          setTransport(transport.name);
        });
      }
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
      // clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const settingMessage = (data: string) => {
      console.log(chatList);
      setChatList((prev) => [...prev, data]);
    };
    socket?.on("chat message", settingMessage);

    return () => {
      socket?.off("chat message", settingMessage);
    };
  }, []);

  function joinpush(room: string) {
    socket?.emit("join", room);
    return route.push(`/chat/${room}`);
  }

  return <>
      <div className=" md:grid md:grid-cols-4 h-svh">

        <ChatHeader chatRoom={pathname} />

        <div className="hidden md:block col-span-1 bg-blue-500 p-4">
          <p>Left Column (25%)</p>
        </div>

        <div className="flex flex-col place-content-end h-[calc(100vh-4.5rem)] md:col-span-3">

          <div className="overflow-scroll max-h-[calc(100vh-8rem)]">
            <ChatList chatlists={chatList} />
          </div>

          <div className="p-4 w-full">
            <MyForm />
          </div>
        </div>

      </div>
    </>
}

//! ITONG NASA BABA PANG CHECK KUNG CONNECTED

  // <div className="flex flex-col items-center justify-center gap-10">

    //   <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight flex flex-col justify-center items-center">
    //     <span>Transport Protocol: {transport}</span>
    //     <span>Status: {isConnected ? <span className="text-lime-500">Connected</span> : <span className="text-rose-500">Disconnected</span>}</span>
    //   </h3>

    //   <ul className="flex gap-2">
    //     {rooms.map((room, index) => (
    //       <li key={index}>
    //         {/* <Button onClick={() => socket?.emit("join", room)}>{room}</Button> */}
    //         <Button onClick={() => joinpush(room)}>{room}</Button>
    //       </li>
    //     ))}
    //   </ul>

    //   <ChatList chatlists={chatList} />

    // </div>