package ControllersCart

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CartAPI/ModelsCart"
)

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

	cartId, err := ModelsCart.AddToCart(user_id, &cart)

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
	var cart ModelsCart.Cart

	id := c.Param("user_id")
	cartId := c.Param("cart_id")

	if err := c.ShouldBindJSON(&cart); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := strconv.Atoi(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	cart_id, err := strconv.Atoi(cartId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	updateCartData, err, errNoRow := ModelsCart.EditAddToCart(userId, cart_id, &cart)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "The id you entered does not exist."})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data":    updateCartData,
			"message": "edit cart successfully.",
		})
	}
}
