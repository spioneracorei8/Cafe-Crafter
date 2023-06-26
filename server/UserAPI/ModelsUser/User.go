package ModelsUser

import (
	"log"

	"github.com/spioneracorei8/Cafe-Crafter/Config"
	"golang.org/x/crypto/bcrypt"
)

func Register(user *User) (int64, error) {
	insert := `INSERT INTO users (name, username, password, gender, email, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		log.Fatalln(err.Error())
	}

	result, err := Config.DB.Exec(insert, user.Name, user.Username, hashPassword, user.Gender, user.Email, user.Address, user.Phone_number)

	if err != nil {
		log.Fatalln(err.Error())
	}
	userId, err := result.LastInsertId()

	if err != nil {
		log.Fatalln(err.Error())
	}
	return userId, nil
}
