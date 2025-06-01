import React from "react";
import { FaTools } from "react-icons/fa";


type Props = {
  chatRoom: string;
};

function ChatHeader({ chatRoom }: Props) {
  if (!chatRoom) return "no room!";

  return (
    <div className="p-4 flex justify-center items-center gap-2">
       <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
         {chatRoom === 'chat' ? 'General Room' : chatRoom}
       </h3>
       <FaTools />
    </div>
  );
}

export default ChatHeader;
