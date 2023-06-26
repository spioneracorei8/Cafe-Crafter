package Config

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func SetupDatabase() {
	var err error
	DB, err = sql.Open("mysql", "root:mySQL@tcp(127.0.0.1:3306)/coffeedatabase")

	if err != nil {
		panic(err.Error())
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
    // ADD COLUMN username TEXT NOT NULL AFTER name, 
    // ADD COLUMN password TEXT NOT NULL AFTER username;`

	// if _, err := DB.Exec(query); err != nil {
	// 	panic(err.Error())
	// }

	fmt.Println("Connect to database successfully.")
}
