package Routes

import (
	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/Controllers"
)

func SetRouter() *gin.Engine {
	r := gin.Default()
	CoffeeRotes := r.Group("/coffee")
	{
		CoffeeRotes.GET("/", Controllers.GetCoffee)
		// CoffeeRotes.GET("coffee/:id",Controllers.GetCoffeeById)
		CoffeeRotes.POST("/", Controllers.InsertCoffee)
		// CoffeeRotes.PUT("coffee/:id",Controllers.UpdateCoffee)
		// CoffeeRotes.DELETE("coffee/:id",Controllers.DeleteCoffee)
	}
	return r

}
