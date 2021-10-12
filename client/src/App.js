// import Modal from "react-modal";
import React, { useState } from 'react';
import LogIn from "./pages/LogIn";
import MyPage from "./pages/MyPage";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css"


export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
  <BrowserRouter>
    <div className = 'container'>
      <button className = "btn_modal" onClick={openModal}>
        {isModalOpen === false ? "Open Modal" : "Modal"}
      </button>
      {isModalOpen === false ? null : 
      <LogIn openModal={ openModal } />
      }
    </div>
    <Switch>
      <Route path="/mypage">
        <MyPage></MyPage>        
      </Route>
    </Switch>
  </BrowserRouter>
  );
}


