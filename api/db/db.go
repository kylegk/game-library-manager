package db

// Create a connection to the database or retrieve a database handle

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var db *gorm.DB

// Initialize the database connection
func initDB() {

	e := godotenv.Load()
	if e != nil {
		log.Fatal(e)
	}

	dialect := os.Getenv("db_type")
	username := os.Getenv("db_username")
	password := os.Getenv("db_password")
	database := os.Getenv("db_name")
	host := os.Getenv("db_host")

	uri := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", host, username, database, password)

	conn, err := gorm.Open(dialect, uri)
	if err != nil {
		log.Fatal(err)
	}

	db = conn
}

// GetDBHandle - Get the database connection
func GetDBHandle() *gorm.DB {
	if db == nil {
		initDB()
	}

	return db
}
