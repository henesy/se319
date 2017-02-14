# Using the (generous) Go² API

_All following assume that the server is hosted on localhost/127.0.0.1 on the default port (:13337)_

## Accessing the main page

Navigate to either `http://127.0.0.1:13337/` or `http://127.0.0.1:13337/main/`

## Accessing a game directly

As of 02/10/2017 game ID's must be an integer <100.

We assume the game's ID is `27`, for example.

Navigate to `http://127.0.0.1:13337/game/27`

_Note_: This marks a game as `Active`.

## Submitting a game move

As of 02/10/2017 board widths must be an integer <100.

Requests are formatted as `xxyysgg` which equates to:

- xx: Integer X-coordinate
- yy: Integer Y-coordinate
- s: State to set at preceding location of b/w/e -- Black, White, Empty, respectively
- gg: Game ID to perform the preceding action upon

For example: `http://127.0.0.1:13337/move/0503b23` would set coordinate (5,3) to Black for game ID 23

## Accessing a win screen

To access the white win screen of game ID `5` directly, for example.

Navigate to `http://127.0.0.1:13337/over/w/5`

To access the black win screen of game ID `7` directly, for example.

Navigate to `http://127.0.0.1:13337/over/b/7`

_Note_: This marks a game as `Inactive`.


## Killing the server remotely

Navigate to `http://127.0.0.1:13337/kill/`

## Accessing the game piece image files

Image files for white and black game pieces, respectively, are as follows:

`http://127.0.0.1:13337/white/white.png`
`http://127.0.0.1:13337/black/black.png`

_Note_: While this is the recommended method, any `/white/` or `/black/` URL, respectively, would suffice.

## Credit

Sean Hinchee and Sam Westerlund (Group 20)
