import db from "../models/index.js";
import { sockets } from "../server.js";

export default (socket) => {
    console.log("MESSAGE SOCKET HANDLER INITILAIZED")
    socket.on("message", async (messageData) => {
        console.log(messageData);
        try {
            const recipient = await db.User.findOne({ where: { username: messageData.recipientName }, attributes: ["id", "username", "profilePic"] });
            if (recipient) {
                try {
                    const newMessage = await db.Message.create({ senderId: socket.request.user.id, recipientId: recipient.dataValues.id, content: messageData.content });
                    const sender = socket.request.user;
                    if (recipient.dataValues.id.toString() in sockets) {
                        sockets[recipient.dataValues.id.toString()].emit("message", { ...newMessage.dataValues, sender, recipient });
                    }
                }
                catch (err) {
                    console.error("Message could not be created: " + err)
                    socket.emit("messageFailed", "The message could not be created");
                }
            } else {
                console.error("User not found: " + err)
                socket.emit("messageFailed", "The recipient was not found");
            }
        }
        catch (err) {
            console.error("User find failed: " + err)
            socket.emit("messageFailed", "The recipient was not found");
        }

    })
    const actions = {
    }
    return actions;
}