// import { io } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

// export const socket = io(URL, {
//    autoConnect: false,
// })

import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://portfolio2025.up.railway.app"
    : typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "http://192.168.1.30:3000";

export const socket =
  typeof window !== "undefined"
    ? io(URL, {
        autoConnect: true,
        reconnection: true,
        connectionStateRecovery: {
          maxDisconnectionDuration: 2 * 60 * 1000,
          skipMiddlewares: true,
        },
        //pang check lang sa forced disconnection
        reconnectionDelay: 10000, // defaults to 1000
        reconnectionDelayMax: 10000, // defaults to 5000
      })
    : null;
