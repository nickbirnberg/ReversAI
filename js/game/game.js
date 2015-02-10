var Game = (function () {
    /* Board representing game state.
     * 0 = empty
     * 1 = AI Piece
     * 2 = Player Piece
     */
    var board = [[0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,3,0,0,0,0],
                 [0,0,3,1,2,0,0,0],
                 [0,0,0,2,1,3,0,0],
                 [0,0,0,0,3,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                ];

    return {
        board: board
    }

})();