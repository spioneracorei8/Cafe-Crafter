import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className='loading-container'>
      <div className='loading-text'>
        <h1>Crafting...</h1>
      </div>
      <div className='loading-spinner'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  )
}

export default Loading