# snake
Recreation of the old mobile game Snake using canvas in JavaScript.

You'll need to run this against a local server to get this running (otherwise you'll get a CORS errors). This is how I've done it in VS Code:
1. Get the Live Server extension from the extensions marketplace in VS code
2. Navigate to game.html in the src folder
3. Click F1, then Live Server: Open with Live Server
4. A tab should now open with the game on your default browser

## The Challenge

This week, your task is to re-create the famous arcade game 'Snake'. The game has seen various iterations over the years, but the version re-popularised by Nokia phones in the noughties involves a single player attempting to eat randomly-placed items by running into them with the head of the snake.  Each item eaten makes the snake longer, and the game progressively more difficult.
:six:  Points are awarded for submitting a working, playable version of the game (see below for more)  
:two:  Further points are awarded for a game with audio and/or animations  
:two:  Further points are awarded for implementing a basic high-score board  

### Additional Info:
You're free to decide upon the dimensions of your game area
The are no restrictions on languages/tools
The criteria for a 'working' game include a board with bounding walls, a snake which grows each time it eats, and proper detection when the snake has eaten itself