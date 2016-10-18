import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>track my strains</h1>
        <p>Get notified when your strains are available on eaze.</p>
        <div className="phone-number-box">
          <p>Test</p>
          <input placeholder="First Name"/>
          <input placeholder="Phone Number"/>
        </div>

      </div>
    )
  }
}
