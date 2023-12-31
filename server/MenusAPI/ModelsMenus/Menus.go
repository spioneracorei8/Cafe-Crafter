package ModelsMenus

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

func GetCoffee() ([]Menu, error) {
	var coffeeList []Menu

	query, err := Config.DB.Query(`SELECT id, name, image_url, description, price, category FROM coffeemenu`)
	if err != nil {
		return nil, err
	}

	for query.Next() {
		var coffee Menu
		query.Scan(
			&coffee.Id,
			&coffee.Name,
			&coffee.Image_url,
			&coffee.Description,
			&coffee.Price,
			&coffee.Category)
		coffeeList = append(coffeeList, coffee)
	}
	return coffeeList, nil
}

func GetTea() ([]Menu, error) {
	var teaList []Menu

	query, err := Config.DB.Query(`SELECT id, name, image_url, description, price, category FROM coffeedatabase.teamenu`)
	if err != nil {
		return nil, err
	}

	for query.Next() {
		var tea Menu
		query.Scan(
			&tea.Id,
			&tea.Name,
			&tea.Image_url,
			&tea.Description,
			&tea.Price,
			&tea.Category)
		teaList = append(teaList, tea)
	}
	return teaList, nil
}

func GetCake() ([]Menu, error) {
	var cakeList []Menu

	query, err := Config.DB.Query(`SELECT id, name, image_url, description, price, category FROM coffeedatabase.cakemenu`)
	if err != nil {
		return nil, err
	}

	for query.Next() {
		var cake Menu
		query.Scan(
			&cake.Id,
			&cake.Name,
			&cake.Image_url,
			&cake.Description,
			&cake.Price,
			&cake.Category)
		cakeList = append(cakeList, cake)
	}
	return cakeList, nil
}

func GetSuggestCoffee() ([]Menu, error) {
	var coffeeList []Menu
	query, err := Config.DB.Query(`SELECT id, name, image_url, description, price, category FROM suggestions_coffee`)
	if err != nil {
		return nil, err
	}

	for query.Next() {
		var coffee Menu
		query.Scan(
			&coffee.Id,
			&coffee.Name,
			&coffee.Image_url,
			&coffee.Description,
			&coffee.Price,
			&coffee.Category)
		coffeeList = append(coffeeList, coffee)
	}
	return coffeeList, nil
}

func GetCoffeeId(coffeeId int) (*Menu, error, error) {
	coffeeRow := &Menu{}

	query := Config.DB.QueryRow(`SELECT id, name, image_url, description, price, category FROM coffeemenu WHERE id = ?`, coffeeId)

	err := query.Scan(
		&coffeeRow.Id,
		&coffeeRow.Name,
		&coffeeRow.Image_url,
		&coffeeRow.Description,
		&coffeeRow.Price,
		&coffeeRow.Category,
	)
	if err != nil {
		return nil, err, nil
	} else if err == sql.ErrNoRows {
		return nil, nil, err
	}

	return coffeeRow, nil, nil
}

func GetTeaId(teaId int) (*Menu, error, error) {
	teaRow := &Menu{}

	query := Config.DB.QueryRow(`SELECT id, name, image_url, description, price, category FROM coffeedatabase.teamenu WHERE id = ?`, teaId)

	err := query.Scan(
		&teaRow.Id,
		&teaRow.Name,
		&teaRow.Image_url,
		&teaRow.Description,
		&teaRow.Price,
		&teaRow.Category,
	)
	if err != nil {
		return nil, err, nil
	} else if err == sql.ErrNoRows {
		return nil, nil, err
	}

	return teaRow, nil, nil
}

func GetCakeId(cakeId int) (*Menu, error, error) {
	cakeRow := &Menu{}

	query := Config.DB.QueryRow(`SELECT id, name, image_url, description, price, category FROM coffeedatabase.cakemenu WHERE id = ?`, cakeId)

	err := query.Scan(
		&cakeRow.Id,
		&cakeRow.Name,
		&cakeRow.Image_url,
		&cakeRow.Description,
		&cakeRow.Price,
		&cakeRow.Category,
	)
	if err != nil {
		return nil, err, nil
	} else if err == sql.ErrNoRows {
		return nil, nil, err
	}

	return cakeRow, nil, nil
}

func GetSuggestCoffeName(name string) (*Menu, error, error) {
	coffee := &Menu{}

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
		return nil, err, nil
	}
	return coffee, nil, nil
}

func InsertCoffee(coffee Menu) (int64, error) {
	insert := `INSERT INTO coffeemenu (name, image_url, description, price, category) VALUES (?, ?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price, coffee.Category)
	if err != nil {
		return 0, err
	}
	coffeeId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return coffeeId, nil
}

func InsertTea(tea Menu) (int64, error) {
	insert := `INSERT INTO teamenu (name, image_url, description, price, category) VALUES (?, ?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, tea.Name, tea.Image_url, tea.Description, tea.Price, tea.Category)
	if err != nil {
		return 0, err
	}
	teaId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return teaId, nil
}

func InsertCake(cake Menu) (int64, error) {
	insert := `INSERT INTO cakemenu (name, image_url, description, price, category) VALUES (?, ?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, cake.Name, cake.Image_url, cake.Description, cake.Price, cake.Category)
	if err != nil {
		return 0, err
	}
	cakeId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return cakeId, nil
}

func InsertSuggestCoffee(coffee Menu) (int64, error) {
	insert := `INSERT INTO suggestions_coffee (name, image_url, description, price, category) VALUES (?, ?, ?, ?, ?)`

	result, err := Config.DB.Exec(insert, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price, coffee.Category)
	if err != nil {
		return 0, err
	}

	coffeeId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	return coffeeId, nil
}

func UpdateCoffee(coffee *Menu, coffeeId int) (*Menu, error, error) {
	coffeeRow := &Menu{}

	query := `SELECT id, name, image_url, description, price, category FROM coffeemenu WHERE id = ?`

	update := `UPDATE coffeemenu SET name = ?, image_url = ?, description = ?, price = ?, category = ? WHERE id = ?`

	_, err := Config.DB.Exec(update, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price, coffee.Category, coffeeId)

	if err != nil {
		return nil, err, nil
	}
	row := Config.DB.QueryRow(query, coffeeId)

	err = row.Scan(
		&coffeeRow.Id,
		&coffeeRow.Name,
		&coffeeRow.Image_url,
		&coffeeRow.Description,
		&coffeeRow.Price,
		&coffeeRow.Category,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	}
	return coffeeRow, nil, nil
}

func UpdateTea(tea *Menu, teaId int) (*Menu, error, error) {
	teaRow := &Menu{}

	query := `SELECT id, name, image_url, description, price, category FROM coffeedatabase.teamenu WHERE id = ?`

	update := `UPDATE coffeedatabase.teamenu SET name = ?, image_url = ?, description = ?, price = ?, category = ? WHERE id = ?`

	_, err := Config.DB.Exec(update, tea.Name, tea.Image_url, tea.Description, tea.Price, tea.Category, teaId)

	if err != nil {
		return nil, err, nil
	}
	row := Config.DB.QueryRow(query, teaId)

	err = row.Scan(
		&teaRow.Id,
		&teaRow.Name,
		&teaRow.Image_url,
		&teaRow.Description,
		&teaRow.Price,
		&teaRow.Category,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	}
	return teaRow, nil, nil
}

func UpdateCake(cake *Menu, cakeId int) (*Menu, error, error) {
	cakeRow := &Menu{}

	query := `SELECT id, name, image_url, description, price, category FROM coffeedatabase.cakemenu WHERE id = ?`

	update := `UPDATE coffeedatabase.cakemenu SET name = ?, image_url = ?, description = ?, price = ?, category = ? WHERE id = ?`

	_, err := Config.DB.Exec(update, cake.Name, cake.Image_url, cake.Description, cake.Price, cake.Category, cakeId)

	if err != nil {
		return nil, err, nil
	}
	row := Config.DB.QueryRow(query, cakeId)

	err = row.Scan(
		&cakeRow.Id,
		&cakeRow.Name,
		&cakeRow.Image_url,
		&cakeRow.Description,
		&cakeRow.Price,
		&cakeRow.Category,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	}
	return cakeRow, nil, nil
}

func UpdateSuggestCoffee(coffee *Menu, coffeeId int) (*Menu, error, error) {
	coffeeRow := &Menu{}

	query := `SELECT id, name, image_url, description, price, category FROM suggestions_coffee WHERE id = ?`

	update := `UPDATE suggestions_coffee SET name = ?, image_url = ?, description = ?, price = ?, category = ? WHERE id = ?`

	_, err := Config.DB.Exec(update, coffee.Name, coffee.Image_url, coffee.Description, coffee.Price, coffee.Category, coffeeId)

	if err != nil {
		return nil, err, nil
	}
	row := Config.DB.QueryRow(query, coffeeId)

	err = row.Scan(
		&coffeeRow.Id,
		&coffeeRow.Name,
		&coffeeRow.Image_url,
		&coffeeRow.Description,
		&coffeeRow.Price,
		&coffeeRow.Category,
	)
	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	}
	return coffeeRow, nil, nil
}

func DeleteCoffee(coffeeId int) (bool, error) {
	var count int

	query := `SELECT COUNT(*) FROM coffeedatabase.coffeemenu WHERE id = ?`

	deleteCoffeeById := `DELETE FROM coffeemenu WHERE id = ?`

	err := Config.DB.QueryRow(query, coffeeId).Scan(&count)

	if err != nil {
		return false, err
	}

	_, err = Config.DB.Exec(deleteCoffeeById, coffeeId)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func DeleteTea(teaId int) (bool, error) {
	var count int

	query := `SELECT COUNT(*) FROM coffeedatabase.teamenu WHERE id = ?`

	deleteCoffeeById := `DELETE FROM coffeedatabase.teamenu WHERE id = ?`

	err := Config.DB.QueryRow(query, teaId).Scan(&count)

	if err != nil {
		return false, err
	}

	_, err = Config.DB.Exec(deleteCoffeeById, teaId)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func DeleteCake(cakeId int) (bool, error) {
	var count int

	query := `SELECT COUNT(*) FROM coffeedatabase.cakemenu WHERE id = ?`

	deleteCakeById := `DELETE FROM coffeedatabase.cakemenu WHERE id = ?`

	err := Config.DB.QueryRow(query, cakeId).Scan(&count)

	if err != nil {
		return false, err
	}

	_, err = Config.DB.Exec(deleteCakeById, cakeId)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func DeleteSuggestCoffee(coffeeId int) (bool, error) {
	var count int

	query := `SELECT COUNT(*) FROM coffeedatabase.suggestions_coffee WHERE id = ?`

	deleteCoffeeById := `DELETE FROM suggestions_coffee WHERE id = ?`

	err := Config.DB.QueryRow(query, coffeeId).Scan(&count)

	if err != nil {
		return false, err
	}

	_, err = Config.DB.Exec(deleteCoffeeById, coffeeId)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}
