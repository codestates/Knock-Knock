import axios from "axios";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LogIn.css";


export default function AddToilet({ openModalFunc3 }) {
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
            axios
            .post(
              'https://localhost:4000/toilet',{
                name:toiletinfo.name, address:toiletinfo.address
              },
              {
                headers: {
                    authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImRmdmRmdnMiLCJlbWFpbCI6Ind3d3d444S044S044S0eGttQG5hdnJkZGVyc3NzLmNvbSIsInBhc3N3b3JkIjoidm1ka2VkZGRlIiwiaWF0IjoxNjM0MTI1NjE2LCJleHAiOjE2MzQxMjY1MTZ9.pn327yj0uXqWZ58v7AwEQNiLnyLEwv4BWkC8ZRbYL8Y`
            }
            }).then((res)=>{
                   console.log(res)
             // settoiletinfo(toiletinfo)     
               })
            
            console.log(toiletinfo)
          }
    

        }



    return (
      
          <div className="modal" onClick={openModalFunc3}>
            <div onClick={openModalFunc3}>
              <div className="loginModal">
                <span className="close" onClick={openModalFunc3}>
                  &times;
                </span>
                <div className="modalContents" onClick={openModalFunc3}>
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