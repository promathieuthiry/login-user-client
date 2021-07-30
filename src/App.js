import React, { useState, useEffect, useContext } from "react";
import Register from "./Connection/Register";
import Dashboard from "./home/Dashboard"
import Navbar from "./navigation/Navbar.jsx";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Login from "./Connection/Login";
import NotFound from "./navigation/NotFound";
import Credentials from "./Helper/Context"
import CheckConnection from "./Helper/CheckConnection";
import ConnectionListener from "./Connection/ConnectionListener"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  toast.configure()


  useEffect(() => {
    async function check() {
      const { isLoggedIn, userInfo } = await CheckConnection()
      setLoggedIn(isLoggedIn)
      setUserInfo(userInfo)
    }
    check()
  }, [])

  return (
    <>
      <Credentials.Provider value={{ loggedIn, setLoggedIn }}>
        <Router>

          {loggedIn && <Navbar authorized={loggedIn} userInfo={userInfo} />}

          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            {/* <Route path="*" exact component={NotFound} /> */}

            <Route path="/" exact component={() => <Dashboard authorized={loggedIn} userInfo={userInfo} />} />
            <Route path="*" exact component={() => <Redirect to="/" />} />

          </Switch>
        </Router>
      </Credentials.Provider>
    </>
  );
}

export default App;
