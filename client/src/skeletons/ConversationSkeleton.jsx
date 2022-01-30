import React from 'react';
import { Card } from 'react-bootstrap';
import '../Styles/home.scss';
import Skeleton from '@mui/material/Skeleton';
import '../Styles/post.scss';

const ConversationSkeleton = () => {


    return(
        <div className="shadow conversation" style={{display: "flex", flexDirection: "row"}}>
        <div style={{flexGrow: 1}}><Skeleton style={{  }} animation="wave" variant="circular" width={100} height={100} /></div>
        <div style={{flexGrow: 9}}>
        <Skeleton animation="wave" width={120} height={25} style={{ marginTop: 10, marginLeft: 0}} />
        </div>
        <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Skeleton variant="rectangular" width={90} height={33} style={{marginTop: 5, marginBottom: 10}}/>
        </div>
    </div>
    )

}

export default ConversationSkeleton;