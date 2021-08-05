package router

// Router for configuring routes related to the collection as well as countries

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/kylegk/game-library-manager/api/handler"
)

// AddRoutes adds the routes to be served
func AddRoutes() {
	router := mux.NewRouter().StrictSlash(true)

	e := godotenv.Load()
	if e != nil {
		log.Fatal(e)
	}

	router.HandleFunc("/api/collection", handler.GetCollection).Methods("GET")
	router.HandleFunc("/api/collection", handler.AddItem).Methods("POST")
	router.HandleFunc("/api/collection/{id}", handler.GetItem).Methods("GET")
	router.HandleFunc("/api/collection/{id}", handler.UpdateItem).Methods("PUT")
	router.HandleFunc("/api/collection/{id}", handler.DeleteItem).Methods("DELETE")
	router.HandleFunc("/api/countries", handler.ListCountries).Methods("GET")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	log.Fatal(http.ListenAndServe(":8000", logRequest(handlers.CORS(originsOk, headersOk, methodsOk)(router))))
}

// Log all the HTTP requests
func logRequest(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}
