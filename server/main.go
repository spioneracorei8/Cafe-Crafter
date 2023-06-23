package main

import (
	"github.com/spioneracorei8/Cafe-Crafter/CoffeeAPI/Config"
	"github.com/spioneracorei8/Cafe-Crafter/CoffeeAPI/Routes"
)

const port = ":4000"

func main() {
	Config.SetupDatabase()
	r := Routes.SetRouter()
	// :4000
	r.Run(port)
}
