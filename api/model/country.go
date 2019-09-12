package model

// Model for countries objects

// Countries - a collection of *Country
type Countries struct {
	Countries []*Country `json:"countries"`
}

// Country struct
type Country struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
