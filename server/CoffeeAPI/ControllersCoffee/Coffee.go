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
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": coffeeList,
	})
}

func GetSuggestCoffee(c *gin.Context) {
	coffeeList, err := ModelsCoffee.GetSuggestCoffee()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": coffeeList,
	})
}

func GetCoffeeId(c *gin.Context) {

	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
	}
	coffee, err, errNoRow := ModelsCoffee.GetCoffeeId(coffeeId)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": coffee,
	})

}

func GetSuggestCoffeName(c *gin.Context) {

	name := c.Param("name")

	coffee, err, errNoRow := ModelsCoffee.GetSuggestCoffeName(name)

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The name you entered does not exist."})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": coffee,
	})
}

func InsertCoffee(c *gin.Context) {
	var coffee ModelsCoffee.Coffee
	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	coffeeId, err := ModelsCoffee.InsertCoffee(&coffee)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if coffeeId == -999 {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if coffeeId == -888 {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"coffee_id": coffeeId,
		"message":   "insert new coffee successfully.",
	})
}

func InsertSuggestCoffee(c *gin.Context) {
	var coffee ModelsCoffee.Coffee
	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	coffeeId, err := ModelsCoffee.InsertSuggestCoffee(coffee)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if coffeeId == -999 {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if coffeeId == -888 {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	updatedCoffee, err, errNoRow := ModelsCoffee.UpdateCoffee(&coffee, coffeeId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    updatedCoffee,
		"message": "updated coffee successfully.",
	})
}

func UpdateSuggestCoffee(c *gin.Context) {
	var coffee ModelsCoffee.Coffee

	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	updatedCoffee, err, errNoRow := ModelsCoffee.UpdateSuggestCoffee(&coffee, coffeeId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
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
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	isDeleted, err := ModelsCoffee.DeleteCoffee(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if isDeleted {
		c.JSON(http.StatusOK, gin.H{
			"message": "deleted coffee successfully.",
		})
	} else {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	}

}

func DeleteSuggestCoffee(c *gin.Context) {
	coffeeIdFromClient := c.Param("id")
	id, err := strconv.Atoi(coffeeIdFromClient)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	isDeleted, err := ModelsCoffee.DeleteSuggestCoffee(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if isDeleted {
		c.JSON(http.StatusOK, gin.H{
			"message": "deleted coffee successfully.",
		})
	} else {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	}

}
