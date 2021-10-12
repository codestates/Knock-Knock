import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./LogIn.css";

axios.defaults.withCredentials = true;

export default function LogIn({ handleResponseSuccess, openModal }) {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value })
    }

    const handleLogin = () => {
        const {email, password} = loginInfo

        if(email === '' || password === '') {
            alert("이메일과 비밀번호를 모두 입력하세요")
        }
        else {
            axios.post("https://localhost:3000/login",
            {email, password},
            {withCredentials: true}
            )
            .then((res) => {
                handleResponseSuccess()
            })
        }
    }

    return (
      
          <div className="modal" >
            <div onClick={openModal}>
              <div className="loginModal">
                <span className="close" onClick={openModal}>
                  &times;
                </span>
                <div className="modalContents">
                <img className="Knock_logo" src="https://i.ibb.co/XLgjjZ8/Knock-Knock-logo.png" />
                  <input
                    name="email"
                    className="loginId"
                    type="email"
                    placeholder="아이디"
                    onChange={handleInputValue("email")}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
                    onChange={handleInputValue("password")}
                  />
                  <div className="loginMid">
                    <label className="autoLogin" for="hint">
                      {" "}
                      <input type="checkbox" id="hint" /> 로그인 유지하기
                    </label>
                    <div className="autoLogin">아이디/비밀번호 찾기</div>
                  </div>
                  <button className="loginBtn" onClick={handleLogin}>
                    {" "}
                    로그인{" "}
                  </button>
                  <div className="socialBox">
                    <div className="kakao">
                      <div className="kakaoText">카카오 계정으로 신규가입</div>
                    </div>
                    <div className="google">
                      {/* <image className="googleLogo" src="https://i.ibb.co/0t5J8cr/free-icon-google-plus-1051284.png"/> */}
                      <div className="googleText">구글 계정으로 신규가입</div>
                    </div>
                  </div>
                  <div className="loginEnd">
                    <div className="loginLine">
                     <Link to="/signup">회원이 아니신가요?</Link> 
                    </div>
                  </div>
                </div>
                <div className="logo_box">
                </div>
                
              </div>
            </div>
          </div>
    );
  }