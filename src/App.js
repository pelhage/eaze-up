import React, { Component } from 'react'
import './App.css'
import phonePreview from './phonePreview.png'
import phoneVideo from './phoneVideo.mp4'
import phoneVideoWebm from './phoneVideo.webm'

const App = (props) => {

  return (
    <div className="App">
      <div className="intro">
        <h1>Track Strains with Eaze</h1>
        <p>Track your favorite strains and get notified via SMS when they're available for purchase on eaze.</p>
        <p>Enter your phone number to start receiving texts!</p>
        <div className="phone-number">
          <input placeholder="+1-415-555-555"/>
          <button>Get Started</button>
        </div>

      </div>
      <div className="phone-preview">
        <img src={phonePreview} />
        <video autoPlay="true" muted="true" >
          <source src={phoneVideoWebm} ></source>
          <source src={phoneVideo} ></source>
        </video>
      </div>
    </div>
  )

}
export default App
