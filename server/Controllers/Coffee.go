package Controllers

import (
	"net/http"
	"strconv"

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
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	id, err := Models.InsertCoffee(&coffee)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError) // c.AbortWithStatus return just statuscode
		return
	}

	response := gin.H{
		"coffee_id": id,
		"message":   "insert new coffee successfully.",
	}

	c.JSON(http.StatusOK, response)
}
func DeleteCoffee(c *gin.Context) {
	coffeeFromClient := c.Param("id")
	coffeeId, err := strconv.Atoi(coffeeFromClient)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	id, err := Models.DeleteCoffee(coffeeId)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	response := gin.H{
		"coffee_id": id,
		"message":   "deleted coffee successfully.",
	}
	c.JSON(http.StatusOK, response)
}
