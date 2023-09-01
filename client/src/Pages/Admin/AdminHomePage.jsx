import React, { useState } from 'react'
import "./AdminHomePage.css"
import NavigationbarAdmin from '../../Components/Navigationbar/NavigationbarAdmin'
import MyAdmin from "../../assets/Pictures/MyAdmin.svg"
import Arrow_Left_White_Icon from "../../assets/Icon/Arrow_Left_White_Icon.png"
import Arrow_Right_White_Icon from "../../assets/Icon/Arrow_Right_White_Icon.png"

const AdminHomePage = () => {

  const [toggleNavbarLeft, setToggleNavbarLeft] = useState(true)

  const handleToggleNavbarLeft = () => {
    setToggleNavbarLeft(!toggleNavbarLeft)
  }

  return (

    <>
      <NavigationbarAdmin />
      <main className='admin-container'>

        <section className='admin-section'>
          {toggleNavbarLeft === true ?
            <img
              src={Arrow_Left_White_Icon}
              alt="Arrow left white icon"
              className='arrow-left-toggle-navbar'
              onClick={() => handleToggleNavbarLeft()}
            />
            : <img
              src={Arrow_Right_White_Icon}
              alt="Arrow right white icon"
              className='arrow-right-toggle-navbar'
              onClick={() => handleToggleNavbarLeft()}
            />
          }

          {toggleNavbarLeft &&
            <nav className='navbar-left-admin'>
              <div>
                Manage Coffee
              </div>
            </nav>
          }

          <div className='greeting-admin'>
            <div className='greeting-image'>

              <img src={MyAdmin} alt="human-sit-dow" />
            </div>

            <div className='greeting-content'>
              <h1>
                Hi, Admin Name
              </h1>
              <br />
              <p>
                Prepare to be immersed in the coffee realm of Café Crafter’s admin panel, where coffee-making mastery meets digital surveillance. Here lies the ultimate toolbox for running the most kickass café on earth!
              </p>
              <br />
              <p>
                From inventory management to employee schedules, every aspect of your caffeinated wonderland can be tweaked, customized, and enhanced to sculpt your very own coffee paradise. You are just a few steps away from beverage domination.
              </p>
              <br />
              <p>
                Unleash your inner barista emperor, take a sip of your favorite brew, and dive into Café Crafter’s Admin Interface!
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default AdminHomePage