import React, { useState } from 'react'
import "./AddNewCoffee.css"
import Cross from "../../../assets/Icon/Cross.png"
const AddNewCoffee = () => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image_url, setImage_url] = useState("")

  const [isOpenNewCoffeeName, setIsOpenNewCoffeeName] = useState(false)
  const [isOpenNewCoffeePrice, setIsOpenNewCoffeePrice] = useState(false)

  const handleToggleOpenAddNewMenu = (newMenu) => {
    if (newMenu === "coffeeName") {
      setIsOpenNewCoffeeName(!isOpenNewCoffeeName)
    } else if (newMenu === "coffeePrice") {
      setIsOpenNewCoffeePrice(!isOpenNewCoffeePrice)
    }
  }

  return (

    <>
      <div className='add-new-coffee-container'>
        <div className='add-new-coffee'>
          <div className='add-new-coffee-heading'>
            <h1>
              Add New Coffee
            </h1>
          </div>

          <div
            className='new-coffee-name'
            onClick={() => handleToggleOpenAddNewMenu("coffeeName")}
          >
            <h1>New Coffee Name: {isOpenNewCoffeeName ? name : "?"} </h1>
            {isOpenNewCoffeeName &&
              <div className='new-coffee-name-input' onClick={(event) => event.stopPropagation()}>
                <h2>
                  New Coffee Name: <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </h2>
              </div>
            }
          </div>

          <div
            className='new-coffee-price'
            onClick={() => handleToggleOpenAddNewMenu("coffeePrice")}
          >
            <h1>New Coffee Price: {isOpenNewCoffeePrice ? price : "?"} </h1>
            {isOpenNewCoffeePrice &&
              <div className='new-coffee-price-input' onClick={(event) => event.stopPropagation()}>
                <h2>
                  New Coffee Price: <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
                </h2>
              </div>
            }
          </div>

          <div>
            <h1>New Coffee Description: </h1>
            <div>
              <h3>
                New Coffee Description: <br /> <textarea name="" id="" cols="30" rows="10"></textarea>
              </h3>
            </div>
          </div>

          <div>
            <h1>New Coffee ImageURL: </h1>
            <div>
              <h3>
                New Coffee ImageURL: <br /> <textarea name="" id="" cols="30" rows="10"></textarea>
              </h3>
            </div>
          </div>

        </div>
      </div>



    </>
  )
}

export default AddNewCoffee