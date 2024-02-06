import messageSocketHandlers from "./message.js";

export default (socket) => {
    console.log("_____________________MESSAGE SOCKET HANDLER INITILAIZED")
    const message = messageSocketHandlers(socket);

    const actions = {
        ...message
    }

    return actions;
}