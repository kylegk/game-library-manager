package handler

// Handler that acts as a helper for sending responses

import (
	"encoding/json"
	"net/http"
)

// Encode a JSON response to be returned to the caller
func sendResponse(w http.ResponseWriter, status int, payload interface{}) {
	res, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(status)
	w.Write([]byte(res))
}

// Return a JSON encoded error
func sendErrorResponse(w http.ResponseWriter, code int, message string) {
	sendResponse(w, code, map[string]string{"error": message})
}
