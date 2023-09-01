import React from 'react'
import "./AlertPopUp.css"

const AlertPopUp = () => {
  return (
    <>
      <div>
        {
          Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      </div>
    </> 
  )
}

export default AlertPopUp