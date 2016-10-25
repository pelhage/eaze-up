import React from 'react'
import './index.css'
// Assets
import phonePreview from './phonePreview.png'
import phoneVideo from './phoneVideo2.mp4'
import phoneVideoWebm from './phoneVideo.webm'


const PhonePreview = (props) => {

  return (
    <div className="phone-preview">
      <img src={phonePreview} />
      <video autoPlay="true" muted="true" loop="true">
        <source src={phoneVideo} ></source>
      </video>
    </div>
  )

}

export default PhonePreview
