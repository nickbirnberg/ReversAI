var Game = (function () {
    /* Board representing game state.
     * 0 = empty
     * 1 = Player Piece
     * 2 = AI Piece
     */
    var board = [[0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,1,2,0,0,0],
                 [0,0,0,2,1,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                ];

    return {
        board: board
    }

})();