package ModelsCart

type Cart struct {
	Cart_id   int
	User_id   int
	Coffee_id int
	Quantity  int
	Sub_total float64
	Name      string
	Category  string
	Price     float64
	Image_url string
}
