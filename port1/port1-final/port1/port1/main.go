package main

import (
	"fmt"
	"net/http"
	"html/template"
	"io/ioutil"
sc	"strconv"
	"time"
)


const boardWidth = 9

/* enum for tracking the board ;; Black White Empty */
type Spot int
const (
	E Spot = iota
	W
	B
)

type Act int
const (
	Inactive Act = iota
	Active
)

/* for template library */
type Page struct {
	Title string
	Body  string
	State string
	Width int
	Instance int
	ActiveList string
	Bp int
	Wp int
}

/* for updating the board */
type Move struct {
	S Spot
	X int
	Y int
}

/* for tracking the board */
type Board struct {
	B [][]Spot
	A Act /* active or inactive */
	Wp int
	Bp int
}


/* global (gross) for using in instHandler to provide state */
var moveChan chan Move
var boardChan chan Board
var reqChan chan int
var killChan chan bool
var activeChan chan Act
var strChan chan string
var getActiveChan chan bool


/* handles moves ;; uses channels ;; want requests like 0102b003 == black @ x=1 y=2 on ID 3*/
func moveHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate") // HTTP 1.1.
	w.Header().Set("Pragma", "no-cache") // HTTP 1.0.
	w.Header().Set("Expires", "0") // Proxies.
	
	p := req.URL.Path;
	pt := p[6:]
	x := pt[:2]
	y := pt[2:4]
	c := pt[4]
	id := pt[5:]
	var err error
	var m Move
	m.X, err = sc.Atoi(x)
	check(err)
	m.Y, err = sc.Atoi(y)
	check(err)
	switch c {
	case 'b': m.S = B
	case 'w': m.S = W
	default:
		fmt.Println("Error: Invalid Move on ID " + id)
	}
	moveChan <- m
	inst, err := sc.Atoi(id)
	check(err)
	reqChan <- inst

	fmt.Printf("Placed a %c at %d,%d for ID %d\n", c, m.X, m.Y, inst)
}

func boardToState(b Board, w int) string {
	str := ""
	for i := 0; i < w; i++ {
		for j := 0; j < w; j++ {
			switch (b.B)[i][j] {
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
	width := boardWidth //width of board
	boards := make([]Board, max)

	for i := 0; i < max; i++ {
		(boards)[i].B = make([][]Spot, width)
		boards[i].Bp = 81
		boards[i].Wp = 81
		for j := 0; j < width; j++ {
			((boards)[i]).B[j] = make([]Spot, width)
		}
	}

	a := true
	for a {
		select {
		case inst := <- reqChan:
			select {
			case move := <- moveChan:
				/* rules checking occurs here ;; must add */
				if move.S == B {
					boards[inst].Bp--
				} else if move.S == W {
					boards[inst].Wp--
				}
				(boards[inst]).B[move.Y][move.X] = move.S
			case act := <- activeChan:
				if boards[inst].A == Active && act == Inactive {
					for i := 0; i < boardWidth; i++ {
						for j := 0; j < boardWidth; j++ {
							(boards[inst]).B[i][j] = E
						}
					}
				}
			
				boards[inst].A = act
				fmt.Printf("ID %d is now %v\n", inst, act)
				
			default: boardChan <- boards[inst]
			}
		case a = <- killChan:
		case <- getActiveChan:	
			str := ""

			for i := 0; i < max; i++ {
				if(boards[i].A == Active) {
					str += (sc.Itoa(i) + ",")
				}
			}
			str += "nil"

			strChan <- str
		default:
			time.Sleep(10 * time.Millisecond)
		}
	}
}

/* handles a game instance */
func gameHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, private, max-age=0")
	w.Header().Set("Expires", time.Unix(0, 0).Format(http.TimeFormat))
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Expires", "0")
	
	width := boardWidth
	p := (req.URL.Path)[6:]

	inst, err := sc.Atoi(p)
	check(err)
	fmt.Printf("Instance accessed: %d\n", inst)
	activeChan <- Active
	reqChan <- inst
	// write page
	var mainPage Page;
	mainPage.Title = "Go²!"
	mainPage.Body = "Game page for instance: " + sc.Itoa(inst)
	mainPage.Width = width
	mainPage.Instance = inst
	
	reqChan <- inst
	thisBoard := <- boardChan
	mainPage.State = (boardToState(thisBoard, width))
	mainPage.Bp = thisBoard.Bp
	mainPage.Wp = thisBoard.Wp


	t := template.New("Game")
	file, err := ioutil.ReadFile("templates/game.html")
	fileS := string(file)
	template.Must(t.Parse(fileS))
	check(err)
	t.Execute(w, &mainPage)
	check(err)

	//io.WriteString(w, p)
}

/* writes the game instances'  */
func gameInst(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, private, max-age=0")
	w.Header().Set("Expires", time.Unix(0, 0).Format(http.TimeFormat))
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Expires", "0")
	
	width := boardWidth
	p := (req.URL.Path)[8:]

	inst, err := sc.Atoi(p)
	check(err)
	reqChan <- inst
	fmt.Printf("Game Cords Given: %d\n", inst)
	w.Write([]byte(((boardToState(<- boardChan, width)))))
	//io.WriteString(w, p)
}


/* handles the main screen */
func mainHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, private, max-age=0")
	w.Header().Set("Expires", time.Unix(0, 0).Format(http.TimeFormat))
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Expires", "0")
	
	var mainPage Page;
	mainPage.Title = "Go²!"
	mainPage.Body = "This is the main page!"
	getActiveChan <- true
	mainPage.ActiveList = <- strChan

	t := template.New("Main")
	file, err := ioutil.ReadFile("templates/main.html")
	fileS := string(file)
	template.Must(t.Parse(fileS))
	check(err)
	t.Execute(w, &mainPage)
	check(err)
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

func overHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, private, max-age=0")
	w.Header().Set("Expires", time.Unix(0, 0).Format(http.TimeFormat))
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Expires", "0")
	
	winner := (req.URL.Path)[6:7]
	p := (req.URL.Path)[8:]
	inst, err := sc.Atoi(p)
	check(err)
	
	var mainPage Page;
	mainPage.Title = "Go²!"
	if winner=="w"{
		mainPage.Body = "White wins Game: " + p + "!"
	}else{
		mainPage.Body = "Black wins Game: " + p + "!"
	}
	
	t := template.New("Win")
	file, err := ioutil.ReadFile("templates/win.html")
	fileS := string(file)
	template.Must(t.Parse(fileS))
	check(err)
	t.Execute(w, &mainPage)
	check(err)
	
	activeChan <- Inactive
	reqChan <- inst
}

func check(err error) {
	if(err != nil) {
		fmt.Println(err)
	}
}


/* Portfolio One Go web game written in Golang by Sean Hinchee (Group 20) */
func main() {

	fmt.Println("Portfolio One: Go² by Sean Hinchee (Group 20)")

	/* configure buffered channels, init http handlers, start concurrent game manager */
	moveChan = make(chan Move, 5)
	boardChan = make(chan Board, 5)
	reqChan = make(chan int, 5)
	killChan = make(chan bool, 3)
	activeChan = make(chan Act, 5)
	strChan = make(chan string, 5)
	getActiveChan = make(chan bool, 5)

	http.HandleFunc("/main/", mainHandler)
	http.HandleFunc("/black/", blackHandler)
	http.HandleFunc("/white/", whiteHandler)
	http.HandleFunc("/game/", gameHandler)
	http.HandleFunc("/move/", moveHandler)
	http.HandleFunc("/kill/", killHandler)
	http.HandleFunc("/over/", overHandler)
	http.HandleFunc("/string/", gameInst)
	http.HandleFunc("/", mainHandler)

	go gameManager()


	err := http.ListenAndServe(":13337", nil)
	check(err)

	a := true
	for a {
		select {
		case a = <- killChan:
		default:
			time.Sleep(10 * time.Millisecond)
		}
	}
}
