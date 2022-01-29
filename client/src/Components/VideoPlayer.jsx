import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
const VisibilitySensor = require('react-visibility-sensor');

const VideoPlayer = (props) => {
    const [playing, setPlaying] = useState(false)
    return (
        <VisibilitySensor
            onChange={(isVisible) => {
                setPlaying(isVisible)
            }}>
            <ReactPlayer width="100%" playing={playing} controls={true} style={{ marginBottom: 15 }} url={props.cloudinaryurl} />
        </VisibilitySensor>
    )
}
export default {VideoPlayer};