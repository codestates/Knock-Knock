//import logo from './logo.svg';
import './App.css';
import Tabmodal from './component/TabModal'
import Tabmodal2 from './component/TabModal2'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import MyPage from './pages/MyPage'
import Location from './component/location'
import {BrowserRouter, Route, Switch,useHistory, Link} from "react-router-dom"
import * as React from 'react';
//import {FaRestroom} from "react-icons/fa"
function App() {
  //템메뉴
  //jwt를 이용한 분기를 걸어줌 jwt? tab(로그잇,회원가임) : tab2(마이페이지,로그아웃)

  //라우팅 분기
  // 로그인 버튼 누를시 리엑트 깜박임으로 넘기기
  // 회원가입 버튼누를시
  const history = useHistory();

  React.useEffect(() => {
      history.push('/'); // 마운트 될 때 
  }, [])

  return (
    
  <div className="App" > 
    <div className="headerdiv">
      <header className="header" >
      <Link to="/">
        <h1 className="App-name" >Knock-Knock</h1>
        </Link>
          <Tabmodal/>
       </header>
    </div>
    <Switch>
    <div className='map'>
    
     {/* <SignUp/>  */}
     {/* <Location/> */}
      <Route  exact path='/' component={Location}/>
      <Route  path='/signup' component={SignUp}/>
      <Route  path='/login' component={LogIn}/>
      <Route  path='/MyPage' component={MyPage}/>
    </div>
    </Switch>
  </div>  
 
  
 
  );
  
}

export default App;
