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
	/*
		query := `CREATE TABLE coffeemenu
		(id INT AUTO_INCREMENT,
		name TEXT NOT NULL,
		image_url TEXT NOT NULL,
		description TEXT NOT NULL,
		price FLOAT,
		PRIMARY KEY (id)
		);`

		if _, err := DB.Exec(query); err != nil {
			panic(err.Error())
		}
	*/
	fmt.Println("Connect to database successfully.")
}
