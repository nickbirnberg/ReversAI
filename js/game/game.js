Game = (function () {
    /* Board representing game state.
     * 0 = empty
     * 1 = AI Piece
     * 2 = Player Piece
     * 3 = Possible Player Moves
     * 4 = Possible AI Moves
     */
    var board;
    var currentPlayer;
    var render;

    return {
        init: init,
        playerMove: playerMove
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
        currentPlayer = 2;
        render = renderFunc;
        var moves = findMoves();
        displayMoves(moves);
        render(board);
    }

    function playerMove(coordX, coordY) {
        board[coordX][coordY] = 2;
        /* Make AI Move and Re-Render Board with Player Moves */
        render(board);
    }

    function findMoves() {
        var moves = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (board[x][y] != 0) continue;
                if (isSpaceValid(x, y) == true) {
                    moves.push([x, y]);
                }
            }
        }
        return moves;
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

    function displayMoves(moves) {
        moves.forEach(function (move) {
            board[move[0]][move[1]] = 3;
        });
    }
})();