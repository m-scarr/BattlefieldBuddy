import API from "../API"
import App, { View } from "../classes/App";

type Props = {}

export default function Dashboard({ }: Props) {
    return (
        <>
            <div>Dashboard</div>
            <button onClick={()=>{
                App.instance.currentView = View.Messages;
            }}>
                Go To Messages
            </button>
            <button onClick={() => {
                API.user.logOut();
            }}>Log Out</button>
        </>
    )
}