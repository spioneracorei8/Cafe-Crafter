package ModelsUser

import (
	"database/sql"
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

func Login(user *UserCredential) (bool, error) {
	userCredential := &UserCredential{}
	username := user.Username
	password := user.Password

	query := Config.DB.QueryRow(`SELECT username, password FROM users WHERE username = ?`, username)
	err := query.Scan(
		&userCredential.Username,
		&userCredential.Password,
	)
	if err == sql.ErrNoRows {
		return false, nil
	} else if err != nil {
		log.Fatalln(err.Error())
	}

	result := bcrypt.CompareHashAndPassword([]byte(userCredential.Password), []byte(password))

	return result == nil, nil

}
