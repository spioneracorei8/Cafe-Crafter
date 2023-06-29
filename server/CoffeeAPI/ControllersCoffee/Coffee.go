package ControllersCoffee

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CoffeeAPI/ModelsCoffee"
)

func GetCoffee(c *gin.Context) {
	coffeeList, err := ModelsCoffee.GetCoffee()
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": coffeeList,
	})
}

func GetCoffeeById(c *gin.Context) {

	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		panic(err.Error())
	}
	coffee, err, errNoRow := ModelsCoffee.GetCoffeeById(coffeeId)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if errNoRow != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": coffee,
	})

}

func InsertCoffee(c *gin.Context) {
	var coffee ModelsCoffee.Coffee
	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	coffeeId, err := ModelsCoffee.InsertCoffee(&coffee)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"coffee_id": coffeeId,
		"message":   "insert new coffee successfully.",
	})
}

func UpdateCoffee(c *gin.Context) {
	var coffee ModelsCoffee.Coffee

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
	updatedCoffee, err, errNoRow := ModelsCoffee.UpdateCoffee(&coffee, coffeeId)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	if errNoRow != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    updatedCoffee,
		"message": "updated coffee successfully.",
	})
}

func DeleteCoffee(c *gin.Context) {
	coffeeIdFromClient := c.Param("id")
	id, err := strconv.Atoi(coffeeIdFromClient)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	coffeeId, err := ModelsCoffee.DeleteCoffee(id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"coffee_id": coffeeId,
		"message":   "deleted coffee successfully.",
	})
}
