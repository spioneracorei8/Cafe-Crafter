package main

import (
	"github.com/spioneracorei8/Cafe-Crafter/Config"
	"github.com/spioneracorei8/Cafe-Crafter/Routes"
)

const port = ":4000"

func main() {
	Config.SetupDatabase()
	r := Routes.SetRouter()
	// :4000
	r.Run(port)
}
