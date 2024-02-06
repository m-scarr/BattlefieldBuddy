import axios from "axios";
import io from 'socket.io-client';
import generateSocketActions from "./socket/index.ts"
import App, { EntityType } from "../classes/App.ts";
import { Socket } from "socket.io-client";
import Message from "../classes/Message.ts";

export default class API {
    static socketActions: any;
    static init() {
        const socket: Socket = io('http://localhost:3000', {
            withCredentials: true,
            transports: ["websocket"],
        });
        API.socketActions = generateSocketActions(socket);
        axios.defaults.baseURL = "http://localhost:3000";
        axios.defaults.withCredentials = true;
        API.user.isLoggedIn();

    }

    static user = {
        create: async (username: string, password: string, email: string) => {
            const response = await axios.post("http://localhost:3000/user/create", { username, password, email });
            return response;
        },
        isLoggedIn: async () => {
            const response = await axios.get("http://localhost:3000/user/isLoggedIn")
            if (response.data.success) {
                App.instance.user = response.data.user.dataValues;
            }
            return response;
        },
        logIn: async (username: string, password: string) => {
            await axios.post("http://localhost:3000/user/logIn", { username, password });
            window.location.href = "/";
        },
        update: async (_data: any) => { },
        logOut: async () => {
            await axios.delete("http://localhost:3000/auth/user/logOut");
            window.location.href = "/";
        },
    }

    static create = {
        [EntityType.Battlefield]: async () => {

        },
        [EntityType.Combatant]: async () => {

        },
    }

    static read = {
        [EntityType.Battlefield]: {
            byUser: async () => {

            },
            byId: async (_id: number) => {

            }
        },
        [EntityType.Combatant]: {
            byUser: async () => {

            },
        },
        [EntityType.Message]: {
            byUser: async () => {
                const messages = await axios.get("/auth/message/readByUser");
                messages.data.forEach((messageData: any) => {
                    Message.create(messageData);
                })
            }
        }
    }

    static update = {
        [EntityType.Battlefield]: async (_id: number, _data: any) => {

        },
        [EntityType.Combatant]: async (_id: number, _data: any) => {

        },
    }

    static delete = {
        [EntityType.Battlefield]: async (_id: number) => {

        },
        [EntityType.Combatant]: async (_id: number) => {

        },
    }
}