package ModelsCart

import (
	"database/sql"

	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

func GetCarts(userId int) ([]Cart, error) {
	var cartList []Cart

	query, err := Config.DB.Query(`SELECT carts.cart_id, users.id AS user_id, coffeemenu.id AS coffee_id,carts.quantity ,coffeemenu.name, coffeemenu.category, coffeemenu.price, coffeemenu.image_url
	FROM carts
	INNER JOIN users ON carts.user_id = users.id
	INNER JOIN coffeemenu ON carts.coffee_id = coffeemenu.id
	WHERE user_id = ? `, userId)

	if err != nil {
		return nil, err
	}

	for query.Next() {
		var cart Cart
		query.Scan(
			&cart.Cart_id,
			&cart.User_id,
			&cart.Coffee_id,
			&cart.Quantity,
			&cart.Name,
			&cart.Category,
			&cart.Price,
			&cart.Image_url)
		cartList = append(cartList, cart)
	}
	return cartList, nil
}

func AddToCart(user_id int, cart *Cart) (int64, error) {

	insert := `INSERT INTO coffeedatabase.carts (user_id, coffee_id, quantity) VALUES (?, ?, ?)`

	result, err := Config.DB.Exec(insert, user_id, cart.Coffee_id, cart.Quantity)

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
