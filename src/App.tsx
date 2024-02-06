import API from './API';
import LogIn from "./views/LogIn";
import Register from "./views/Register";
import Dashboard from './views/Dashboard';
import AppStore from './classes/App';
import Messages from './views/Messages';
import './App.css'

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { View } from './classes/App';
import { observer } from 'mobx-react';
const switchCaseObj: any = {
  [View.LogIn]: <LogIn />,
  [View.Register]: <Register />,
  [View.Dashboard]: <Dashboard />,
  [View.Messages]: <Messages />
}

function App() {
  useEffect(() => {
    API.init();
  }, [])

  return (
    <>
      {switchCaseObj[AppStore.instance.currentView]}
    </>
  )
}

export default observer(App)
