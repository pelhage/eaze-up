import React, { Component } from 'react'
import './App.css'
import phonePreview from './phonePreview.png'
import phoneVideo from './phoneVideo2.mp4'
import phoneVideoWebm from './phoneVideo.webm'

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handlePhoneInput = this.handlePhoneInput.bind(this)
  }

  handlePhoneInput(e) {
    let phoneNumber = e.target.value
    this.setState({phoneNumber})
  }

  onSubmit() {
    let { phoneNumber } = this.state
    axios.post('138.68.20.241/welcome',
      { phoneNumber })
      .then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err);
      })
      this.setState({phoneNumber: ''})
  }

  render() {
    return (
      <div className="App">
        <div className="intro">
          <h1>Track Strains with Eaze</h1>
          <p>Track your favorite strains and get notified via SMS when they're available for purchase on eaze.</p>
          <p>Enter your phone number to start receiving texts!</p>
          <div className="phone-number">
            <input type="tel" placeholder="+1-415-555-555" onChange={this.handlePhoneInput}/>
            <button onClick={this.onSubmit}>Get Started</button>
          </div>

        </div>
        <div className="phone-preview">
          <img src={phonePreview} />
          <video autoPlay="true" muted="true" loop="true">
            <source src={phoneVideo} ></source>
          </video>
        </div>
      </div>
    )
  }
}
export default App
