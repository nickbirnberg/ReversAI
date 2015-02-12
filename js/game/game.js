Game = (function () {
    var Color = {
        EMPTY: 0,
        RED: 1,
        BLACK: 2,
        RED_MOVE: 3,
        BLACK_MOVE: 4
    };

    var board;
    var currentPlayer;
    var render;
    var moves;

    return {
        init: init,
        playerMove: playerMove,
        Color: Color
    };

    function init(renderFunc) {
        board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        currentPlayer = Color.BLACK;
        render = renderFunc;
        findNewMoves();
        displayMoves();
        render(board);
    }

    function playerMove(coordX, coordY, color) {
        removeOldMoves();
        board[coordX][coordY] = color;
        if (color == Color.BLACK)
            currentPlayer = Color.RED;
        else
            currentPlayer = Color.BLACK;
        /* Make AI Move and Re-Render Board with Player Moves */
        findNewMoves();
        displayMoves();
        render(board);
    }

    function findNewMoves() {
        moves = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (board[x][y] != 0) continue;
                if (isSpaceValid(x, y) == true) {
                    moves.push([x, y]);
                }
            }
        }
    }

    function isSpaceValid(x, y) {
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

    function displayMoves() {
        moves.forEach(function (move) {
            if(currentPlayer == Color.BLACK)
                board[move[0]][move[1]] = Color.BLACK_MOVE;
            else
                board[move[0]][move[1]] = Color.RED_MOVE;
        });
    }
    function removeOldMoves() {
        moves.forEach(function (move) {
            board[move[0]][move[1]] = Color.EMPTY;
        });
    }
})();