import { create } from "zustand";

type TChat = {
  chatListStore: string[];
  setChatListStore: (newChatMessage: string) => void;
}

export const useChatListStore = create<TChat>((set) => ({
  chatListStore: ["open", "and", "close"],
  setChatListStore: (newChatMessage: string) =>
    set((state: TChat) => ({ chatListStore: [...state.chatListStore, newChatMessage] })),
}));

