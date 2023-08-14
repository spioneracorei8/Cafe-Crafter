package ModelsUser

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/spioneracorei8/Cafe-Crafter/Config"
	"golang.org/x/crypto/bcrypt"
)

func GetUserData(userId int) (*User, error, error) {
	user := &User{}

	query := Config.DB.QueryRow(`SELECT id, name, username, gender, email, address, country, city, phone_number, role FROM coffeedatabase.users WHERE id = ?`, userId)

	err := query.Scan(
		&user.Id,
		&user.Name,
		&user.Username,
		&user.Gender,
		&user.Email,
		&user.Address,
		&user.Country,
		&user.City,
		&user.Phone_number,
		&user.Role,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	}
	return user, nil, nil
}

func EditUserData(user *User, userId int) (*User, error, error) {
	userData := &User{}

	query := `SELECT id, name, username, gender, email, address, country, city ,phone_number FROM coffeedatabase.users WHERE id = ?`

	update := `UPDATE coffeedatabase.users SET name = ?,username = ?, password = ?, gender = ?, email = ?, address = ?, country = ?, city = ? , phone_number = ? WHERE id = ?`

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return nil, err, nil
	}

	_, err = Config.DB.Exec(update, user.Name, user.Username, hashPassword, user.Gender, user.Email, user.Address, user.Country, user.City, user.Phone_number, userId)

	if err != nil {
		return nil, err, nil
	}

	userRow := Config.DB.QueryRow(query, userId)

	err = userRow.Scan(
		&userData.Id,
		&userData.Name,
		&userData.Username,
		&userData.Gender,
		&userData.Email,
		&userData.Address,
		&userData.Country,
		&userData.City,
		&userData.Phone_number,
	)

	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	} else {
		return userData, nil, nil
	}

}

func Register(user *User) (int64, error) {

	insert := `INSERT INTO users (name, username, password, gender, email, address, country, city,  phone_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return 0, err
	}

	// this code when you want to change role from customer to admin
	result, err := Config.DB.Exec(insert, user.Name, user.Username, hashPassword, user.Gender, user.Email, user.Address, user.Country, user.City, user.Phone_number, "customer")

	if err != nil {
		return 0, err
	}
	userId, err := result.LastInsertId()

	if err != nil {
		return 0, err
	}
	return userId, nil
}

func Login(user *UserCredential) (bool, error, gin.H) {
	userCredential := &UserCredential{}
	username := user.Username
	password := user.Password

	query := Config.DB.QueryRow(`SELECT id, username, password, role FROM users WHERE username = ?`, username)
	err := query.Scan(
		&userCredential.Id,
		&userCredential.Username,
		&userCredential.Password,
		&userCredential.Role,
	)
	if err == sql.ErrNoRows {
		return false, err, gin.H{}
	} else if err != nil {
		return false, err, gin.H{}
	}

	result := bcrypt.CompareHashAndPassword([]byte(userCredential.Password), []byte(password))

	userData := gin.H{
		"id":       userCredential.Id,
		"username": username,
		"role":     userCredential.Role,
	}

	return result == nil, nil, userData

}
