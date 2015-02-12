function init() {
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(512, 512);
    // create background image
    var bgSprite = new PIXI.Sprite.fromImage("img/bg.png");
    stage.addChild(bgSprite);
    // piece textures
    var redTexture = new PIXI.Texture.fromImage("img/red.png");
    var blackTexture = new PIXI.Texture.fromImage("img/black.png");
    // container to hold game Sprites
    var pieces = [];

    // create initial game pieces
    for(var i = 0; i < 8; i++) {
        pieces[i] = [];
        for(var j = 0; j < 8; j++) {
            var piece = new PIXI.Sprite(redTexture);
            piece.position.x = 64 * j;
            piece.position.y = 64 * i;
            piece.buttonMode = true;

            pieces[i][j] = piece;
            stage.addChild(piece);
        }
    }

    // initialize game board and render it
    initGame();
    renderBoard();

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    requestAnimFrame( animate );

    function animate() {
        requestAnimFrame( animate );
        // render the stage
        renderer.render(stage);
    }

    function renderBoard() {
        var gameBoard = Game.board;
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                var piece = pieces[i][j];
                // remove interactiveness
                piece.interactive = false;
                // red piece
                if(gameBoard[i][j] == 1) {
                    piece.setTexture(redTexture);
                    piece.alpha = 1;
                }
                // black piece
                else if(gameBoard[i][j] == 2) {
                    piece.setTexture(blackTexture);
                    piece.alpha = 1;
                }
                // possible human move
                else if(gameBoard[i][j] == 3) {
                    piece.setTexture(blackTexture);
                    piece.alpha = 0.3;
                    piece.interactive = true;
                    piece.mousedown = mouseDownFunc(i,j);
                }
                // possible AI move
                else if(gameBoard[i][j] == 4) {
                    piece.setTexture(redTexture);
                    piece.alpha = 0.3;
                }
                // no piece
                else {
                    piece.alpha = 0;
                }
            }
        }
    }

    function mouseDownFunc(i, j) {
        return function(){
            playerMove(i, j, renderBoard);
        };
    }
}