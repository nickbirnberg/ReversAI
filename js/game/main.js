function init() {
    var stage = new PIXI.Stage(0x66FF99);
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
    createPieces();

    // initialize game board and render it
    Game.init(renderBoard);

    document.body.appendChild(renderer.view);
    requestAnimFrame(animate);

    function animate() {
        requestAnimFrame(animate);
        // render the stage
        renderer.render(stage);
    }

    function createPieces() {
        for (var i = 0; i < 8; i++) {
            pieces[i] = [];
            for (var j = 0; j < 8; j++) {
                var piece = new PIXI.Sprite(redTexture);
                piece.position.x = 64 * j;
                piece.position.y = 64 * i;
                piece.buttonMode = true;

                pieces[i][j] = piece;
                stage.addChild(piece);
            }
        }
    }

    function renderBoard(gameBoard) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var piece = pieces[i][j];
                // remove interactiveness
                piece.interactive = false;
                // red piece
                if (gameBoard[i][j] == Game.Color.RED) {
                    piece.setTexture(redTexture);
                    piece.alpha = 1;
                }
                // black piece
                else if (gameBoard[i][j] == Game.Color.BLACK) {
                    piece.setTexture(blackTexture);
                    piece.alpha = 1;
                }
                // possible human move
                else if (gameBoard[i][j] == Game.Color.BLACK_MOVE) {
                    piece.setTexture(blackTexture);
                    piece.alpha = 0.3;
                    piece.interactive = true;
                    piece.mousedown = mouseDownFunc(i, j, Game.Color.BLACK);
                }
                // possible AI move
                else if (gameBoard[i][j] == Game.Color.RED_MOVE) {
                    piece.setTexture(redTexture);
                    piece.alpha = 0.3;
                    piece.interactive = true;
                    piece.mousedown = mouseDownFunc(i, j, Game.Color.RED);
                }
                // no piece
                else {
                    piece.alpha = 0;
                }
            }
        }
    }

    function mouseDownFunc(i, j, color) {
        return function () {
            Game.playerMove(i, j, color);
        };
    }
}