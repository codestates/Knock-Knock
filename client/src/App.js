// import Modal from "react-modal";
import React, { useEffect, useState } from 'react';
import LogIn from "./pages/LogIn";
import MyPage from "./pages/MyPage";

import "./App.css"
import "./pages/LogIn.css"
import "./pages/MyPage.css"

import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import axios from 'axios';

export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();

  const isAuthenticated = () => {
    axios.get("https://localhost:3000/userinfo")
    .then((res) => {
      setIsLogin(true);
      setUserinfo(res.data);
      history.push('/')
    })
  }

  const handleResponseSuccess = () => {
    isAuthenticated();
  }

  const handleLogout = () => {
    axios.post("https://localhost:3000/signout")
    .then((res) => {
      
      setIsLogin(true);
      setUserinfo(res.data);
      history.push('/')
    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    isAuthenticated();
  }, []);


  return (
  <BrowserRouter>
    <div className = 'container'>
      <button className = "btn_modal" onClick={openModal}>
        {isModalOpen === false ? "Open Modal" : "Modal"}
      </button>
      {isModalOpen === false ? null : 
      <LogIn handleResponseSuccess={handleResponseSuccess} openModal={ openModal } />
      }
    </div>
    <Switch>
      <Route path="/mypage">
        <MyPage handleLogout={handleLogout} userinfo={userinfo}></MyPage>        
      </Route>
    </Switch>
  </BrowserRouter>
  );
}


