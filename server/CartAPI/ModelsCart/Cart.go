package ModelsCart

import (
	"database/sql"

	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

func AddToCart(user_id int, cart *Cart) (int64, error) {

	insert := `INSERT INTO coffeedatabase.carts (user_id, quantity) VALUES (?, ?)`

	result, err := Config.DB.Exec(insert, user_id, cart.Quantity)

	if err != nil {
		return 0, err
	}

	cartId, err := result.LastInsertId()

	if err != nil {
		return 0, err

	}
	return cartId, nil

}

func EditAddToCart(userId int, cart_id int, cart *Cart) (*Cart, error, error) {
	cartData := &Cart{}
	
	query := `SELECT cart_id, user_id, quantity FROM coffeedatabase.carts WHERE cart_id = ?`

	update := `UPDATE coffeedatabase.carts SET user_id = ?, quantity = ? WHERE Cart_id = ?`

	_, err := Config.DB.Exec(update, userId, cart.Quantity, cart_id)

	cartRow := Config.DB.QueryRow(query, cart_id)

	err = cartRow.Scan(
		&cartData.Cart_id,
		&cartData.User_id,
		&cartData.Quantity,
	)

	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	} else {
		return cartData, nil, nil
	}

}
