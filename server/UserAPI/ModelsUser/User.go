package ModelsUser

import (
	"database/sql"

	"github.com/spioneracorei8/Cafe-Crafter/Config"
	"golang.org/x/crypto/bcrypt"
)

func Register(user *User) (int64, error) {

	insert := `INSERT INTO users (name, username, password, gender, email, address, phone_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return 0, err
	}

	// this code when you want to change role from customer to admin
	result, err := Config.DB.Exec(insert, user.Name, user.Username, hashPassword, user.Gender, user.Email, user.Address, user.Phone_number, "customer")

	if err != nil {
		return 0, err
	}
	userId, err := result.LastInsertId()

	if err != nil {
		return 0, err
	}
	return userId, nil
}

func Login(user *UserCredential) (bool, error, string) {
	userCredential := &UserCredential{}
	username := user.Username
	password := user.Password

	query := Config.DB.QueryRow(`SELECT username, password FROM users WHERE username = ?`, username)
	err := query.Scan(
		&userCredential.Username,
		&userCredential.Password,
	)
	if err == sql.ErrNoRows {
		return false, err, ""
	} else if err != nil {
		return false, err, ""
	}

	result := bcrypt.CompareHashAndPassword([]byte(userCredential.Password), []byte(password))

	return result == nil, nil, username

}
