import { Socket } from "socket.io-client";
import messageSocketHandlers from "./message.ts";

export default (socket: Socket) => {
    const message = messageSocketHandlers(socket);

    const actions = {
        ...message
    }

    return actions;
}