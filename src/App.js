import React from 'react'
import './App.css'

import IntroSection from './IntroSection/IntroSection'
import PhoneInput from './PhoneInput/PhoneInput' // use webpack plugin to resolve to index
import PhonePreview from './PhonePreview/PhonePreview' // use webpack plugin to resolve to index

const App = (props) => {
  return (
    <div className="App">
      <IntroSection>
        <h1>Track Strains with Eaze</h1>
        <p>Track your favorite strains and get notified via SMS when they're available for purchase on eaze.</p>
        <p>Enter your phone number to start receiving texts!</p>
        <PhoneInput />
      </IntroSection>
      <PhonePreview />
    </div>
  )
}

export default App

/**
IMPROVE APP Front End WITH THE FOLLOWING

PhoneInput can have methods or API info passed down as props to be more re-usable

PhonePreview can have screenshots and video passed down as props to be more re-usable

PhonePreview and PhoneInput container styles should be decoupled from the components
so that their responsiveness is a reflection of the container they live in

Use webpack plugin that will allow import paths to use index.js

Use environment variables for API Urls/ Place API Urls in a config file

**/
