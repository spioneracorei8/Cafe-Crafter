import React from 'react'
import './Register.css'
import NavigationbarNonLogin from '../Components/NavigationbarNonLogin'
const Register = () => {
    return (
        <>
            <NavigationbarNonLogin />
            <div className='register-container'>
                <div className='register-box'>
                    <form className='register-form'>
                        <div className='form-left'>
                            <div className='name-box'>
                                <label htmlFor="name">name</label>
                                <input type="text" placeholder='Crafter' />
                            </div>

                            <div className='username-box'>
                                <label htmlFor="username">username</label>
                                <input type="text" placeholder='crafter' />
                            </div>

                            <div className='gender-box'>
                                <label htmlFor="gender">gender</label>
                                <select name="gender" id="">
                                    <option value="male">
                                        male
                                    </option>
                                    <option value="female">
                                        female
                                    </option>
                                    <option value="other">
                                        other
                                    </option>
                                </select>
                            </div>

                            <div className='phone-number-box'>
                                <label htmlFor="phone-number">phone number</label>
                                <input type="text" placeholder='02********' />
                            </div>

                        </div >

                        <div className='form-right'>
                            <div className='email-box'>
                                <label htmlFor="email">email</label>
                                <input type="text" placeholder='crafter@email.com' />
                            </div>

                            <div className='password-box'>
                                <label htmlFor="password">password</label>
                                <input type="text" placeholder='********' />
                            </div>



                            <div className='address-box'>
                                <label htmlFor="address">address</label>
                                <textarea name="" id="" cols="35" rows="6"></textarea>
                            </div>

                        </div>
                        <div className='submit-box'>
                            <button type='submit'>
                                Register Now!
                            </button>
                        </div>
                    </form >
                </div >
            </div >

        </>
    )
}

export default Register