import React, { Component } from 'react'
import './index.css'
import phone from 'phone' // for phone validation
import axios from 'axios'

class PhoneInput extends Component {
  constructor(props) {
    super(props)
    this.state = { phoneNumber: '' }
    this.onSubmit = this.onSubmit.bind(this)
    this.handlePhoneInput = this.handlePhoneInput.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  handlePhoneInput(e) {
    let phoneNumber = e.target.value
    this.setState({phoneNumber})
  }

  onSubmit() {
    let { phoneNumber } = this.state
    if (!phone(phoneNumber).length) {
      this.setState({error: 'This number is not valid!'})
      return false
    }
    axios.post('http://138.68.20.241/welcome',
      { phoneNumber })
      .then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err);
      })
      this.setState({phoneNumber: '', error: ''})
  }

  renderError() {
    if (this.state.error) {
      return <span>{this.state.error}</span>
    }
  }

  render() {
    return (
      <div>
        <div className="phone-error">
          {this.renderError()}
        </div>
        <div className="phone-number">
          <input type="tel" placeholder="+1-415-555-555" onChange={this.handlePhoneInput}/>
          <button onClick={this.onSubmit}>Get Started</button>
        </div>
      </div>
    )
  }
}

export default PhoneInput
