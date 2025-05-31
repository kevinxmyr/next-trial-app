import MyForm from "@/mycomponents/MyForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {} // If you don't have props, you can remove this interface

function IdChat({}: Props) {
  const rooms = ["general", "tech", "random"];
  const router = useRouter();

  useEffect(() => {
    // Ensure router.query.id exists and is not undefined before checking
    if (router.query.id) {
      const roomId = router.query.id as string;
      if (!rooms.includes(roomId)) {
        router.push("/404");
      }
    }
  }, [router, router.query.id, rooms]); // router is a dependency, as are roomId (via router.query.id) and rooms

  // You might want to show a loading state until router.query.id is available
  if (!router.query.id) {
    return <div>Loading room...</div>;
  }

  // Once router.query.id is available and validated, display it
  return (
    <div>
      Welcome to the {router.query.id} room!
      <MyForm />
    </div>
  );
}

export default IdChat;
