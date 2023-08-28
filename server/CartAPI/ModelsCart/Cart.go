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

func GetSubTotal(userId int) (*Cart, error, error) {
	subTotal := &Cart{}

	query := Config.DB.QueryRow(`SELECT SUM(carts.quantity * coffeemenu.price) AS sub_total
	FROM carts
	INNER JOIN users ON carts.user_id = users.id
	INNER JOIN coffeemenu ON carts.coffee_id = coffeemenu.id
	WHERE user_id = ?`, userId)

	err := query.Scan(
		&subTotal.Sub_total,
	)

	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	} else {
		return subTotal, nil, nil
	}

}

func GetCartQuantity(userId int) ([]Cart, error) {
	var cartQuantity []Cart

	query, err := Config.DB.Query(`SELECT COUNT(cart_id) FROM coffeedatabase.carts WHERE user_id = ?`, userId)

	if err != nil {
		return nil, nil
	}

	for query.Next() {
		var cart Cart
		query.Scan(
			&cart.Cart_quantity)
		cartQuantity = append(cartQuantity, cart)
	}
	return cartQuantity, nil
}

func AddToCart(user_id int, cart *Cart) (*Cart, error, bool) {
	cartQuery, err := ExistsCart(user_id, cart.Coffee_id)
	if err != nil {
		return nil, err, false
	}

	if cartQuery == nil {
		return nil, nil, false
	}

	return cartQuery, nil, true

}

func IncrementCartQuantity(cart *Cart) error {
	update := `UPDATE coffeedatabase.carts SET user_id = ?, quantity = quantity + 1 WHERE cart_id = ?;`

	_, err := Config.DB.Exec(update, cart.User_id, cart.Cart_id)

	if err != nil {
		return err
	}

	return nil
}

func AddNewCart(user_id int, cart *Cart) (int64, error) {
	insert := `INSERT INTO coffeedatabase.carts (user_id, coffee_id, quantity) VALUES (?, ?, ?)`

	result, err := Config.DB.Exec(insert, user_id, cart.Coffee_id, cart.Quantity)

	if err != nil {
		return 0, err
	}

	cartId, err := result.LastInsertId()

	if err != nil {
		return 0, nil
	}

	return cartId, nil
}

func ExistsCart(user_id int, coffee_id int) (*Cart, error) {
	var cartQuery Cart

	query := Config.DB.QueryRow(`SELECT * FROM carts WHERE user_id = ? AND coffee_id = ?`, user_id, coffee_id)

	err := query.Scan(
		&cartQuery.Cart_id,
		&cartQuery.User_id,
		&cartQuery.Coffee_id,
		&cartQuery.Quantity,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &cartQuery, nil
}

func EditAddToCart(userId int, cart_id int) (*Cart, error, error) {
	cartData := &Cart{}

	query := `SELECT cart_id, user_id, quantity FROM coffeedatabase.carts WHERE cart_id = ?`

	update := `UPDATE coffeedatabase.carts SET user_id = ?, quantity = quantity + 1 WHERE cart_id = ?`

	_, err := Config.DB.Exec(update, userId, cart_id)

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

func EditReduceToCart(userId int, cart_id int) (*Cart, error, error) {
	cartData := &Cart{}

	query := `SELECT cart_id, user_id, quantity FROM coffeedatabase.carts WHERE cart_id = ?`

	update := `UPDATE coffeedatabase.carts SET user_id = ?, quantity = quantity - 1 WHERE cart_id = ?`

	_, err := Config.DB.Exec(update, userId, cart_id)

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
