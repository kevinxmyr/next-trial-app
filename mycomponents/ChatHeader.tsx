import React from "react";
import { FaTools } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { TbArrowsRandom } from "react-icons/tb";
import { RiQuestionMark } from "react-icons/ri";

type Props = {
  chatRoom: string;
};

function ChatHeader({ chatRoom }: Props) {
  if (!chatRoom) return "no room!";

  // console.log(chatRoom)

  function icon() {
    switch (chatRoom) {
      case "chat":
        return <FaTools />;
      case "tech":
        return <MdComputer size={29}/>;
      case "random":
        return <TbArrowsRandom size={29}/>;

      default:
        return <RiQuestionMark size={29}/>;
    }
  }
  return (
    <div className="flex space-x-2 items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight uppercase">
        {chatRoom === "chat" ? "General Room" : chatRoom}
      </h3>
      {icon()}
    </div>
  );
}

export default ChatHeader;
