package Routes

import (
	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CoffeeAPI/ControllersCoffee"
	"github.com/spioneracorei8/Cafe-Crafter/Middlewares"
	"github.com/spioneracorei8/Cafe-Crafter/UserAPI/ControllersUsers"
)

func SetRouter() *gin.Engine {
	r := gin.Default()
	CoffeeRotes := r.Group("/coffee-api")
	{
		// CoffeeRotes.Use() Middlewares.Middleware()
		CoffeeRotes.GET("/coffee", Middlewares.CorsMiddleware(), ControllersCoffee.GetCoffee)
		CoffeeRotes.GET("coffee/:id", ControllersCoffee.GetCoffeeById)
		CoffeeRotes.POST("/coffee", ControllersCoffee.InsertCoffee)
		CoffeeRotes.PUT("/coffee/:id", ControllersCoffee.UpdateCoffee)
		CoffeeRotes.DELETE("/coffee/:id", ControllersCoffee.DeleteCoffee)
	}
	UserRoutes := r.Group("/auth-user")
	{
		UserRoutes.POST("/register", ControllersUsers.Register)
		UserRoutes.POST("/login", ControllersUsers.Login)
	}
	return r

}
