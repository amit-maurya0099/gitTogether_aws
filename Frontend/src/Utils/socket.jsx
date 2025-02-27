import {io} from "socket.io-client";

export const createSocketConnection=()=>{
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

    return io(SOCKET_URL, {
        transports: ["websocket","polling"],
        withCredentials: true,
    });
}