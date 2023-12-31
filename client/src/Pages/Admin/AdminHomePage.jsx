import React, { useState } from 'react'
import "./AdminHomePage.css"
import NavigationbarAdmin from '../../Components/Navigationbar/NavigationbarAdmin'
import MyAdmin from "../../assets/Pictures/MyAdmin.svg"
import Arrow_Left_White_Icon from "../../assets/Icon/Arrow_Left_White_Icon.png"
import Arrow_Right_White_Icon from "../../assets/Icon/Arrow_Right_White_Icon.png"
import Footer from "../../Components/Footer/Footer"
import AddNewMenu from './AddNewMenu/AddNewMenu'
import EditMenu from './EditMenu/EditMenu'
import { useNavigate } from 'react-router-dom'
import DeleteMenu from './DeleteMenu/DeleteMenu'

const AdminHomePage = () => {
  const navigate = useNavigate()

  const [toggleNavbarLeft, setToggleNavbarLeft] = useState(true)
  const [isManageCoffee, setIsManageCoffee] = useState(false)
  const [isManageTea, setIsManageTea] = useState(false)
  const [isManageCake, setIsManageCake] = useState(false)

  const [isAddNewCoffee, setIsAddNewCoffee] = useState(false)
  const [isAddNewTea, setIsAddNewTea] = useState(false)
  const [isAddNewCake, setIsAddNewCake] = useState(false)

  const [isEditCoffee, setIsEditCoffee] = useState(false)
  const [isEditTea, setIsEditTea] = useState(false)
  const [isEditCake, setIsEditCake] = useState(false)

  const [isDeleteCoffee, setIsDeleteCoffee] = useState(false)
  const [isDeleteTea, setIsDeleteTea] = useState(false)
  const [isDeleteCake, setIsDeleteCake] = useState(false)

  const handleToggleNavbarLeft = () => {
    setToggleNavbarLeft(!toggleNavbarLeft)
  }

  const handleToggleManageMenu = (category) => {
    if (category === "coffee") {
      setIsManageCoffee(!isManageCoffee)
      setIsManageTea(false)
      setIsManageCake(false)
    } else if (category === "tea") {
      setIsManageTea(!isManageTea)
      setIsManageCoffee(false)
      setIsManageCake(false)
    } else if (category === "cake") {
      setIsManageCake(!isManageCake)
      setIsManageCoffee(false)
      setIsManageTea(false)
    }
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
              <div className='manage-menu-container'>
                <div className='manage-menu'>
                  <button
                    onClick={() => handleToggleManageMenu("coffee")}
                  >
                    <h1>
                      Manage Coffeee
                    </h1>
                  </button>
                  {isManageCoffee &&
                    <>
                      <li
                        onClick={() => {
                          return (
                            setIsAddNewCoffee(true),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false)
                          )
                        }}
                      >
                        Add new coffee</li>
                      <li
                        onClick={() => {
                          return (
                            setIsEditCoffee(true),
                            setIsEditTea(false),
                            setIsEditCake(false),
                            setIsAddNewCoffee(false),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false),
                            setIsDeleteCoffee(false),
                            setIsDeleteTea(false),
                            setIsDeleteCake(false)
                          )
                        }}
                      >
                        Edit coffee</li>
                      <li
                        onClick={() => {
                          return (
                            setIsDeleteCoffee(true),
                            setIsDeleteTea(false),
                            setIsDeleteCake(false),
                            setIsEditCoffee(false),
                            setIsEditTea(false),
                            setIsEditCake(false),
                            setIsAddNewCoffee(false),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false)

                          )
                        }}
                      >
                        Delete coffee
                      </li>
                    </>
                  }

                  <button
                    onClick={() => handleToggleManageMenu("tea")}
                  >
                    <h1>
                      Manage Tea
                    </h1>
                  </button>
                  {isManageTea &&
                    <>
                      <li
                        onClick={() => {
                          return (
                            setIsAddNewTea(true),
                            setIsAddNewCoffee(false),
                            setIsAddNewCake(false)
                          )
                        }}
                      >
                        Add new Tea</li>
                      <li
                        onClick={() => {
                          return (
                            setIsEditTea(true),
                            setIsEditCoffee(false),
                            setIsManageCake(false),
                            setIsAddNewCoffee(false),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false)
                          )
                        }}
                      >
                        Edit Tea</li>
                      <li
                        onClick={() => {
                          return (
                            setIsDeleteTea(true),
                            setIsDeleteCoffee(false),
                            setIsDeleteCake(false),
                            setIsEditCoffee(false),
                            setIsEditTea(false),
                            setIsEditCake(false),
                            setIsAddNewCoffee(false),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false)
                          )
                        }}
                      >
                        Delete Tea
                      </li>
                    </>
                  }

                  <button
                    onClick={() => handleToggleManageMenu("cake")}
                  >
                    <h1>
                      Manage Cake
                    </h1>
                  </button>
                  {isManageCake &&
                    <>
                      <li
                        onClick={() => {
                          setIsAddNewCake(true)
                          setIsAddNewCoffee(false)
                          setIsAddNewTea(false)
                        }}
                      >Add new Cake</li>
                      <li
                        onClick={() => {
                          return (
                            setIsEditCake(true),
                            setIsEditCoffee(false),
                            setIsEditTea(false),
                            setIsAddNewCoffee(false),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false)
                          )
                        }}
                      >
                        Edit new Cake</li>
                      <li
                        onClick={() => {
                          return (
                            setIsDeleteCake(true),
                            setIsDeleteTea(false),
                            setIsDeleteCoffee(false),
                            setIsEditCoffee(false),
                            setIsEditTea(false),
                            setIsEditCake(false),
                            setIsAddNewCoffee(false),
                            setIsAddNewTea(false),
                            setIsAddNewCake(false)
                          )
                        }}
                      >
                        Delete Cake
                      </li>
                    </>
                  }
                </div>
              </div>


            </nav>
          }

          <div className='admin-manage-menu'>


            {isAddNewCoffee === true ?
              <AddNewMenu
                category="coffee"
              />
              : isAddNewTea === true ?
                <AddNewMenu
                  category="tea"
                />
                : isAddNewCake === true ?
                  <AddNewMenu
                    category="cake"
                  />
                  : isEditCoffee === true ?
                    <EditMenu
                      category="coffee"
                      toggleNavbarLeft={toggleNavbarLeft}
                    />
                    : isEditTea === true ?
                      <EditMenu
                        category="tea"
                        toggleNavbarLeft={toggleNavbarLeft}
                      />
                      : isEditCake === true ?
                        <EditMenu
                          category="cake"
                          toggleNavbarLeft={toggleNavbarLeft}
                        />
                        : isDeleteCoffee === true ?
                          <DeleteMenu
                            category="coffee"
                            toggleNavbarLeft={toggleNavbarLeft}
                          />
                          : isDeleteTea === true ?
                            <DeleteMenu
                              category="tea"
                              toggleNavbarLeft={toggleNavbarLeft}
                            />
                            : isDeleteCake === true ?
                              <DeleteMenu
                                category="cake"
                                toggleNavbarLeft={toggleNavbarLeft}
                              />
                              :
                              <>
                                <div>
                                  <img src={MyAdmin} alt="human-sit-dow" />
                                </div>
                                <div className='greeting-content'>
                                  <h1>
                                    Hi, Admin Name
                                  </h1>
                                  <br />
                                  <br />
                                  <p>
                                    Good day! 👋 As we continue to improve the Cafe-Crafter admin page and make it even more awesome, we're really interested in hearing your suggestions and ideas. Your feedback is incredibly valuable to us!
                                  </p>
                                  <br />
                                  <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, aperiam eum. Hic tenetur ut, quaerat voluptate ipsam facere distinctio iusto! Temporibus, maiores! Eum iste corrupti numquam non libero, ex dolorem hic itaque distinctio nulla! Delectus magni voluptates explicabo laudantium dolorum iste, quasi maiores facilis dicta unde voluptas dolor libero voluptatum!
                                  </p>
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
                                  <br />
                                  <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea harum cumque nostrum ad voluptatibus dolorum ipsum vero quia, quae minima. Eveniet nulla, omnis consectetur, quisquam dicta numquam et veniam aspernatur quo eos facilis amet unde, ex dicta dignissimos sapiente natus quaerat officiis? sint ut voluptas eligendi culpa quia ratione.
                                  </p>
                                </div>
                              </>
            }



          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default AdminHomePage