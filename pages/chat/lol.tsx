import ChatList from "@/mycomponents/ChatList";

import ToggleDarkMode from "@/mycomponents/ToggleDarkMode";
import useWindowSize from "@/myutils/windowsize";

type Props = {};

function lol({}: Props) {
  const ws = useWindowSize();
  return (
    <>
      {/* <Layout> */}
        <ChatList />
      {/* </Layout> */}
    </>
  );
}

export default lol;
