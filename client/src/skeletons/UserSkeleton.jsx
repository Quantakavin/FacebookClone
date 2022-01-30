import React from 'react';
import { Card } from 'react-bootstrap';
import '../Styles/home.scss';
import Skeleton from '@mui/material/Skeleton';
import '../Styles/post.scss';


const UserSkeleton = () => {

    return(
        <>
            <Card className="shadow" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '18rem', marginTop: 10, marginBottom: 10, paddingTop: 15, paddingBottom: 15, marginRight: 20, border: "1px solid #d3d3d3", borderRadius: 10}}>
            <Skeleton style={{ marginBottom: 10, flexShrink: 0.2 }} animation="wave" variant="circular" width={150} height={150} />
                <Card.Body>
                  <Skeleton animation="wave" width={120} height={30} style={{ marginTop: 5, marginLeft: 10}} />
                </Card.Body>
                <Skeleton variant="rectangular" width={90} height={33} style={{marginTop: 50, marginBottom: 20, marginLeft: 0}}/>
              </Card>
        </>
    )

}

export default UserSkeleton;