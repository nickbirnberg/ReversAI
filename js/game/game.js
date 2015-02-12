Game = (function () {
    var Color = {
        EMPTY: 0,
        RED: 1,
        BLACK: 2,
        RED_MOVE: 3,
        BLACK_MOVE: 4
    };

    var render;
    var moves;


    return {
        init: init,
        playerMove: playerMove,
        Color: Color
    };

    function init(renderFunc) {
        var currentState;
        var board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        render = renderFunc;
        currentState = new State();
        currentState.board = copyBoard(board);
        currentState.currentPlayer = Color.BLACK;
        currentState.opponent = Color.RED;
        findNewMoves(currentState);
        displayMoves(currentState);
        render(currentState);
    }

    function playerMove(coordX, coordY, color, state) {
        removeOldMoves(state);
        state.board[coordX][coordY] = color;
        capturePieces(coordX, coordY, state);
        findNewMoves(state);
        displayMoves(state);
        render(state);
    }

    function findNewMoves(state) {
        moves = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (state.board[x][y] != 0) continue;
                if (isSpaceValid(x, y, state.board, state.currentPlayer) == true) {
                    moves.push([x, y]);
                }
            }
        }
    }

    function capturePieces(x, y, state) {
        var board = state.board;
        var currentPlayer = state.currentPlayer;
        // left
        for (var i = 2; y - i > -1; i++) {
            if (board[x][y - i] == currentPlayer) {
                while (i != 0) {
                    board[x][y - i] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // right
        for (var i = 2; y + i < 8; i++) {
            if (board[x][y + i] == currentPlayer) {
                while (i != 0) {
                    board[x][y + i] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // up
        for (var i = 2; x - i > -1; i++) {
            if (board[x - i][y] == currentPlayer) {
                while (i != 0) {
                    board[x - i][y] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // down
        for (var i = 2; x + i < 8; i++) {
            if (board[x + i][y] == currentPlayer) {
                while (i != 0) {
                    board[x + i][y] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // left up
        for (var i = 2; y - i > -1 && x - i > -1; i++) {
            if (board[x - i][y - i] == currentPlayer) {
                while (i != 0) {
                    board[x - i][y - i] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // right up
        for (var i = 2; y + i < 8 && x - i > -1; i++) {
            if (board[x - i][y + i] == currentPlayer) {
                while (i != 0) {
                    board[x - i][y + i] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // down right
        for (var i = 2; y + i < 8 && x + i < 8; i++) {
            if (board[x + i][y + i] == currentPlayer) {
                while (i != 0) {
                    board[x + i][y + i] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // down left
        for (var i = 2; y - i > -1 && x + i < 8; i++) {
            if (board[x + i][y - i] == currentPlayer) {
                while (i != 0) {
                    board[x + i][y - i] = currentPlayer;
                    i--;
                }
                break;
            }
        }
        // switch opponents
        if (currentPlayer == Color.BLACK) {
            state.currentPlayer = Color.RED;
            state.opponent = Color.BLACK;
        }
        else {
            state.currentPlayer = Color.BLACK;
            state.opponent = Color.RED;
        }
    }

    function isSpaceValid(x, y, board, currentPlayer) {
        var testMove = false;

        //test right
        if (x != 7 && board[x + 1][y] != currentPlayer) {
            for (var i = (x + 1); i < 8; i++) {
                if (board[i][y] == 0) break;
                if (board[i][y] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //test left
        if (x != 0 && board[x - 1][y] != currentPlayer) {
            for (i = (x - 1); i >= 0; i--) {
                if (board[i][y] == 0) break;
                if (board[i][y] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //test up
        if (y != 0 && board[x][y - 1] != currentPlayer) {
            for (i = (y - 1); i >= 0; i--) {
                if (board[x][i] == 0) break;
                if (board[x][i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //test down
        if (y != 7 && board[x][y + 1] != currentPlayer) {
            for (i = (y + 1); i < 8; i++) {
                if (board[x][i] == 0) break;
                if (board[x][i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag up right
        if (x != 7 && y != 0 && board[x + 1][y - 1] != currentPlayer) {

            for (i = 1; x + i < 8 && y - i >= 0; ++i) {

                if (board[x + i][y - i] == 0) break;
                if (board[x + i][y - i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag up left
        if (x != 0 && y != 0 && board[x - 1][y - 1] != currentPlayer) {

            for (i = 1; x - i >= 0 && y - i >= 0; ++i) {

                if (board[x - i][y - i] == 0) break;
                if (board[x - i][y - i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag down right
        if (x != 7 && y != 7 && board[x + 1][y + 1] != currentPlayer) {

            for (i = 1; x + i < 8 && y + i < 8; ++i) {

                if (board[x + i][y + i] == 0) break;
                if (board[x + i][y + i] == currentPlayer) {
                    testMove = true;
                }
            }
        }
        //diag down left
        if (x != 0 && y != 7 && board[x - 1][y + 1] != currentPlayer) {

            for (i = 1; x - i >= 0 && y + i < 8; ++i) {

                if (board[x - i][y + i] == 0) break;
                if (board[x - i][y + i] == currentPlayer) {
                    testMove = true;
                }
            }
        }

        return testMove;
    }

    function displayMoves(state) {
        moves.forEach(function (move) {
            if(state.currentPlayer == Color.BLACK)
                state.board[move[0]][move[1]] = Color.BLACK_MOVE;
            else
                state.board[move[0]][move[1]] = Color.RED_MOVE;
        });
    }
    function removeOldMoves(state) {
        moves.forEach(function (move) {
            state.board[move[0]][move[1]] = Color.EMPTY;
        });
    }

    function bestMove(state, player, depth){
        var moves = miniMax(state, player, depth, 0);
    }

    function copyBoard(currBoard){
        var clone = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                clone[x][y] = currBoard[x][y];
            }
        }
        return clone;
    }

    function scoreMove(state){


    }

    function numberPieces(state){
        var c = 0;
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (state.board[x][y] == state.currentPlayer) c++;
            }
        }
        return c;
    }

    function miniMax(state, currentPlayer, maxDepth, currentDepth){
        if(currentDepth == maxDepth){
            return [scoreMove(state),null]
        }
        var bestScore;
        if(state.currentPlayer == currentPlayer){
            bestScore = -300000;
        }
        else{
            bestScore = 300000;
        }
    }
})();

function State() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
    this.currentPlayer = null;
    this.opponent = null;
}
