package ModelsUser

type User struct {
	Id           int
	Name         string
	Username     string
	Password     string
	Gender       string
	Email        string
	Address      string
	Country      string
	City         string
	Phone_number string
	Role         string
}
type UserCredential struct {
	Id       int
	Username string
	Password string
	Role     string
}
