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
  const [isOpenNewCoffeeDescription, setIsOpenNewCoffeeDescription] = useState(false)
  const [isOpenNewCoffeeImageUrl, setIsOpenNewCoffeeImageUrl] = useState(false)

  const handleToggleOpenAddNewMenu = (newMenu) => {
    if (newMenu === "coffeeName") {
      setIsOpenNewCoffeeName(!isOpenNewCoffeeName)
    } else if (newMenu === "coffeePrice") {
      setIsOpenNewCoffeePrice(!isOpenNewCoffeePrice)
    } else if (newMenu === "coffeeDescription") {
      setIsOpenNewCoffeeDescription(!isOpenNewCoffeeDescription)
    } else if (newMenu === "coffeeImageUrl") {
      setIsOpenNewCoffeeImageUrl(!isOpenNewCoffeeImageUrl)
    }
  }
  const value = parseInt(price)

  console.log(value);

  return (

    <>
      <form className='add-new-coffee-container'>
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
            <h1>Coffee Name: {name} </h1>
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
            <h1>Coffee Price: {price}฿ </h1>
            {isOpenNewCoffeePrice &&
              <div className='new-coffee-price-input' onClick={(event) => event.stopPropagation()}>
                <h2>
                  New Coffee Price: <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                </h2>
              </div>
            }
          </div>

          <div
            className='new-coffee-description'
            onClick={() => handleToggleOpenAddNewMenu("coffeeDescription")}
          >
            <h1>Coffee Description: <br /> {description}</h1>
            {isOpenNewCoffeeDescription &&
              <div className='new-coffee-description-input' onClick={(event) => event.stopPropagation()}>
                <h2>
                  New Coffee Description: <br /> <textarea cols="40" rows="10" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </h2>
              </div>
            }
          </div>

          <div
            className='new-coffee-image-url'
            onClick={() => handleToggleOpenAddNewMenu("coffeeImageUrl")}
          >
            <h1>Coffee ImageURL: <br /> {image_url}</h1>
            {isOpenNewCoffeeImageUrl &&
              <div className='new-coffee-image-url-input' onClick={(event) => event.stopPropagation()}>
                <h2>
                  New Coffee ImageURL: <br /> <textarea cols="40" rows="10" value={image_url} onChange={(event) => setImage_url(event.target.value)}></textarea>
                </h2>
              </div>
            }
          </div>

        </div>

        <div className='submit-add-new-coffee'>
          <button type='submit'>
            <h1>
              Add New Coffee
            </h1>
          </button>
        </div>

      </form>



    </>
  )
}

export default AddNewCoffee