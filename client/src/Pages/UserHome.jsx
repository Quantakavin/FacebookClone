import React from 'react';
import TopBar from '../Components/TopBar';

const UserHome = () => {
    return(
        <>
        <header>
            <TopBar />
        </header>
        <div>
            <p>
                {localStorage.getItem("username")}
            </p>
        </div>
        </>
    )

}

export default UserHome;