function scoreMove(state, player){
    var opp = null;
    if(player == Game.Color.BLACK)
    {
        opp = Game.Color.RED;
    }
    else{
        opp = Game.Color.BLACK;
    }
    var myCorners = numberCorners(state,player);
    var oppCorners = numberCorners(state,opp);
    var cornerScore = 600 * (myCorners-oppCorners)/4;

    var myPieces = numberPieces(state, player);
    var oppPieces = numberPieces(state, opp);
    var pieceScore = 100 * (myPieces-oppPieces)/64;

    var myMoves = Game.findNewMoves(state,player);
    var oppMoves = Game.findNewMoves(state,opp);
    var numMovesTotal = myMoves.length+oppMoves.length;
    var moveScore = numMovesTotal ? (myMoves.length*250)/numMovesTotal : 0;

    return moveScore+ pieceScore + cornerScore;
}

function numberPieces(state, player){
    var c = 0;
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (state.board[x][y] == player) c++;
        }
    }
    return c;
}
function numberCorners(state, player){
    var corners =0;
    if(state.board[0][0] == player) corners++;
    if(state.board[7][0] == player) corners++;
    if(state.board[0][7] == player) corners++;
    if(state.board[7][7] == player) corners++;

    return corners;
}

function miniMax(state, currentPlayer, maxDepth, currentDepth){
    if(currentDepth == maxDepth){
        return [scoreMove(state, currentPlayer),null]
    }
    var bestScore;
    var bestMove = null;
    if(state.currentPlayer == currentPlayer){
        bestScore = -300000;
    }
    else{
        bestScore = 300000;
    }
    state.cachedMoves = Game.findNewMoves(state, state.currentPlayer);
    if(!state.cachedMoves) {
        return [scoreMove(state, currentPlayer), null]
    }
    state.cachedMoves.forEach(function (move) {

        var nextState = Game.capturePieces(move[0],move[1],state);
        var next = miniMax(nextState, currentPlayer, maxDepth, currentDepth+1)
        //min value situation
        if(nextState.currentPlayer == currentPlayer){
            if(next[0]<bestScore){
                bestScore = next[0];
                bestMove = move;
            }
        }
        //max value situation
        else{
            if(next[0]>bestScore){
                bestScore = next[0];
                bestMove = move;
            }
        }

        });
    return [bestScore,bestMove];
}