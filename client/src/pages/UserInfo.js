import React from 'react'
import axios from 'axios'
import "./UserInfo.css"

axios.defaults.withCredentials = true;

export default function UserInfo ( { userinfo, handleUserInfo }) {
    return (
        <div className="userInfo_modal" onClick={handleUserInfo}>
            <div className="userInfo_modal_2">
                <span className="close" onClick={handleUserInfo}>
                  &times;
                </span>
                <h1 className="myInfo_text">{userinfo ? "내 정보" : "내 정보가 없습니다"}</h1>
                <div className="userInfo_modal_3">
                   <div className="userName_text">Knock-Knock 유저네임: {userinfo.username}</div>
                   <div className="userEmail_text">Knock-Knock 이메일: {userinfo.email}</div>
                   <div className="userPassword_text">Knock-Knock 비밀번호: {userinfo.password}</div>
                   <img className="logo" src="https://i.ibb.co/XLgjjZ8/Knock-Knock-logo.png" ></img>
                </div>
            </div>
        </div>
    )
}