package Routes

import (
	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/CartAPI/ControllersCart"
	"github.com/spioneracorei8/Cafe-Crafter/MenusAPI/ControllersMenus"
	"github.com/spioneracorei8/Cafe-Crafter/Middlewares"
	"github.com/spioneracorei8/Cafe-Crafter/UserAPI/ControllersUsers"
)

func SetRouter() *gin.Engine {
	r := gin.Default()
	r.Use(Middlewares.CorsMiddleware())
	MenusRotes := r.Group("/menus")
	{
		MenusRotes.Use(Middlewares.TokenMiddleware())
		MenusRotes.GET("/coffee", ControllersMenus.GetCoffee)
		MenusRotes.GET("/coffee/:id", ControllersMenus.GetCoffeeId)
		MenusRotes.POST("/coffee", ControllersMenus.InsertCoffee)
		MenusRotes.PUT("/coffee/:id", ControllersMenus.UpdateCoffee)
		MenusRotes.DELETE("/coffee/:id", ControllersMenus.DeleteCoffee)

		MenusRotes.GET("/tea", ControllersMenus.GetTea)
		MenusRotes.GET("/tea/:id", ControllersMenus.GetTeaId)
		MenusRotes.POST("/tea", ControllersMenus.InsertTea)
		MenusRotes.PUT("/tea/:id", ControllersMenus.UpdateTea)
		MenusRotes.DELETE("/tea/:id", ControllersMenus.DeleteTea)
	}
	CoffeeSuggestions := r.Group("/suggest-coffee")
	{
		CoffeeSuggestions.GET("/", ControllersMenus.GetSuggestCoffee)
		CoffeeSuggestions.GET("/:name", ControllersMenus.GetSuggestCoffeName)
		CoffeeSuggestions.POST("/", ControllersMenus.InsertSuggestCoffee)
		CoffeeSuggestions.PUT("/:id", ControllersMenus.UpdateSuggestCoffee)
		CoffeeSuggestions.DELETE("/:id", ControllersMenus.DeleteSuggestCoffee)
	}
	UserRoutes := r.Group("/auth-user")
	{
		UserRoutes.POST("/register", ControllersUsers.Register)
		UserRoutes.POST("/login", ControllersUsers.Login)
		UserRoutes.GET("/:id", Middlewares.TokenMiddleware(), ControllersUsers.GetUserData)
		UserRoutes.PUT("/:id", Middlewares.TokenMiddleware(), ControllersUsers.EditUserData)
	}
	CartRoutes := r.Group("/cart")
	{
		CartRoutes.GET("/:user_id", ControllersCart.GetCarts)
		CartRoutes.GET("/subtotal/:user_id", ControllersCart.GetSubTotal)
		CartRoutes.GET("/cart-quantity/:user_id", ControllersCart.GetCartQuantity)
		CartRoutes.POST("/:user_id", ControllersCart.AddToCart)
		CartRoutes.PUT("/add/:cart_id/:user_id", ControllersCart.EditAddToCart)
		CartRoutes.PUT("/reduce/:cart_id/:user_id", ControllersCart.EditReduceToCart)
	}
	return r

}
