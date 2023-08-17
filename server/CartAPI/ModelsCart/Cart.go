package ModelsCart

import (
	"database/sql"

	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

func AddToCart(user_id int, quantity int) (int64, error) {
	insert := `INSERT INTO coffeedatabase.carts (user_id, quantity) VALUES (?, ?)`

	result, err := Config.DB.Exec(insert, user_id, quantity)

	if err != nil {
		return 0, err
	}

	cartId, err := result.LastInsertId()

	if err != nil {
		return 0, err

	}
	return cartId, nil

}

func EditAddToCart(userId int, quantity int, cart_id int) (int64, error ,error) {

	update := `UPDATE coffeedatabase.carts SET user_id = ?, quantity = ? WHERE Cart_id = ?`

	_, err := Config.DB.Exec(update, userId, quantity, cart_id)

	if err != nil {
		return 0, err, nil
	} else if err == sql.ErrNoRows {
		return 0, nil, err
	}

	if err != nil {
		return 0, err, nil

	}

	return 1, nil, nil
}
