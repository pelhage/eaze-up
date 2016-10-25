import './index.css'
import React from 'react'

const IntroSection = (props) => {
  return (
    <div className="intro">
    {props.children}
    </div>
  )
}

export default IntroSection
