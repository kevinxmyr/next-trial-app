import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  menulist: string[];
};

function SideBarSheetMobile({ menulist }: Props) {
  const router = useRouter();
  const isEmpty = (obj: object) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;
  console.log(router.query);
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-[18rem] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Select Room:</SheetTitle>
          <SheetDescription>ROOM IS FUN!</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-5">
          {menulist.map((item, index) => {
            if (
              router.query.id === item.toLocaleLowerCase() ||
              (router.pathname === "/chat" && router.query.id === undefined)
            ) {
              return (
                <Button variant="default" key={index}>
                  <Link href={`/chat/${item.toLocaleLowerCase()}`}>{item}</Link>
                </Button>
              );
            }
            return (
              <Button variant="outline" key={index}>
                <Link href={`/chat/${item.toLocaleLowerCase()}`}>{item}</Link>
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBarSheetMobile;
