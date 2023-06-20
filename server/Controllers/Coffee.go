package Controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/Models"
)

func GetCoffee(c *gin.Context) {
	coffeeList, err := Models.GetCoffee()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to query data from database.",
		})
	}
	response := gin.H{
		"data": coffeeList,
	}
	c.JSON(http.StatusOK, response)
}

func InsertCoffee(c *gin.Context) {
	var coffee Models.Coffee
	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user_id, err := Models.InsertCoffee(&coffee)
	if err != nil {
		// c.AbortWithStatus(http.StatusInternalServerError) // c.AbortWithStatus return just statuscode
		// return
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := gin.H{
		"coffee_id": user_id,
		"message":   "insert new coffee successfully.",
	}

	c.JSON(http.StatusOK, response)
}
