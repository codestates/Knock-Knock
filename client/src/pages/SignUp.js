import './SignUp.css'
import React, { useState } from 'react';
export default function SignUp(){
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
      }
      else if(userinfo.password !== userinfo.confirmpassword) {
        setErrorMessage('비밀번호가 일치하지 않습니다') 
      }
 }

return(
<div className='signupform'>
    <div className='email'>
        <div className='emailtxt'> E-mail</div>
        <input type='email' className='emailbox' onChange={handleInputValue('email')}/>
    </div>

    <div className='password'>
        <div className='passwordtxt'>PassWord</div>
        <input type='password' className='passwordbox' onChange={handleInputValue('password')}/>
    </div>

    <div className='confirmpassword'>
        <div className='confirmpasswordtxt'>confirm PassWord</div>
        <input type='password' className='confirmpasswordbox' onChange={handleInputValue('confirmpassword')}/>
    </div>

    <div className='username'>
        <div>username</div>
        <input type='username' onChange={handleInputValue('username')}/>
    </div>

    <div className='sign-up button'>
        <div>sign-up button</div>
        <button
                className='btn btn-signup'
                type='submit'
                onClick={validSignup}
            >회원가입</button>
    </div>
    <div className='alert-box'>{errorMessage}</div>
</div>
)
}