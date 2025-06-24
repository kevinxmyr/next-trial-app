import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  // DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef, useState } from "react";
import { TUserCreated, useUserCreatedStore, useUserStore } from "@/store";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  nouserfound: boolean;
  setNouserfound: (value: boolean) => void;
};

function NewUserModal() {
  const openmodalbtn = useRef<HTMLButtonElement>(null);
  const { nouserfound, setNouserfound } = useUserStore() as Props;
  const [nickname, setNickname] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { userCreated, setUserCreated } = useUserCreatedStore() as TUserCreated;

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (!openmodalbtn.current) return;
  //   if (nouserfound) {
  //     if (openmodalbtn.current) {
  //       timer = setTimeout(() => {
  //         openmodalbtn.current?.click();
  //         openmodalbtn.current?.classList.add("hidden");
  //       }, 1);
  //     }
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [nouserfound]);

  const [regexstate, setregexstate] = useState(false);

  function changeNickname(e: React.ChangeEvent<HTMLInputElement>) {
    const reg = /^[a-z.A-Z0-9]+$/;
    const newreg = /^(?!\.)((?!.*\.\.\.)([0-9a-zA-Z.]+))$/;
    setregexstate(newreg.test(e.target.value));
    if (!newreg.test(e.target.value) || e.target.value.length > 10) return;
    setNickname(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.username.value);
    if (
      e.currentTarget.username.value.length < 3 ||
      e.currentTarget.username.value.length > 10
    ) {
      toast.error("Username must be between 3 and 10 characters long");
      return;
    }
    // save to localstorage
    const url =
      "https://633d7113f2b0e623dc73e67b.mockapi.io/username_collection";
    try {
      const response_create_user = await axios.post(url, {
        username: e.currentTarget.username.value,
        userUUID: uuid(),
      });
      const data = response_create_user.data;
      console.log(data);
      if (data) {
        localStorage.setItem("username", data.userUUID);
        setNouserfound(false);
        toast.success(
          <span>
            User created successfully, Hello <b> {data.username}!</b>
          </span>,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setNouserfound(true);
        toast.error(error.message);
      } else console.error(error);
    }
    // close modal
    openmodalbtn.current?.click();
    const localusername = localStorage.getItem("username");
    console.log(localusername);
  };

  useEffect(() => {
    console.log(nickname.length)

    return () => {
      console.log('unmounted')
    }
  }, [nickname])


  return (
    <Dialog open={nouserfound}>
      <DialogTrigger asChild>
        <Button ref={openmodalbtn} variant="outline" className="hidden">
          Open Dialog/Modal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black ">
        <DialogHeader>
          <DialogTitle>Welcome to /chats</DialogTitle>
          <DialogDescription className="text-white">
            Please create a username <br/>
            <span className="italic text-yellow-400">
              no special characters allowed.
            </span>{" "}
            please keep it professional. thank you!
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">username</Label>
              <Input
                maxLength={10}
                minLength={3}
                autoComplete="off"
                className={`rounded-md transition-colors duration-500 p-4
                ${
                  !regexstate ||
                  (nickname.length < 3 || nickname.length > 10 || nickname.length === 0 )
                    ? "border-red-500"
                    : "border-green-500"
                }`}
                id="username-1"
                name="username"
                onChange={changeNickname}
              />
            </div>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose> */}
            <Button
              type="submit"
              role="button"
              variant="secondary"
              // onClick={() => console.log("clickeddd")}
              disabled={
                !regexstate ||
                nickname.length < 3 ||
                nickname.length > 10 ||
                nickname.length === 0
              }
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewUserModal;
