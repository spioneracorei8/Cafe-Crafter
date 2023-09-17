import React from 'react'
import "./AlertPopUp.css"

const AlertPopUp = ({ detailsAlert, headingAlert }) => {
  console.log(detailsAlert);

  return (
    <>
      <div className='alert-pop-container'>
        <div className='alert-pop'>
          <div className='alert-content'>
            <h1>
              {headingAlert} !!
            </h1>
            <p>
              {detailsAlert}
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default AlertPopUp