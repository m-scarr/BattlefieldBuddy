import db from "../models/index.js";
import limitAttributes from "./limitAttributes.js"
import { Op } from "sequelize";

export default {
    authorized: {
        create: async (message, cb) => {
            try {
                await db.Message.create({ senderId: req.user.id, recipientId: message.recipientId, content: message.content });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                cb();
            }
        },
        readByUser: async (req, res) => {
            try {
                const messages = await db.Message.findAll({
                    where: {
                        [Op.or]:
                            [{ recipientId: req.user.id }, { senderId: req.user.id }]
                    },
                    include: [
                        { model: db.User, as: "sender", attributes: ["id", "username", "profilePic"] },
                        { model: db.User, as: "recipient", attributes: ["id", "username", "profilePic"] }]
                });
                //maybe this should occur on the front-end?
                /*const conversations = {};
                for (let i = 0; i < messages.length; i++) {
                    const message = messages[i];
                    if (message.dataValues.senderId === req.user.id) {
                        if (message.recipient.dataValues.username in conversations) {
                            conversations[message.recipient.dataValues.username].push(message);
                        } else {
                            conversations[message.recipient.dataValues.username] = [message];
                        }
                    } else {
                        if (message.sender.dataValues.username in conversations) {
                            conversations[message.sender.dataValues.username].push(message);
                        } else {
                            conversations[message.sender.dataValues.username] = [message];
                        }
                    }
                }*/
                res.json(messages);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        },
    }
}