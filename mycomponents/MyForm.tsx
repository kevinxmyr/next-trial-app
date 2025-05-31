import { socket } from "@/socket";
import React, { useEffect, useRef } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {};

function MyForm({}: Props) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [maxValueError, setMaxValueError] = React.useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputs = e.currentTarget;
    const [input2] = Array.from(inputs).slice(0, 1) as HTMLInputElement[];
    if (input2.value === "") return;
    const message = input2.value;
    socket?.emit("chat message", message);
    input2.value = "";
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    handleInput();
  }

  useEffect(() => {
    handleInput();
  }, []);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    setInputValue(textarea.value);

    // Reset height to auto to recalculate
    textarea.style.height = "auto";

    const lineHeight = 24; // px per line
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 5 * lineHeight;

    // Resize up to maxHeight
    const newHeight = Math.min(scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Determine number of visible lines
    const lineCount = Math.round(newHeight / lineHeight);

    if (inputValue.length === 0) {
      textarea.style.height = "2.3rem";
    }
    // Apply borderRadius based on number of lines
    if (lineCount >= 3) {
      textarea.style.borderRadius = "12px";
    } else if (lineCount === 2) {
      textarea.style.borderRadius = "2rem";
    } else {
      textarea.style.borderRadius = "10rem"; // rounded-full
    }
  };

  const keydownListener = (e: React.KeyboardEvent<HTMLFormElement>) => {
    console.log("keydown 🏃🏻🏃🏻");
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      console.log("ctrl+enter submit from MyForm");
      return onSubmit(e);
    }
  };

  return (
    <form
      onKeyDown={keydownListener}
      onSubmit={onSubmit}
      className="flex gap-2"
    >
      {/* <Input
        placeholder="iMessage"
        onChange={(e) => setInputValue(e.target.value)}
        className="overflow-scroll"
        maxLength={255}
      /> */}

      <textarea
        ref={textareaRef}
        onInput={handleInput}
        rows={1}
        maxLength={255}
        minLength={1}
        placeholder="!Message"
        title="chat area"
        className="w-full resize-none rounded-full border border-input bg-transparent px-[14px] py-[6px] text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        style={{
          resize: "none",
          minHeight: "2.3rem",
          maxHeight: "5rem",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "14px",
          paddingRight: "14px",
          overflow: "auto",
        }}
      />

      {/* <textarea
        style={{resize: "none", minHeight: "7px", maxHeight:"5rem", paddingTop: "6px", paddingLeft: "14px", paddingRight: "14px"}}
        className=" flex w-full rounded-full border border-input bg-transparent shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
        placeholder="iMessage"
        title="chat area"
        maxLength={255}
        minLength={1}
        rows={1}
        /> */}

      <span className="text-red-500 text-xs">
        {maxValueError ? "Max value exceeded" : ""}
      </span>

      <button className={inputValue === "" ? "hidden" : "block"} type="submit">
        <FaArrowCircleUp size={30} />
      </button>
    </form>
  );
}

export default MyForm;
