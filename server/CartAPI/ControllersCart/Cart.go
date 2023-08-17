package ControllersCart

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CartAPI/ModelsCart"
)

func AddToCart(c *gin.Context) {
	userId := c.Param("user_id")
	number := c.Param("quantity")

	user_id, err := strconv.Atoi(userId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	quantity, err := strconv.Atoi(number)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cartId, err := ModelsCart.AddToCart(user_id, quantity)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"cartId":  cartId,
			"message": "add to cart successfully.",
		})
	}

}

func EditAddToCart(c *gin.Context) {
	id := c.Param("user_id")
	amount := c.Param("quantity")
	cartId := c.Param("cart_id")

	userId, err := strconv.Atoi(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	quantity, err := strconv.Atoi(amount)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cart_id, err := strconv.Atoi(cartId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	_, err, errNoRow := ModelsCart.EditAddToCart(userId, quantity, cart_id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "The id you entered does not exist."})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "edit cart successfully.",
		})
	}
}
