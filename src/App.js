// react router
import React, { useState, useEffect } from "react";

import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Navigation from "./everywhere/Navigation";
import Footer from "./everywhere/Footer";
import Container from "react-bootstrap/Container";
import Emner from "./emner/Emner";
import Emne from "./emner/Emne";
import "./style.css";
import Home from "./home/Home";
import LoginModal from "./user/LoginModal";
import SignupForm from "./user/SignupForm";

export const LoginContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [loginFail, setLoginFail] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (loggedIn) {
      fetch("/api/current_user", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            setLoggedIn(false);
          }
          return response.json();
        })
        .then((json) => setUsername(json.username));
    }
  }, [loggedIn]);

  const handleLogin = (e, username, password) => {
    e.preventDefault();
    fetch("/api/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.token) {
          localStorage.setItem("token", json.token);
          setLoggedIn(true);
          setUsername(json.user.username);
          setLoginFail(false);
        } else {
          setLoginFail(true);
          console.log(json);
        }
      });
  };

  const handleSignup = (username, password) => {
    fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.token) {
          localStorage.setItem("token", json.token);
          setLoggedIn(true);
          setUsername(json.username);
          history.push("/");
        } else {
          console.log(json);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername("");
  };
  return (
    <Router history={history}>
      <LoginContext.Provider
        value={{
          handleLogin,
          handleSignup,
          handleLogout,
          setLoggedIn,
          setUsername,
          loggedIn,
          username,
          loginFail,
        }}
      >
        <Navigation></Navigation>

        <Switch>
          <Route exact path="/">
            <Container>
              <Home></Home>
            </Container>
          </Route>
          <Route exact path="/emner">
            <Emner></Emner>
          </Route>
          <Route exact path="/emner/:courseCode" children={<Emne />}></Route>

          <Route exact path="/logg-inn">
            <p>Logg inn her! Kommer snart</p>
            <LoginModal handleLogin={handleLogin}></LoginModal>
          </Route>
          <Route exact path="/registrer-deg">
            <Container style={{ marginTop: "1rem" }}>
              <SignupForm></SignupForm>
            </Container>
          </Route>
          <Route path="*">
            <p>Error!</p>
          </Route>
        </Switch>
      </LoginContext.Provider>
      <Footer></Footer>
    </Router>
  );
}

export default App;
