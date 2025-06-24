import { create } from "zustand";

type TChat = {
  chatListStore: string[];
  setChatListStore: (newChatMessage: string) => void;
  setMessageHistory: (prevMessage: string) => void;
}

export const useChatListStore = create<TChat>((set) => ({
  chatListStore: ["initial", "asd", 'asdfff', 'asdfasdfasdf', "initial", "asd", 'asdfff', 'asdfasdfasdf', "initial", "asd", 'asdfff', 'asdfasdfasdf'],
  setChatListStore: (newChatMessage: string) =>
    set((state: TChat) => ({ chatListStore: [...state.chatListStore, newChatMessage] })),
  setMessageHistory: (prevMessage: string) =>
    set((state: TChat) => ({ chatListStore: [prevMessage, ...state.chatListStore] })),
}));

type TUser = {
  nouserfound: boolean;
  setNouserfound: (doesUserExist: boolean) => void;
}

export const useUserStore = create((set) => ({
  nouserfound: false,
  setNouserfound: (doesUserExist: boolean) =>
    set((state: TUser) => ({ nouserfound: doesUserExist })),
}));


// userCreated: boolean // if the api from creating api is successful, then it will be true
export type TUserCreated = {
  userCreated: boolean;
  setUserCreated: (doesUserExist: boolean) => void;
}

export const useUserCreatedStore = create((set) => ({
  userCreated: false,
  setUserCreated: (doesUserExist: boolean) =>
    set((state: TUserCreated) => ({ userCreated: doesUserExist })),
}));