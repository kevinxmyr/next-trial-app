import ChatContainer from "@/mycomponents/ChatContainer";
import ChatHeader from "@/mycomponents/ChatHeader";
import ChatList from "@/mycomponents/ChatList";
import MyForm from "@/mycomponents/MyForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {} // If you don't have props, you can remove this interface

function IdChat({}: Props) {
  const rooms = ["tech", "random"];
  const router = useRouter();

  //! FETCH THE DATA FROM DATABASE AYON SA ROOM NAME

  useEffect(() => {
    // Ensure router.query.id exists and is not undefined before checking

    console.log(router.query.id);

    if (router.query.id) {
      const roomId = router.query.id as string;
      if (!rooms.includes(roomId)) {
        console.log("room not found");
      }
    }
  }, [router, rooms]); // router is a dependency, as are roomId (via router.query.id) and rooms

  // Once router.query.id is available and validated, display it
  return <ChatContainer />;
}

export default IdChat;


/// todo: GAWIN NA ANG OTHER ROOMS IHANDA KUNG MAG DADAGDAG PA NG ROOM