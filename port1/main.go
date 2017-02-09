package main

import (
	"fmt"
	"net/http"
	"html/template"
	"io"
	"io/ioutil"
	"regexp"
sc	"strconv"
)


/* for template library */
type Page struct {
	Title string
	Body  string
}

//var templates = template.Must(template.ParseFiles("templates/game.html", "templates/main.html", "templates/win.html"))

/* handles a game instance */
func gameHandler(w http.ResponseWriter, req *http.Request) {
	//need better instance parsing
	//path := req.URL.Path;
	//fmt.Println(path)
	p := getPath(w, req)
	var pb []byte = make([]byte, 1)
	pb[0] = p[0]
	inst, err := sc.Atoi(string(pb))
	check(err)
	fmt.Printf("Instance accessed: %d\n", inst)
	// write page
	var mainPage Page;
	mainPage.Title = "Go²!"
	mainPage.Body = "Game page for instance: " + sc.Itoa(inst)

	t := template.New("Game")
	file, err := ioutil.ReadFile("templates/game.html")
	fileS := string(file)
	template.Must(t.Parse(fileS))
	//t, err = t.ParseFiles("templates/game.html")
	check(err)
	t.Execute(w, &mainPage)
	//err = templates.ExecuteTemplate(w, "templates/main.html", &mainPage)
	check(err)

	//io.WriteString(w, p)
}

/* handles the main screen */
func mainHandler(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "Go²!")
}

func blackHandler(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "images/black.png")
}

func whiteHandler(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "images/white.png")
}

func check(err error) {
	if(err != nil) {
		fmt.Println(err)
	}
}

/* This block modified from a Golang wiki entry on web applications by Google */
var validPath = regexp.MustCompile("^/(main|white|black|game)/([a-zA-Z0-9]+)$")
func getPath(w http.ResponseWriter, req *http.Request) string {
	m := validPath.FindStringSubmatch(req.URL.Path)
	if m == nil {
		http.NotFound(w, req)
	}
	fmt.Println("ERROR!!!!")
	fmt.Print(m)
	return m[2]
}

/* Portfolio One Go web game written in Golang by Sean Hinchee */
func main() {
	fmt.Println("Portfolio One: Go² by Sean Hinchee")

	http.HandleFunc("/main/", mainHandler)
	http.HandleFunc("/black/", blackHandler)
	http.HandleFunc("/white/", whiteHandler)
	http.HandleFunc("/game/", gameHandler)

	err := http.ListenAndServe(":13337", nil)
	check(err)
}
