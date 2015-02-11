var Game;
Game = (function () {
    /* Board representing game state.
     * 0 = empty
     * 1 = AI Piece
     * 2 = Player Piece
     * 3 = Possible Player Moves
     * 4 = Possible AI Moves
     */
    var board = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var currentPlayer = 2;

    return {
        board: board,
        currentPlayer: currentPlayer
    }

})();

function playerMove(coordX, coordY) {
    console.log("Clicked on: " + coordX + "," + coordY);
}

function findMovesPlayer(board,currentPlayer){
    var moves = [];
    for(var x =0; x<8; x++){
        for(var y = 0; y<8; y++){
            if(board[x][y] != 0) continue;
            if(isSpaceValid(currentPlayer,x,y,board) == true){
                moves.push([x,y]);

            }
        }
    }
    return moves;
}

function isSpaceValid(currentPlayer,x,y,board){
    var testMove = false;

        //test right
        if (x != 7 && board[x+1][y] != currentPlayer) {
            for (var i = (x + 1); i < 8; i++) {
                if (board[i][y] == 0) break;
                if (board[i][y] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //test left
        if (x != 0  && board[x-1][y] != currentPlayer) {
            for (i = (x - 1); i >= 0; i--) {
                if (board[i][y] == 0) break;
                if (board[i][y] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //test up
        if(y!=0  && board[x][y-1] != currentPlayer) {
            for (i = (y - 1); i >= 0; i--) {
                if (board[x][i] == 0) break;
                if (board[x][i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //test down
        if(y!=7  && board[x][y+1] != currentPlayer) {
            for (i = (y + 1); i < 8; i++) {
                if (board[x][i] == 0) break;
                if (board[x][i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag up right
        if(x != 7 && y != 0 && board[x+1][y-1] != currentPlayer){

            for (i = 1; x+i < 8 && y-i >=0; ++i) {

                if (board[x+i][y-i] == 0) break;
                if (board[x+i][y-i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag up left
        if(x != 0 && y != 0 && board[x-1][y-1] != currentPlayer){

            for (i = 1; x-i >=0 && y-i >=0; ++i) {

                if (board[x-i][y-i] == 0) break;
                if (board[x-i][y-i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag down right
        if(x != 7 && y != 7 && board[x+1][y+1] != currentPlayer){

            for (i = 1; x+i < 8 && y+i <8; ++i) {

                if (board[x+i][y+i] == 0) break;
                if (board[x+i][y+i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag down left
        if(x != 0 && y != 7 && board[x-1][y+1] != currentPlayer){

            for (i = 1; x-i >=0 && y+i <8; ++i) {

                if (board[x-i][y+i] == 0) break;
                if (board[x-i][y+i] == currentPlayer) {
                    testMove = true;
                }
            }
        }

    return testMove;
}

function displayMoves(moves) {
    var board = Game.board;
    for (var i = 0; i < moves.length; i++){
        var move = moves[i];
        board[move[0]][move[1]] = 3;
    }
}
function initGame(){
    var board = Game.board;
    var moves = findMovesPlayer(board,2);
    displayMoves(moves);
}