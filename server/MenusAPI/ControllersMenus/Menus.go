package ControllersMenus

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/MenusAPI/ModelsMenus"
)

func GetCoffee(c *gin.Context) {
	coffeeList, err := ModelsMenus.GetCoffee()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": coffeeList,
		})
	}

}

func GetSuggestCoffee(c *gin.Context) {
	coffeeList, err := ModelsMenus.GetSuggestCoffee()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": coffeeList,
		})
	}

}

func GetCoffeeId(c *gin.Context) {
	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	coffee, err, errNoRow := ModelsMenus.GetCoffeeId(coffeeId)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data": coffee,
		})

	}

}

func GetSuggestCoffeName(c *gin.Context) {

	name := c.Param("name")

	coffee, err, errNoRow := ModelsMenus.GetSuggestCoffeName(name)

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
	var coffee ModelsMenus.Menu
	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	coffeeId, err := ModelsMenus.InsertCoffee(coffee)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if coffeeId == 0 {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"coffeeId": coffeeId,
			"message":  "insert new coffee successfully.",
		})
	}

}

func InsertSuggestCoffee(c *gin.Context) {
	var coffee ModelsMenus.Menu
	if err := c.ShouldBindJSON(&coffee); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	coffeeId, err := ModelsMenus.InsertSuggestCoffee(coffee)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if coffeeId == 0 {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"coffeeId": coffeeId,
			"message":  "insert new coffee successfully.",
		})
	}

}

func UpdateCoffee(c *gin.Context) {
	var coffee ModelsMenus.Menu

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

	updatedCoffee, err, errNoRow := ModelsMenus.UpdateCoffee(&coffee, coffeeId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data":    updatedCoffee,
			"message": "updated coffee successfully.",
		})
	}

}

func UpdateSuggestCoffee(c *gin.Context) {
	var coffee ModelsMenus.Menu

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

	updatedCoffee, err, errNoRow := ModelsMenus.UpdateSuggestCoffee(&coffee, coffeeId)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if errNoRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "The id you entered does not exist."})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"data":    updatedCoffee,
			"message": "updated coffee successfully.",
		})
	}

}

func DeleteCoffee(c *gin.Context) {
	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	isDeleted, err := ModelsMenus.DeleteCoffee(coffeeId)

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
	id := c.Param("id")
	coffeeId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid syntax url path should be number"})
		return
	}

	isDeleted, err := ModelsMenus.DeleteSuggestCoffee(coffeeId)

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
