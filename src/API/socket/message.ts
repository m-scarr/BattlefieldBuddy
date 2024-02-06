import { Socket } from "socket.io-client";
import Message from "../../classes/Message";
//import App, { EntityType } from "../../classes/App";

export default (socket: Socket) => {
    socket.on("message", (messageData: { id: number, sender: { id: number, username: string, profilePic: string }, recipient: { id: number, username: string, profilePic: string }, content: string, createdAt: string }) => {
        Message.create(messageData);
        /*if (newMessage.chatName in App.instance[EntityType.Message]) {
            App.instance[EntityType.Message][newMessage.chatName].push(newMessage);
        } else {
            App.instance[EntityType.Message][newMessage.chatName] = [newMessage];
        }*/
    })
    socket.on("messageFailed", (message: string) => {
        alert(message);
    })
    const actions = {
        sendMessage: (newMessage: { recipientName: string, content: string }) => {
            socket.emit("message", newMessage);
        }
    }
    return actions;
}