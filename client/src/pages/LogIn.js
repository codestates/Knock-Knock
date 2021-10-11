import React from "react";
// import { Link } from "react-router-dom";
import "./LogIn.css";

export default function LogIn({ openModal }) {

    return (
      
          <div className="modal" onClick={openModal}>
            <div onClick={openModal}>
              <div className="loginModal">
                <span className="close" onClick={openModal}>
                  &times;
                </span>
                <div className="modalContents" onClick={openModal}>
                  <img className="logo" src="/Images/Signin/Knock-Knock logo.png" />
                  <input
                    name="email"
                    className="loginId"
                    type="text"
                    placeholder="아이디"
                    // onChange={this.loginHandler}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
                    // onChange={this.loginHandler}
                  />
                  <div className="loginMid">
                    <label className="autoLogin" for="hint">
                      {" "}
                      <input type="checkbox" id="hint" /> 로그인 유지하기
                    </label>
                    <div className="autoLogin">아이디/비밀번호 찾기</div>
                  </div>
                  <button className="loginBtn">
                    {" "}
                    로그인{" "}
                  </button>
                  <div className="socialBox">
                    <div className="kakao">
                      <div className="kakaoText">카카오 계정으로 신규가입</div>
                    </div>
                    <div className="facebook">
                      <div className="facebookText">
                        페이스북 계정으로 신규가입
                      </div>
                    </div>
                  </div>
                  <div className="loginEnd">
                    <div className="loginLine">
                      회원이 아니신가요? 
                    </div>
                    <div className="noUser">비회원 주문 조회</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }