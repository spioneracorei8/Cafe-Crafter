package Models

import (
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

func GetCoffee() ([]Coffee, error) {
	var coffeeList []Coffee

	query, err := Config.DB.Query(`SELECT * FROM coffeemenu`)
	if err != nil {
		log.Fatalln(err.Error())
	}

	for query.Next() {
		var coffee Coffee
		query.Scan(&coffee.Id,
			&coffee.Name,
			&coffee.Image_url,
			&coffee.Description,
			&coffee.Price)
		coffeeList = append(coffeeList, coffee)
	}
	return coffeeList, nil
}

func InsertCoffee(coffee *Coffee) (int64, error) {
	insert := `INSERT INTO coffeemenu (name, image_url, description, price) VALUES (?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price)
	if err != nil {
		log.Fatalln(err.Error())
	}
	user_id, err := result.LastInsertId()
	if err != nil {
		log.Fatalln(err.Error())
	}

	return user_id, nil
}

func DeleteCoffee(coffeeId int) (int, error) {
	deleteCoffeeById := `DELETE FROM coffeedatabase.coffeemenu WHERE id = ?`

	_, err := Config.DB.Exec(deleteCoffeeById, coffeeId)
	if err != nil {
		log.Fatalln(err.Error())
	}

	return coffeeId, nil
}
