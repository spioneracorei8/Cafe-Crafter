package Config

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func SetupDatabase() {
	var err error
	DB, err = sql.Open("mysql","spioneracorei8:mySQL@tcp(127.0.0.1:3306)/")
}
