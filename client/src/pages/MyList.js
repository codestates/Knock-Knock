import React from 'react'
import axios from 'axios'
import "./MyList.css"

const MyList = ( { isMyList } ) => {

    console.log("==============================isMyList(latest)", isMyList)

    return (
        <div>
            {/* <div>{isMyList.myComment}</div>
            <div>{isMyList.myToilet}</div> */}
        </div>
    )
}

export default MyList
