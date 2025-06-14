import { useChatListStore } from "@/store";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImSpinner2 } from "react-icons/im";
import { Badge } from "@/components/ui/badge";

type Props = {
  height?: string;
};

function ChatList({ height }: Props) {
  let heightValue = height;
  if (typeof height === undefined) {
    heightValue = `h-[calc(100svh-7.9rem)]`;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topdivref = useRef<HTMLDivElement>(null);
  // This state is used to control the visibility of the "fetch new data" button at the top of the chat list.
  // When the user is at the top of the chat list, the button is visible, and when the user is not at the top, the button is hidden.
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [windowResize, setWindowResize] = useState<Record<string, number>>({
    height: 0,
    width: 0,
  });

  const { chatListStore, setChatListStore } = useChatListStore();

  //check if the container is overflowing and check if to fetch new data. if the chat list is not occupaying to overflow, then fetch new data
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setIsOverflowing(container.scrollHeight > container.clientHeight);
  }, [chatListStore]);

  const isUserNearBottom = () => {
    const container = containerRef.current;
    if (!container) return false;

    const threshold = 150; // in pixels
    const position = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // console.log({minus: (scrollHeight - position), threshold, answer: (scrollHeight - position <= threshold) });

    // console.log({
    //   scrollTop: container.scrollTop,
    //   clientHeight: container.clientHeight,
    //   total_POSITION: container.scrollTop + container.clientHeight,
    //   scrollHeight: container.scrollHeight,
    //   calc: scrollHeight - position,
    // });

    return scrollHeight - position <= threshold;
  };

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if(!container) return;
  //   console.log(windowResize)
  //   const handleResize = () => {
  //     setWindowResize(container.clientHeight);
  //   }
  //   window.addEventListener("resize", handleResize);
  //   handleResize()
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   }
  // }, [])

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function setter() {
      setWindowResize({
        height: container?.clientHeight || 0,
        width: container?.clientWidth || 0,
      });
    }

    const observer = new IntersectionObserver(setter);
    observer.observe(container);

    window.addEventListener("resize", setter);

    return () => {
      observer.unobserve(container);
      window.removeEventListener("resize", setter);
    };
  }, []);

  useEffect(() => {
    console.log("isOverflowing", isOverflowing);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isVisible && isOverflowing) {
          const randomStrings = Array.from({ length: 1 }, () =>
            Math.random().toString(36),
          );
          setIsVisible(true);
          setLoading(true);
          const id = setTimeout(() => {
            setChatListStore(randomStrings[0]);
            setLoading(false);
          }, 2000);
          return () => {
            clearTimeout(id);
          };
        } else if (!entry.isIntersecting && isVisible) {
          setIsVisible(false);
        }
      },
      { root: containerRef.current, threshold: 0.5 },
    );
    if (topdivref.current) {
      observer.observe(topdivref.current);
    }
    return () => {
      if (topdivref.current) {
        observer.unobserve(topdivref.current);
      }
    };
  }, [isVisible, isOverflowing]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isUserNearBottom() === true) {
      console.log(isUserNearBottom());
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(isUserNearBottom());
    }
  }, [chatListStore, isOverflowing]);

  // this effect is used to scroll the top element to the top of the viewport
  // when the component is mounted. This is useful for when the user comes back
  // to the chat list after being at the bottom, and the new messages are added
  // to the top of the list, so that the user can see the new messages.
  // useEffect(() => {
  //   const topcont = topdivref.current;
  //   if (!topcont) return;
  //     topcont.scrollBy({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  // }, []);

  // useEffect(() => {
  //   const container = document.getElementById("containerId");

  //   container?.addEventListener("scroll", () => {
  //     const height = container?.clientHeight;
  //     setViewTop(height);
  //   });
  //   console.log({ viewTop });
  //   return () => {
  //     container?.removeEventListener("scroll", () => {
  //       console.log("removed");
  //     });
  //   };
  // }, [viewTop]);

  useEffect(() => {
    console.log(chatListStore);
  }, [chatListStore]);

  return (
    <div
      id="containerId"
      ref={containerRef}
      className={`relativeflex flex-col gap-2 px-4 overflow-scroll ${heightValue}`}
    >
      <div
        className="flex justify-center py-2 duration-500 transition-all"
        ref={topdivref}
      >
        {loading && (
          <ImSpinner2 size={25} className="animate-spin text-center" />
        )}
      </div>
      <ul className="flex flex-col gap-2">
        {chatListStore?.map((chatlist, index) => (
          <li
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: ".5rem",
              width: "fit-content",
            }}
            className="bg-blue-500 flex flex-col gap-1"
            key={index}
          >
            {" "}
            {chatlist}
            {/*//! CAUSING HYDRATION ERROR! <span className="text-xs">{new Date().toLocaleString()}</span> add here the time from database */}
            '''''{windowResize.height}by{windowResize.width}
          </li>
        ))}
      </ul>
      <div ref={bottomRef} />

      <Badge
        className="absolute top-20 opacity-50 right-2"
        variant={loading || isOverflowing ? "truth" : "pulse"}
      >
        <span>OF: {isOverflowing ? "true" : "false"}</span>
      </Badge>
      <Badge
        className="absolute top-[7rem] opacity-50 right-2"
        variant={loading ? "truth" : "pulse"}
      >
        <span>LDNG: {loading ? "true" : "false"}</span>
      </Badge>
    </div>
  );
}

export default ChatList;

// import { useEffect, useRef, useState } from "react";

// export default function ChatList({ chatlists, height }: { chatlists: string[]; height: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const topdivref = useRef<HTMLDivElement>(null);
//   const bottomdivref = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//     const isUserNearBottom = () => {
//     const container = containerRef.current;
//     if (!container) return false;

//     const threshold = 350; // in pixels
//     const position = container.scrollTop + container.clientHeight;
//     const scrollHeight = container.scrollHeight;

//     // console.log({minus: (scrollHeight - position), threshold, answer: (scrollHeight - position <= threshold) });

//     console.log({
//       scrollTop: container.scrollTop,
//       clientHeight: container.clientHeight,
//       total_POSITION: container.scrollTop + container.clientHeight,
//       scrollHeight: container.scrollHeight,
//       calc: scrollHeight - position,
//     });

//     return scrollHeight - position <= threshold;
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (isUserNearBottom() === true) {
//       console.log(isUserNearBottom());
//       bottomdivref.current?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       console.log(isUserNearBottom());
//     }
//   }, [chatlists]);

//   useEffect(() => {
//     bottomdivref.current?.scrollIntoView({ behavior: 'smooth' });
//   }, []);

//   return (
//     <div
//       id="containerId"
//       className={`flex flex-col gap-2 px-4 overflow-scroll ${height}`}
//     >
//       <div
//         ref={topdivref}
//         style={{ height: '50px', backgroundColor: '#f0f0f0' }}
//       />
//       <ul className="flex flex-col gap-2">
//         {chatlists?.map((chatlist, index) => (
//           <li
//             key={index}
//             className="bg-blue-500 flex flex-col gap-1"
//             style={{
//               paddingLeft: "1rem",
//               paddingRight: "1rem",
//               paddingTop: "5px",
//               paddingBottom: "5px",
//               borderRadius: ".5rem",
//               width: "fit-content",
//             }}
//           >
//             <span>{chatlist}</span>
//           </li>
//         ))}
//       </ul>
//       <div ref={bottomdivref} />
//     </div>
//   );
// }
