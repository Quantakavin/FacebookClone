import React from 'react';
import { Container } from 'react-bootstrap';
import '../Styles/home.scss';
import Skeleton from '@mui/material/Skeleton';
import '../Styles/post.scss';



const PostSkeleton = () => {

  return(
      <>
        {

    <Container className="shadow post">
    <div style={{ display: "flex", flexDirection: "row", padding: 5 }}>
    <Skeleton style={{ marginBottom: 10, flexShrink: 0.2, marginLeft: "0%" }} animation="wave" variant="circular" width={50} height={50} />
      <div style={{ flexGrow: 1 }}>
      <Skeleton animation="wave" width={"35%"} height={15} style={{ marginTop: 5, marginLeft: 10}} />
      <Skeleton animation="wave" width={"25%"} height={15} style={{ marginTop: 5, marginLeft: 10}} />
      </div>
    </div>
    <hr style={{ marginTop: -5, marginRight: "-2%", marginLeft: "-2%", color: "d3d3d3" }} />
    <Skeleton animation="wave" height={15} width="70%"  style={{ marginBottom: 6, marginLeft: 10  }} />
    <Skeleton animation="wave" height={15} width="80%"  style={{ marginBottom: 6 , marginLeft: 10 }} />
    <Skeleton animation="wave" height={15} width="65%"  style={{ marginBottom: 6 , marginLeft: 10 }} />
    <Skeleton variant="rectangular" width={90} height={33} style={{marginTop: 50, marginBottom: 20}}/>
  </Container> }
        </>
  )
}

export default PostSkeleton;