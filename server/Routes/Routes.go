package Routes

import (
	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CoffeeAPI/ControllersCoffee"
	"github.com/spioneracorei8/Cafe-Crafter/Middlewares"
	"github.com/spioneracorei8/Cafe-Crafter/UserAPI/ControllersUsers"
)

func SetRouter() *gin.Engine {
	r := gin.Default()
	r.Use(Middlewares.CorsMiddleware())
	CoffeeRotes := r.Group("/coffee")
	{
		// CoffeeRotes.Use() Middlewares.Middleware()
		CoffeeRotes.GET("/", ControllersCoffee.GetCoffee)
		CoffeeRotes.GET("/:id", ControllersCoffee.GetCoffeeId)
		CoffeeRotes.POST("/", ControllersCoffee.InsertCoffee)
		CoffeeRotes.PUT("/:id", ControllersCoffee.UpdateCoffee)
		CoffeeRotes.DELETE("/:id", ControllersCoffee.DeleteCoffee)
	}
	CoffeeSuggestions := r.Group("/suggest-coffee")
	{
		CoffeeSuggestions.GET("/", ControllersCoffee.GetSuggestCoffee)
		CoffeeSuggestions.GET("/:name", ControllersCoffee.GetSuggestCoffeName)
		CoffeeSuggestions.POST("/", ControllersCoffee.InsertSuggestCoffee)
		CoffeeSuggestions.PUT("/:id", ControllersCoffee.UpdateSuggestCoffee)
		CoffeeSuggestions.DELETE("/:id", ControllersCoffee.DeleteSuggestCoffee)
	}
	UserRoutes := r.Group("/auth-user")
	{
		UserRoutes.GET("/:id", ControllersUsers.GetUserData)
		UserRoutes.POST("/register", ControllersUsers.Register)
		UserRoutes.POST("/login", ControllersUsers.Login)
		UserRoutes.PUT("/:id", ControllersUsers.EditUserData)
	}
	return r

}
