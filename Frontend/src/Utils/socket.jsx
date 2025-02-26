import {io} from "socket.io-client";

export const createSocketConnection=()=>{
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    const SOCKET_URL = `${window.location.origin}/socket.io/`;

    return io(SOCKET_URL, {
        transports: ["websocket"],
        withCredentials: true,
    });
}