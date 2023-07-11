package ModelsCoffee

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

func GetCoffee() ([]Coffee, error) {
	var coffeeList []Coffee

	query, err := Config.DB.Query(`SELECT id, name, image_url, description, price FROM coffeemenu`)
	if err != nil {
		return nil, nil
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

func GetSuggestionsCoffee() ([]Coffee, error) {
	var coffeeList []Coffee
	query, err := Config.DB.Query(`SELECT id, name, image_url, description, price FROM suggestions_coffee`)
	if err != nil {
		return nil, nil
	}

	for query.Next() {
		var coffee Coffee
		query.Scan(
			&coffee.Id,
			&coffee.Name,
			&coffee.Image_url,
			&coffee.Description,
			&coffee.Price)
		coffeeList = append(coffeeList, coffee)
	}
	return coffeeList, nil
}

func GetCoffeeById(coffeeId int) (*Coffee, error, error) {
	coffee := &Coffee{}

	query := Config.DB.QueryRow(`SELECT id, name, image_url, description, price FROM coffeemenu WHERE id = ?`, coffeeId)

	err := query.Scan(
		&coffee.Id,
		&coffee.Name,
		&coffee.Image_url,
		&coffee.Description,
		&coffee.Price,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		log.Fatalln(err.Error())
	}

	return coffee, nil, nil
}

func GetSuggestionsCoffeeById(name string) (*Coffee, error, error) {
	coffee := &Coffee{}

	query := Config.DB.QueryRow(`SELECT id, name, image_url, description, price FROM suggestions_coffee WHERE name = ?`, name)

	err := query.Scan(
		&coffee.Id,
		&coffee.Name,
		&coffee.Image_url,
		&coffee.Description,
		&coffee.Price,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, nil, nil
	}
	return coffee, nil, nil
}

func InsertCoffee(coffee *Coffee) (int64, error) {
	insert := `INSERT INTO coffeemenu (name, image_url, description, price) VALUES (?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price)
	if err != nil {
		log.Fatalln(err.Error())
	}
	coffeeId, err := result.LastInsertId()
	if err != nil {
		log.Fatalln(err.Error())
	}

	return coffeeId, nil
}

func InsertSuggestionsCoffee(coffee Coffee) (int64, error) {
	insert := `INSERT INTO suggestions_coffee (name, image_url, description, price) VALUES (?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price)
	if err != nil {
		return -888, nil
	}

	coffeeId, err := result.LastInsertId()
	if err != nil {
		return -999, nil
	}
	return coffeeId, nil
}

func UpdateCoffee(coffee *Coffee, coffeeId int) (*Coffee, error, error) {
	coffeeRow := &Coffee{}

	query := `SELECT id, name, image_url, description, price FROM coffeemenu WHERE id = ?`

	update := `UPDATE coffeemenu SET name = ?, image_url = ?, description = ?, price = ? WHERE id = ?`

	_, err := Config.DB.Exec(update, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price, coffeeId)

	if err != nil {
		log.Fatalln(err.Error())
	}
	row := Config.DB.QueryRow(query, coffeeId)

	err = row.Scan(
		&coffeeRow.Id,
		&coffeeRow.Name,
		&coffeeRow.Image_url,
		&coffeeRow.Description,
		&coffeeRow.Price,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		log.Fatalln(err.Error())
	}
	return coffeeRow, nil, nil
}

func UpdateSuggestionsCoffee(coffee *Coffee, coffeeId int) (*Coffee, error, error) {
	coffeeRow := &Coffee{}

	query := `SELECT id, name, image_url, description, price FROM suggestions_coffee WHERE id = ?`

	update := `UPDATE suggestions_coffee SET name = ?, image_url = ?, description = ?, price = ? WHERE id = ?`

	_, err := Config.DB.Exec(update, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price, coffeeId)

	if err != nil {
		return nil, nil, nil
	}
	row := Config.DB.QueryRow(query, coffeeId)

	err = row.Scan(
		&coffeeRow.Id,
		&coffeeRow.Name,
		&coffeeRow.Image_url,
		&coffeeRow.Description,
		&coffeeRow.Price,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, nil, nil
	}
	return coffeeRow, nil, nil
}

func DeleteCoffee(coffeeId int) (int, error) {
	deleteCoffeeById := `DELETE FROM coffeemenu WHERE id = ?`

	_, err := Config.DB.Exec(deleteCoffeeById, coffeeId)
	if err != nil {
		log.Fatalln(err.Error())
	}

	return coffeeId, nil
}

func DeleteSuggestionsCoffee(coffeeId int) (int, error) {
	deleteCoffeeById := `DELETE FROM suggestions_coffee WHERE id = ?`

	_, err := Config.DB.Exec(deleteCoffeeById, coffeeId)

	if err != nil {
		return -1, nil
	}
	return coffeeId, nil
}
