import { useState } from "react";

import App, { View } from "../classes/App";
import API from "../API";

type Props = {}

export default function LogIn({ }: Props) {
  const [username, setUsername] = useState("user1234567");
  const [password, setPassword] = useState("pass1");
  return (
    <div>Log In<hr />
      <input type="text" value={username} onChange={(e: any) => { setUsername(e.target.value) }} />
      <input type="text" value={password} onChange={(e: any) => { setPassword(e.target.value) }} />
      <button onClick={() => { API.user.logIn(username, password) }}>Continue</button><br />
      <button onClick={() => { App.instance.currentView = View.Register }}>Create an Account</button>
    </div>
  )
}