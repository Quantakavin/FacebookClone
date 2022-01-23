import React from 'react';
import TopBar from '../Components/TopBar';

const PageNotFound = () => {
    return (
        <>
        <header>
            <TopBar />
        </header>
        <div id="wrapper">
            <div id="info">
                <h3>Sorry, this page isn't available</h3>
            </div>
            <div id="infotext">
                <h4>The link you followed may be broken, or the page may have been removed.</h4>
            </div>
            <img src="https://i.imgur.com/qIufhof.png" />
            <div id="infotext">
                <h4>Go back to previous page</h4>
            </div>
        </div >
        </>
    )
}

export default PageNotFound