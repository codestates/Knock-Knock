import React, { useState } from 'react';
import './TabModal2.css'
function TabModal2(){
 const[showTabModal, setshowTabModal ] = useState(false) 
   const openModal = () => {
       setshowTabModal(!showTabModal)
   }
    return (
       
             showTabModal === false ?
            <div className='ModalContainer1' >
            <div onClick={openModal}>menu</div> 
            </div>
          : <div className='ModalContainer2'onClick={openModal}>
            <div className='tablist'>마이페이지</div>
            <div className='tablist'>로그아웃</div>
            </div >
         
       
    )
}
export default TabModal2;