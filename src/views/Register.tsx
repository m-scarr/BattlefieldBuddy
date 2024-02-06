import { useState } from "react";
import App, { View } from "../classes/App";
import API from "../API";

type Props = {}

export default function Register({ }: Props) {
  const [username, setUsername] = useState("user1234567");
  const [password, setPassword] = useState("pass1");
  const [email, setEmail] = useState("test@test.com");
  return (
    <div>Register<hr />
      <input type="text" value={username} onChange={(e: any) => { setUsername(e.target.value) }} />
      <input type="text" value={password} onChange={(e: any) => { setPassword(e.target.value) }} />
      <input type="text" value={email} onChange={(e: any) => { setEmail(e.target.value) }} />
      <button onClick={async () => {
        await API.user.create(username, password, email);
      }}>Create Account</button><br />
      <button onClick={() => { App.instance.currentView = View.LogIn }}>I already have an Account</button>
    </div>
  )
}