package ControllersUsers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/spioneracorei8/Cafe-Crafter/UserAPI/ModelsUser"
)

func Register(c *gin.Context) {
	var user ModelsUser.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	_, err := ModelsUser.Register(&user)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "created new user successfully.",
	})

}

func Login(c *gin.Context) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error Loading .env file")
		log.Fatalln(err.Error())
	}

	SecretKey := os.Getenv("SECRET_KEY")

	var user ModelsUser.UserCredential

	if err := c.ShouldBindJSON(&user); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	result, err, username := ModelsUser.Login(&user)

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &jwt.MapClaims{
		"username": username,
		"nbf":      time.Now().Add(3 * time.Hour).Unix(),
	})
	tokenString, err := token.SignedString([]byte(SecretKey))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result {
		c.JSON(http.StatusOK, gin.H{
			"message": "login successfully.",
			"token":   tokenString,
		})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "your username or password wrong!",
		})
	}

}