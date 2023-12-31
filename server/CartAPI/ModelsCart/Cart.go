package ModelsCart

import (
	"database/sql"

	"github.com/spioneracorei8/Cafe-Crafter/Config"
)

// Create more api get tea and cake in cart

func GetCoffeeCarts(userId int) ([]Cart, error) {
	var cartCoffeeList []Cart

	query, err := Config.DB.Query(`SELECT carts.cart_id, users.id AS user_id, coffeemenu.id AS coffee_id, carts.quantity, coffeemenu.name, coffeemenu.category, coffeemenu.price, coffeemenu.image_url
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
		cartCoffeeList = append(cartCoffeeList, cart)
	}
	return cartCoffeeList, nil
}

func GetTeaCarts(userId int) ([]Cart, error) {
	var cartTeaList []Cart

	query, err := Config.DB.Query(`SELECT carts.cart_id, users.id AS user_id, teamenu.id AS tea_id,carts.quantity ,teamenu.name, teamenu.category, teamenu.price, teamenu.image_url
		FROM carts
		INNER JOIN users ON carts.user_id = users.id
		INNER JOIN teamenu ON carts.tea_id = teamenu.id
		WHERE user_id = ? `, userId)

	if err != nil {
		return nil, err
	}

	for query.Next() {
		var cart Cart
		query.Scan(
			&cart.Cart_id,
			&cart.User_id,
			&cart.Tea_id,
			&cart.Quantity,
			&cart.Name,
			&cart.Category,
			&cart.Price,
			&cart.Image_url)
		cartTeaList = append(cartTeaList, cart)
	}
	return cartTeaList, nil
}

func GetCakeCarts(userId int) ([]Cart, error) {
	var cartCakeList []Cart

	query, err := Config.DB.Query(`SELECT carts.cart_id, users.id AS user_id, cakemenu.id AS cake_id,carts.quantity ,cakemenu.name, cakemenu.category, cakemenu.price, cakemenu.image_url
		FROM carts
		INNER JOIN users ON carts.user_id = users.id
		INNER JOIN cakemenu ON carts.cake_id = cakemenu.id
		WHERE user_id = ? `, userId)

	if err != nil {
		return nil, err
	}

	for query.Next() {
		var cart Cart
		query.Scan(
			&cart.Cart_id,
			&cart.User_id,
			&cart.Cake_id,
			&cart.Quantity,
			&cart.Name,
			&cart.Category,
			&cart.Price,
			&cart.Image_url)
		cartCakeList = append(cartCakeList, cart)
	}
	return cartCakeList, nil
}

func GetTotalPrice(userId int) (*Cart, error, error) {
	totalPrice := &Cart{}

	query := Config.DB.QueryRow(`SELECT SUM(carts.quantity * coffeemenu.price) AS total_price
	FROM carts
	INNER JOIN users ON carts.user_id = users.id
	INNER JOIN coffeemenu ON carts.coffee_id = coffeemenu.id
	WHERE user_id = ?`, userId)

	err := query.Scan(
		&totalPrice.Total_price,
	)

	if err == sql.ErrNoRows {
		return nil, nil, err
	} else if err != nil {
		return nil, err, nil
	} else {
		return totalPrice, nil, nil
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
	cartQuery, err := ExistsCart(user_id, cart.Category, cart)
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
	var cartId int64

	if cart.Category == "coffee" {
		insert := `INSERT INTO coffeedatabase.carts (user_id, coffee_id, quantity, category) VALUES (?, ?, ?, ?)`

		result, err := Config.DB.Exec(insert, user_id, cart.Coffee_id, 1, cart.Category)

		if err != nil {
			return 0, err
		}

		cartId, err = result.LastInsertId()

		if err != nil {
			return 0, nil
		}

	} else if cart.Category == "tea" {
		insert := `INSERT INTO coffeedatabase.carts (user_id, tea_id, quantity, category) VALUES (?, ?, ?, ?)`

		result, err := Config.DB.Exec(insert, user_id, cart.Tea_id, 1, cart.Category)

		if err != nil {
			return 0, err
		}

		cartId, err = result.LastInsertId()

		if err != nil {
			return 0, nil
		}

	} else if cart.Category == "cake" {
		insert := `INSERT INTO coffeedatabase.carts (user_id, cake_id, quantity, category) VALUES (?, ?, ?, ?)`

		result, err := Config.DB.Exec(insert, user_id, cart.Cake_id, 1, cart.Category)

		if err != nil {
			return 0, err
		}

		cartId, err = result.LastInsertId()

		if err != nil {
			return 0, nil
		}

	}

	return cartId, nil
}

func ExistsCart(user_id int, category string, cart *Cart) (*Cart, error) {
	var cartQuery Cart

	if category == "coffee" {
		query := Config.DB.QueryRow(`SELECT cart_id, user_id FROM carts WHERE user_id = ? AND coffee_id = ?`, user_id, cart.Coffee_id)

		err := query.Scan(
			&cartQuery.Cart_id,
			&cartQuery.User_id,
		)

		if err == sql.ErrNoRows {
			return nil, nil
		} else if err != nil {
			return nil, err
		}

		return &cartQuery, nil

	} else if category == "tea" {
		query := Config.DB.QueryRow(`SELECT cart_id, user_id FROM carts WHERE user_id = ? AND tea_id = ?`, user_id, cart.Tea_id)

		err := query.Scan(
			&cartQuery.Cart_id,
			&cartQuery.User_id,
		)

		if err == sql.ErrNoRows {
			return nil, nil
		} else if err != nil {
			return nil, err
		}
		return &cartQuery, nil

	} else if category == "cake" {
		query := Config.DB.QueryRow(`SELECT cart_id, user_id FROM carts WHERE user_id = ? AND cake_id = ?`, user_id, cart.Cake_id)

		err := query.Scan(
			&cartQuery.Cart_id,
			&cartQuery.User_id,
		)

		if err == sql.ErrNoRows {
			return nil, nil
		} else if err != nil {
			return nil, err
		}
		return &cartQuery, nil
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

func DeleteCart(cartId int) (bool, error) {
	var count int

	query := `SELECT COUNT(*) FROM coffeedatabase.carts WHERE cart_id = ?`

	deleteCartById := `DELETE FROM coffeedatabase.carts WHERE cart_id = ?`

	err := Config.DB.QueryRow(query, cartId).Scan(&count)

	if err != nil {
		return false, err
	}

	_, err = Config.DB.Exec(deleteCartById, cartId)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}
