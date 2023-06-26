package ControllersUsers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/UserAPI/ModelsUser"
)

func Register(c *gin.Context) {
	var user ModelsUser.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	_, err := ModelsUser.Register(&user)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	response := gin.H{
		"message": "created new user successfully.",
	}
	c.JSON(http.StatusOK, response)

}
