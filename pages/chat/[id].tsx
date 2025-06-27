import ChatContainer from "@/mycomponents/ChatContainer";
import ChatHeader from "@/mycomponents/ChatHeader";
import ChatList from "@/mycomponents/ChatList";
import MyForm from "@/mycomponents/MyForm";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {} // If you don't have props, you can remove this interface

function IdChat({}: Props) {
  const rooms = ["tech", "random"];
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  //! FETCH THE DATA FROM DATABASE AYON SA ROOM NAME

  useEffect(() => {
    setLoading(true)

    if(!router.isReady){
      return;
    }
    if (router.query.id) {
      const roomId = router.query.id as string;
      if (!rooms.includes(roomId) || !roomId) {
        router.replace("/404");
      }
      setLoading(false)
    }
  }, [router.isReady, rooms, router.query.id, router]); // router is a dependency, as are roomId (via router.query.id) and rooms

  if(loading && router.isReady && router.query.id){
    return null
  }
  // Once router.query.id is available and validated, displ ay it
  return <ChatContainer />;
}

export default IdChat;


/// todo: GAWIN NA ANG OTHER ROOMS IHANDA KUNG MAG DADAGDAG PA NG ROOM

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {

  console.log('from getserversideprops')

  const rooms = ["tech", "random"];
  const roomId = req.query.id as string;

  if(!rooms.includes(roomId) || !roomId){
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: null
    }
  }
}