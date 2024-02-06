import { makeAutoObservable } from "mobx";
import App, { EntityType } from "./App";

export default class Message {
    public readonly id: number;
    protected _sender: { id: number, username: string, profilePic: string }
    protected _recipient: { id: number, username: string, profilePic: string }
    public readonly content: string;
    //public static readonly list: Message[] = [];
    //public readonly createdAt: string;

    static create(data: { id: number, sender: { id: number, username: string, profilePic: string }, recipient: { id: number, username: string, profilePic: string }, content: string, /*createdAt: string*/ }) {
        const chatId = ((data.sender.id === App.instance.user!.id) ? data.recipient.id.toString() : data.sender.id.toString());
        console.log(chatId)
        console.log("sender: " + data.sender.id)
        console.log("recipient: " + data.recipient.id)
        console.log(App.instance.user)
        console.log("isSender: " + (App.instance.user!.id === data.sender.id))
        if ((chatId in App.instance[EntityType.Message])) {
            const conversation = App.instance[EntityType.Message][chatId];
            let found = false;
            for (let i = 0; i < conversation.length; i++) {
                const message = conversation[i];
                if (message.id === data.id) {
                    message._sender.username = data.sender.username;
                    message._sender.profilePic = data.sender.profilePic;
                    message._recipient.username = data.recipient.username;
                    message._recipient.profilePic = data.recipient.profilePic;
                    found = true;
                    break;
                }
            }
            if (!found) {
                new Message(data);
            }
        } else {
            new Message(data);
        }
        /*let found = false;
        for (let i = 0; i < Message.list.length; i++) {
            const message = Message.list[i];
            if (message.id === data.id) {
                message._sender.username = data.sender.username;
                message._sender.profilePic = data.sender.profilePic;
                message._recipient.username = data.recipient.username;
                message._recipient.profilePic = data.recipient.profilePic;
                found = true;
                break;
            }
        }
        if (found === false) {
            Message.list.push(new Message(data));
        }*/
    }
    constructor(data: { id: number, sender: { id: number, username: string, profilePic: string }, recipient: { id: number, username: string, profilePic: string }, content: string, /*createdAt: string*/ }) {
        this.id = data.id;
        this._sender = data.sender;
        this._recipient = data.recipient;
        this.content = data.content;
        //this.createdAt = data.createdAt;
        const chatId = ((App.instance.user !== null && App.instance.user.id === data.sender.id) ? data.recipient.id.toString() : data.sender.id.toString());
        if (chatId in App.instance[EntityType.Message]) {
            App.instance[EntityType.Message][chatId].push(this);
        } else {
            App.instance[EntityType.Message][chatId] = [this];
        }
        makeAutoObservable(this);
    }
    public get sender() {
        return this._sender;
    }
    public get recipient() {
        return this._recipient;
    }
}