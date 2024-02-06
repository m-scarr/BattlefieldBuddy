import { useState } from "react";
import App, { View } from "../classes/App";
import API from "../API";

type Props = {}

export default function Messages({ }: Props) {
    const [message, setMessage] = useState("");
    const [recipientName, setRecipientName] = useState("");
    return (
        <div>Messages
            <input type="text" value={message} onChange={(e: any) => {
                setMessage(e.target.value);
            }} />
            <input type="text" value={recipientName} onChange={(e: any) => {
                setRecipientName(e.target.value);
            }} />
            <button onClick={() => {
                App.instance.currentView = View.Messages;
            }}>
                Go To Messages
            </button>
            <button onClick={() => {
                API.socketActions.sendMessage({ recipientName: recipientName, content: message });
            }}>Send</button>
            <button onClick={() => {
                App.instance.currentView = View.Dashboard;
            }}>
                Go To Dashboard
            </button>
        </div>
    )
}