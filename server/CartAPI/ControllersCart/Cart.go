package ControllersCart

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CartAPI/ModelsCart"
)

func GetCoffeeCarts(c *gin.Context) {
	user_id := c.Param("user_id")

	userId, err := strconv.Atoi(user_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cartCoffeeList, err := ModelsCart.GetCoffeeCarts(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": cartCoffeeList,
		})
	}

}

func GetTeaCarts(c *gin.Context) {
	user_id := c.Param("user_id")

	userId, err := strconv.Atoi(user_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cartTeaList, err := ModelsCart.GetTeaCarts(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": cartTeaList,
		})
	}

}

func GetCakeCarts(c *gin.Context) {
	user_id := c.Param("user_id")

	userId, err := strconv.Atoi(user_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cartCakeList, err := ModelsCart.GetCakeCarts(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": cartCakeList,
		})
	}

}

func GetTotalPrice(c *gin.Context) {
	id := c.Param("user_id")

	userId, err := strconv.Atoi(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	subTotal, err, errNoRow := ModelsCart.GetTotalPrice(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The userId you entered does not exist."})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": subTotal,
		})
	}

}

func GetCartQuantity(c *gin.Context) {
	id := c.Param("user_id")

	userId, err := strconv.Atoi(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cartQuantity, err := ModelsCart.GetCartQuantity(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": cartQuantity,
		})
	}
}

func AddToCart(c *gin.Context) {
	var cart ModelsCart.Cart

	userId := c.Param("user_id")
	if err := c.ShouldBindJSON(&cart); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user_id, err := strconv.Atoi(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cartQuery, err, isCartExists := ModelsCart.AddToCart(user_id, &cart)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if isCartExists {
		// Increment the quantity
		err := ModelsCart.IncrementCartQuantity(cartQuery)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		// Add a new cart
		cartId, err := ModelsCart.AddNewCart(user_id, &cart)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"cartId":  cartId,
			"message": "add to cart successfully.",
		})
	}

}

func EditAddToCart(c *gin.Context) {
	cart_id := c.Param("cart_id")
	user_id := c.Param("user_id")

	cartId, err := strconv.Atoi(cart_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	userId, err := strconv.Atoi(user_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	updateCartData, err, errNoRow := ModelsCart.EditAddToCart(userId, cartId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data":    updateCartData,
			"message": "edit cart successfully.",
		})
	}
}

func EditReduceToCart(c *gin.Context) {
	cart_id := c.Param("cart_id")
	user_id := c.Param("user_id")

	cartId, err := strconv.Atoi(cart_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	userId, err := strconv.Atoi(user_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	updateCartData, err, errNoRow := ModelsCart.EditReduceToCart(userId, cartId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data":    updateCartData,
			"message": "edit cart successfully.",
		})
	}
}

func DeleteCart(c *gin.Context) {
	cart_id := c.Param("cart_id")

	cartId, err := strconv.Atoi(cart_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	isDeleted, err := ModelsCart.DeleteCart(cartId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if isDeleted {
		c.JSON(http.StatusOK, gin.H{
			"message": "deleted cart successfully.",
		})
	} else {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	}

}
