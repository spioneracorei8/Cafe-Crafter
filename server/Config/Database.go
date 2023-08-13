package Config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func SetupDatabase() {
	var err error

	err = godotenv.Load(".env")
	if err != nil {
		log.Fatalln("Error loading .env file")
	}

	Dbdriver := os.Getenv("DB_DRIVER")
	DbUser := os.Getenv("DB_USER")
	DbPassword := os.Getenv("DB_PASSWORD")
	DbConnectionMethod := os.Getenv("DB_CONNECTION_METHOD")
	DbName := os.Getenv("DB_HOSTNAME")
	DbPort := os.Getenv("DB_PORT")
	DbCollectionName := os.Getenv("DB_COLLECTION_NAME")

	DBURL := fmt.Sprintf("%s:%s@%s(%s:%s)/%s", DbUser, DbPassword, DbConnectionMethod, DbName, DbPort, DbCollectionName)

	DB, err = sql.Open(Dbdriver, DBURL)

	if err != nil {
		fmt.Println("Cannot connect to database!")
		log.Fatalln(err.Error())
	} else {
		fmt.Println("Connect to database successfully.")

	}

	// query := `CREATE TABLE users
	// 	(id INT AUTO_INCREMENT,
	// 	name TEXT NOT NULL,
	// 	username TEXT NOT NULL,
	// 	password TEXT NOT NULL,
	// 	gender TEXT NOT NULL,
	// 	email TEXT NOT NULL,
	// 	address TEXT NOT NULL,
	// 	phone_number TEXT NOT NULL,
	// 	PRIMARY KEY (id)
	// 	);`

	// // edit table
	// query := `ALTER TABLE users
	// ADD COLUMN role TEXT NOT NULL AFTER phone_number;`

	// query := `CREATE TABLE suggestions_coffee
	// 	(id INT AUTO_INCREMENT,
	// 	name TEXT NOT NULL,
	// 	image_url TEXT NOT NULL,
	// 	description TEXT NOT NULL,
	// 	price FLOAT NOT NULL,
	// 	PRIMARY KEY (id)
	// 	);`

	// query := `CREATE TABLE carts
	// (Cart_id INT AUTO_INCREMENT,
	// PRIMARY KEY (Cart_id),
	// user_id INT,
	// FOREIGN KEY (user_id) REFERENCES users(id)
	// );`

	// query := `ALTER TABLE carts
	// ADD COLUMN quantity INT NOT NULL;
	// `

	// query := `CREATE TABLE categories
	// (category_id INT AUTO_INCREMENT,
	// 	PRIMARY KEY (categories_id),



	// )
	// `

	// if _, err := DB.Exec(query); err != nil {
	// 	panic(err.Error())
	// }

}
