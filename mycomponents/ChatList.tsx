import React, { useEffect, useRef } from "react";

type Props = {
  chatlists: string[];
};

function ChatList({ chatlists }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isUserNearBottom = () => {
    const container = containerRef.current;
    if (!container) return false;

    const threshold = 100;
    const position = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;

    console.log(scrollHeight - position <= threshold)

    return scrollHeight - position <= threshold;

  }

  useEffect(() => {

    const container = containerRef.current;
    if (!container) return;

    if(isUserNearBottom()){
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatlists])

  return (
    <div ref={containerRef} className="flex flex-col gap-2 px-4">
      <ul className="flex flex-col gap-2">
        {chatlists?.map((chatlist, index) => (
          <li
            style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "5px", paddingBottom: "5px", borderRadius: ".5rem", width: "fit-content" }}
            className="bg-blue-500 flex flex-col gap-1"
            key={index}
          >
            <span>{chatlist}</span>
            <span className="text-xs">{new Date().toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatList;
