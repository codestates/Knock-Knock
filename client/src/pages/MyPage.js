import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import "./MyPage.css"

axios.defaults.withCredentials = true;

export default function MyPage () {
    return (
        <div>
            <center className = "centerBox">
                <h1 className = "h1">My Page</h1>
                <div className = "modifyUserInfo"><Link to='/userinfo'>내 정보 수정하기</Link></div>
                <div className = "myList"><Link to='/mylist'>내가 쓴 글 보기</Link></div>
                <div className = "btn_container">
                <button className = "btn_logout">로그아웃</button>
                </div>
            </center>
        </div>
    )
}
