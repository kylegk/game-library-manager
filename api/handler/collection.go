package handler

// Handler for functionality specific to the game library

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/kylegk/collection/api/db"
	"github.com/kylegk/collection/api/model"
)

// GetCollection - Get all of the items in the collection
func GetCollection(w http.ResponseWriter, r *http.Request) {

	database := db.GetDBHandle()
	items := make([]*model.Item, 0)

	err := database.Table("collection").Find(&items).Error
	if err != nil {
		sendErrorResponse(w, http.StatusNotFound, err.Error())
	}

	// Create a new struct and return the collection
	collection := &model.Collection{Collection: items}

	sendResponse(w, http.StatusOK, collection)
}

// AddItem - Add an item to the collection
func AddItem(w http.ResponseWriter, r *http.Request) {

	item := &model.Item{}
	err := json.NewDecoder(r.Body).Decode(item)

	if err == nil {
		err = validateItem(item)
	} else {
		err = errors.New("Invalid data")
	}

	if err != nil {
		sendErrorResponse(w, http.StatusBadRequest, err.Error())
		return
	}

	database := db.GetDBHandle()
	err = database.Table("collection").Create(item).Error

	if err != nil {
		err = errors.New("Unable to add record")
		sendErrorResponse(w, http.StatusBadRequest, err.Error())
		return
	}

	sendResponse(w, http.StatusOK, map[string]int{"id": item.ID})
}

// GetItem - Get an item from the collection
func GetItem(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"]
	item, err := retrieveItem(id)

	if err != nil {
		sendErrorResponse(w, http.StatusNotFound, err.Error())
		return
	}

	sendResponse(w, http.StatusOK, item)
}

// UpdateItem - Update an item in the collection
func UpdateItem(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"]
	item := &model.Item{}

	err := json.NewDecoder(r.Body).Decode(item)
	item.ID, _ = strconv.Atoi(id) // Don't allow the caller to update the id column

	if err == nil {
		// Check if the item exists before attempting to update the record
		_, err = retrieveItem(id)
	} else {
		err = errors.New("Invalid data")
	}

	// Verify the country code is valid
	if item.Country != 0 {
		err = ValidateCountry(item.Country)
	}

	if err != nil {
		sendErrorResponse(w, http.StatusNotFound, err.Error())
		return
	}

	// Update the database record with any fields that have been modified
	database := db.GetDBHandle()
	err = database.Table("collection").Where("id = ?", id).Update(item).Error

	if err != nil {
		err = errors.New("Unable to update record")
		sendErrorResponse(w, http.StatusNotFound, err.Error())
		return
	}

	sendResponse(w, http.StatusOK, item)
}

// DeleteItem - Remove an item from the collection
func DeleteItem(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"]
	item := &model.Item{}

	_, err := retrieveItem(id)

	// Either the record couldn't be found or decoded; send an error
	if err != nil {
		sendErrorResponse(w, http.StatusNotFound, err.Error())
		return
	}

	database := db.GetDBHandle()
	err = database.Table("collection").Where("id=?", id).Delete(item).Error

	if err != nil {
		err = errors.New("Unable to delete record")
		sendErrorResponse(w, http.StatusBadRequest, err.Error())
		return
	}

	sendResponse(w, http.StatusOK, map[string]string{"message": "record has been removed"})
}

// Validate basic required fields are present in the Item
// Currently required fields are: name, year, and country
func validateItem(item *model.Item) error {

	if item.Name == "" {
		return errors.New("Missing Name")
	}

	if item.Year == 0 {
		return errors.New("Missing Year")
	}

	if item.Country == 0 {
		return errors.New("Missing Country")
	}

	if item.Country != 0 {
		err := ValidateCountry(item.Country)
		if err != nil {
			return err
		}
	}

	return nil
}

// Helper method to retrieve a single item from the database
func retrieveItem(id string) (*model.Item, error) {

	database := db.GetDBHandle()
	item := &model.Item{}

	err := database.Table("collection").Where("id = ?", id).First(item).Error

	if err != nil {
		return item, err
	}

	return item, nil
}
