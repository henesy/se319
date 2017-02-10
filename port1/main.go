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


/* enum for tracking the board ;; Black White Empty */
type Spot int
const (
	E Spot = iota
	W
	B
)

/* for template library */
type Page struct {
	Title string
	Body  string
	State string
	Width int
}

/* for updating the board */
type Move struct {
	S Spot
	X int
	Y int
}

/* for tracking the board */
type Board [][]Spot


/* global (gross) for using in instHandler to provide state */
var moveChan chan Move
var boardChan chan Board
var reqChan chan int
var killChan chan bool


/* handles moves ;; uses channels ;; want requests like 0102b003 == black @ x=1 y=2 on ID 3*/
func moveHandler(w http.ResponseWriter, req *http.Request) {

}

func boardToState(b Board, w int) string {
	str := ""
	for i := 0; i < w; i++ {
		for j := 0; j < w; j++ {
			switch b[i][j] {
			case B: str += "b"
			case W: str += "w"
			case E: str += "e"
			}
		}
	}
	return str
}

/* manages game board state & move validity ;; uses channels */
func gameManager() {
	//up to 100 game instances ;; should be made expanding, not fixed
	max := 100
	width := 9 //width of board
	boards := make([]Board, max)

	for i := 0; i < max; i++ {
		boards[i] = make(Board, width)
		for j := 0; j < width; j++ {
			(boards[i])[j] = make([]Spot, width)
		}
	}

	a := true
	for a {
		select {
		case inst := <- reqChan:
			select {
			case move := <- moveChan:
			/* rules checking occurs here ;; must add */
			(boards[inst])[move.Y][move.X] = move.S
			default: boardChan <- boards[inst]
			}
		case a = <- killChan:
		default:
		}
	}
}

/* handles a game instance */
func gameHandler(w http.ResponseWriter, req *http.Request) {
	width := 9
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
	mainPage.Width = width
	reqChan <- inst
	mainPage.State = (boardToState(<- boardChan, width))

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

func killHandler(w http.ResponseWriter, req *http.Request) {
	killChan <- false
	killChan <- false
	killChan <- false
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
	return m[2]
}

/* Portfolio One Go web game written in Golang by Sean Hinchee (Group 20) */
func main() {
	fmt.Println("Portfolio One: Go² by Sean Hinchee")

	/* configure buffered channels, init http handlers, start concurrent game manager */
	moveChan = make(chan Move, 5)
	boardChan = make(chan Board, 5)
	reqChan = make(chan int, 5)
	killChan = make(chan bool, 2)

	http.HandleFunc("/main/", mainHandler)
	http.HandleFunc("/black/", blackHandler)
	http.HandleFunc("/white/", whiteHandler)
	http.HandleFunc("/game/", gameHandler)
	http.HandleFunc("/move/", moveHandler)
	http.HandleFunc("/kill/", killHandler)

	go gameManager()


	err := http.ListenAndServe(":13337", nil)
	check(err)

	a := true
	for a {
		select {
		case a = <- killChan:
		}
	}
}
