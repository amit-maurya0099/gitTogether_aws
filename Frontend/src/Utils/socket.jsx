import {io} from "socket.io-client";

export const createSocketConnection=()=>{
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const SOCKET_URL = "http://51.21.2.211:3000";

    return io(SOCKET_URL, {
        transports: ["websocket","polling"],
        withCredentials: true,
    });
}