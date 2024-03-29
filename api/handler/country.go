package handler

// Handler for functionality related to countries
// TODO: This is an incomplete implementation - it should have the means to perform CRUD operations and retrieve an individual country as well as the entire list

import (
	"errors"
	"net/http"

	"github.com/kylegk/game-library-manager/api/db"
	"github.com/kylegk/game-library-manager/api/model"
)

// ListCountries gets a list of countries from the database
func ListCountries(w http.ResponseWriter, r *http.Request) {
	database := db.GetDBHandle()
	countries := make([]*model.Country, 0)

	err := database.Table("country").Find(&countries).Error
	if err != nil {
		sendErrorResponse(w, http.StatusNotFound, err.Error())
	}

	list := &model.Countries{Countries: countries}

	sendResponse(w, http.StatusOK, list)
}

// ValidateCountry checks if a country exists
func ValidateCountry(id int) error {
	database := db.GetDBHandle()
	country := &model.Country{}

	err := database.Table("country").Where("id = ?", id).First(country).Error

	if err != nil {
		return errors.New("invalid country")
	}

	return nil
}
