package main

import (
	"fmt"
	"html/template"
)


/* makes a handler to manage game urls */
func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := validPath.FindStringSubmatch(r.URL.Path)
		if m == nil {
			http.NotFound(w, r)
			return
		}
		fn(w, r, m[2])
	}
}

/* handles a game instance */

/* handles the main screen */



/* Portfolio One Go web game written in Golang by Sean Hinchee */
func main() {
	fmt.Println("Portfolio One: Go in Go by Sean Hinchee")


}

