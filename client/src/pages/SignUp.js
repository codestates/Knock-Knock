import './SignUp.css'
import axios from "axios";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
export default function SignUp(){
    const history = useHistory();
 const [userinfo, setuserinfo] = useState({
        
        email: '',
        password: '',
        confirmpassword: '',
        username: '',
        
      });
 const [errorMessage, setErrorMessage] = useState('');
 const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
    console.log('#####',userinfo)
  };

console.log(userinfo)
 const validSignup = () =>{ //여기서 콜백 넘기는이유가
    if(userinfo.email ==='' || userinfo.password ==='' || userinfo.username ==='' || userinfo.confirmpassword ==='' ){
        setErrorMessage('모든 항목은 필수입니다')
       // console.log('첫번째 if문')
      }
      else if(userinfo.password !== userinfo.confirmpassword) {
        setErrorMessage('비밀번호가 일치하지 않습니다') 
        //console.log('두번째 if문')
      }
      
      else{
        axios
        .post(
          'https://localhost:4000/signup',{
            name:userinfo.username, email:userinfo.email, password:userinfo.password
          }
         ,
          {
            headers: {
                "Content-Type": "application/json"
        }
        }
        ).then((res)=>{
               console.log('res',res)
         // settoiletinfo(toiletinfo) 
         history.push('/')    
           })
        
        //console.log(toiletinfo)
      }
      }
 

      return(
        <div className="modal" >
        <div >
          <div className="loginModal">
            <span className="close" >
              &times;
            </span>
            <div className="modalContents">
            {/* <img className="Knock_logo" src="https://i.ibb.co/XLgjjZ8/Knock-Knock-logo.png" /> */}
              <input
                name="email"
                className="loginId"
                type="email"
                placeholder="이메일"
                onChange={handleInputValue("email")}
              />
              <input
                name="password"
                className="loginPw"
                type="password"
                placeholder="비밀번호"
                onChange={handleInputValue("password")}
              />
               <input
                name="password"
                className="loginPw"
                type="password"
                placeholder="비밀번호 확인"
                onChange={handleInputValue("confirmpassword")}
              />
               <input
                name="password"
                className="loginPw"
                type="username"
                placeholder="닉네임"
                onChange={handleInputValue("username")}
              />
              <button className="loginBtn" onClick={validSignup}>
                {" "}
                회원가입{" "}
              </button>
              <div className="socialBox">
              </div>
              <div className="loginEnd">
                <div className="loginLine">
                 {/* <Link to="/signup">회원이 아니신가요?</Link>  */}
                </div>
              </div>
            </div>
            <div className="logo_box">
            </div>
            
          </div>
        </div>
      </div>
    )
    
    }