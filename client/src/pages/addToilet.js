import axios from "axios";
import React, { useState } from 'react';
import { Link,useHistory } from "react-router-dom";
import "./LogIn.css";


export default function AddToilet({ openModal }) {
  const history = useHistory();
    const [toiletinfo, settoiletinfo] = useState({
        name: '',
        address: '',
        image: '',
        
      });
      const handleInputValue = (key) => (e) => {
        settoiletinfo({ ...toiletinfo, [key]: e.target.value });
        console.log('#####',toiletinfo)
      };
      const handleSignup = () => {
      if(toiletinfo.name ==='' || toiletinfo.address ==='' ){
       // setErrorMessage('모든 항목은 필수입니다')
          }
         else{
         const reqHeaders = {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic…Q0MX0.IpW8r0VxgI0BI6isUId3b9WrCY5GxcAo3Z-GMOxNiTE', 
            'Content-Type': 'application/json'
         }

          
          var config = {
            method: 'post',
            url: 'https://localhost:4000/toilet',
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic…Q0MX0.IpW8r0VxgI0BI6isUId3b9WrCY5GxcAo3Z-GMOxNiTE', 
              'Content-Type': 'application/json'
            },
            data : {name : toiletinfo.name, adress: toiletinfo.adress}
          };
          
          axios(config).then((res)=>{
                   console.log('res는!!!!!',res)
             // settoiletinfo(toiletinfo)     
               })
            
            console.log(toiletinfo)
            history.push('/')  
          }
    

        }



    return (
      
          <div className="modal" onClick={openModal}>
            <div onClick={openModal}>
              <div className="loginModal">
                <span className="close" onClick={openModal}>
                  &times;
                </span>
                <div className="modalContents" onClick={openModal}>
                  {/* <img className="logo" src="/Images/Signin/Knock-Knock logo.png" /> */}
                  <input
                    name="email"
                    className="loginId"
                    type="text"
                    placeholder="화장실명"
                    // onChange={this.loginHandler}
                    onChange={handleInputValue('name')}
                  />
                  <input
                    name="email"
                    className="loginPw"
                    type="text"
                    placeholder="주소"
                    // onChange={this.loginHandler}
                    onChange={handleInputValue('address')}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="이미지"
                    // onChange={this.loginHandler}
                    onChange={handleInputValue('image')}
                  />
                  <div className="loginMid">
                    
                    <div className="autoLogin">지도로 주소가져오기</div>
                  </div>
                  <button className="loginBtn" onClick={handleSignup}>
                    {" "}
                    화장실등록{" "}
                  </button>
                  <div className="socialBox">
                  
                  </div>
                  <div className="loginEnd">
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }