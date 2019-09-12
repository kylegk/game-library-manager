package model

// Model for the collection (game library)

// Collection - a collection of *Item
type Collection struct {
	Collection []*Item `json:"collection"`
}

// Item struct
type Item struct {
	ID            int    `json:"id"`
	Name          string `json:"name,omitempty"`
	AlternateName string `json:"alternate_name,omitempty"`
	Description   string `json:"description,omitempty"`
	Publisher     string `json:"publisher,omitempty"`
	Year          int    `json:"year,string,omitempty"`
	Country       int    `json:"country,omitempty"`
	Image         string `json:"image,omitempty"`
}
