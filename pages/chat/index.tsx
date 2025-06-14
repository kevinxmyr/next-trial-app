import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../socket.js";
import { useRouter } from "next/router.js";
import ChatContainer from "../../mycomponents/ChatContainer";
import { useChatListStore } from "@/store";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const { chatListStore, setChatListStore } = useChatListStore();
  const route = useRouter();

  useEffect(() => {
    setChatListStore("new_hello")
  }, []);

  // useEffect(() => {
  //   //.POPULATE CHATLIST
  //   (async () => {
  //     try {
  //       const resp = await axios.get(
  //         `https://dummyjson.com/users?limit=${limit}${
  //           skip ? `&skip=${skip}` : ""
  //         }`,
  //       );
  //       const data = await resp.data;
  //       console.log(data.users);
  //       // setChatList((prev) => [...prev, data.users.firstName]);

  //       setChatList(
  //         data.users.map(
  //           (user: any) =>
  //             `${user.lastName}, ${user.firstName} from ${
  //               user?.address?.city
  //             }, i am a ${user.gender === "female" ? "F" : "M"} - ${
  //               user.age
  //             } years old - ${data.users.length}`,
  //         ),
  //       );

  //       // setChatList(data.users.filter((u: any) => u.age >= 45).map((user: any) => `${user.lastName}, ${user.firstName} from ${user?.address?.city}, i am a ${user.gender === 'female' ? "F" : "M" } - ${user.age} years old`))
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

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
      console.log(data, chatListStore)
      // console.log({msg: "chat-index.tsx",chatListStore, data});
      setChatListStore(data);
    };
    socket?.on("chat message", settingMessage);

    return () => {
      socket?.off("chat message", settingMessage);
    };
  }, []);

  return (
    <>
    isConnected: {isConnected}
    transport: {transport}
      <ChatContainer />
    </>
  );
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
