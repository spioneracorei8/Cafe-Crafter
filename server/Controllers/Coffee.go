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
		c.AbortWithStatus(http.StatusBadRequest)
		return
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

func UpdateCoffee(c *gin.Context) {
	var coffee Models.Coffee

	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	updatedCoffee, err := Models.UpdateCoffee(&coffee, coffeeId)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	response := gin.H{
		"data":    updatedCoffee,
		"message": "updated coffee successfully.",
	}

	c.JSON(http.StatusOK, response)
}

func DeleteCoffee(c *gin.Context) {
	coffeeIdFromClient := c.Param("id")
	coffeeId, err := strconv.Atoi(coffeeIdFromClient)
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
