//import logo from './logo.svg';
import axios from "axios"
import './App.css';
import Tabmodal from './component/TabModal'
import Tabmodal2 from './component/TabModal2'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import MyPage from './pages/MyPage'
import MyList from './pages/MyList'
import Location from './component/location'
import AddToilet from './pages/addToilet'
import {BrowserRouter, Route, Switch,useHistory, Link} from "react-router-dom"
// import * as React from 'react';
import React, { useState } from 'react';
//import {FaRestroom} from "react-icons/fa"

axios.defaults.withCredentials = true;

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [writeMyComment, setWriteMyComment] = useState(null);
  const [writeMyToilet, setWriteMyToilet] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  const handleAccessToken = (res) => {
    setAccessToken(res) // 로그인하면서 받은 엑세스 토큰
  }

  const handleWriteInfo = () => {
    axios.get("https://localhost:4000/user/mylist", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"
      }
    }) // myComment, myToilet 데이터 요청
    .then((res) => {
      setWriteMyComment(res.myComment)
      setWriteMyToilet(res.myToilet)
    })
  }

  const isAuthenticated = () => {
    axios.get("https://localhost:4000/user/userinfo", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    })
    .then((res) => {
      console.log("===========================res: ", res)
      setIsLogin(true);
      setUserinfo(res); // 객체 키값이 없기에 그냥 바로 res 객체
      openModalFunc();
      alert("로그인이 완료되었습니다")
      history.push('/')
      
    })
  }

  const handleLogout = () => {
    axios.post("https://localhost:4000/signout")
    .then((res) => {
      setIsLogin(false);
      setUserinfo(null);
      history.push('/')
    })
  }

  const handleResponseSuccess = () => {
    isAuthenticated();
  }

  //템메뉴
  //jwt를 이용한 분기를 걸어줌 jwt? tab(로그잇,회원가임) : tab2(마이페이지,로그아웃)

  //라우팅 분기
  // 로그인 버튼 누를시 리엑트 깜박임으로 넘기기
  // 회원가입 버튼누를시
  const history = useHistory();

  React.useEffect(() => {
      history.push('/'); // 마운트 될 때 
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalFunc = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
  <BrowserRouter>
  <div className="App" > 
    <div className="headerdiv">
      <header className="header" >
      <Link to="/">
        <h1 className="App-name" ><img src="https://discord.com/channels/@me/895109459104374804/896970244885737533" alt="My Image"/></h1>
        </Link>
          <Tabmodal openModalFunc={openModalFunc}/>
       </header>
       {isModalOpen === false ? null :
     <LogIn handleResponseSuccess={handleResponseSuccess} openModalFunc={openModalFunc} handleAccessToken={handleAccessToken} />
     }
    </div>
    <Switch>
    <div className='map'>
    
     {/* <SignUp/>  */}
     {/* <Location/> */}
      
      <Route  exact path='/' component={Location}/>
      <Route  path='/signup' component={SignUp}/>
      <Route  path='/mypage' component={MyPage} handleLogout={handleLogout} userinfo={userinfo} handleWriteInfo={handleWriteInfo} />
      <Route  path='/mylist' component={MyList}  writeMyComment={writeMyComment} writeMyToilet={writeMyToilet}/>
      <Route  path='/toilet' component={AddToilet}/>
    </div>
    </Switch>
  </div>  
  </BrowserRouter>
  
 
  );
  
}

export default App;