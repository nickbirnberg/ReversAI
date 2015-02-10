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
    var container = new PIXI.SpriteBatch();
    stage.addChild(container);

    // set initial game pieces
    var board = Game.board;
    for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board.length; j++) {
            var piece = new PIXI.Sprite(redTexture);
            piece.x = 64 * i;
            piece.y = 64 * j;
            // red piece
            if(board[i][j] == 1) {
                piece.setTexture(redTexture);
            }
            // black piece
            else if(board[i][j] == 2) {
                piece.setTexture(blackTexture);
            }
            // no piece
            else {
                piece.alpha = 0;
            }
            container.addChild(piece);
        }
    }
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    requestAnimFrame( animate );

    function animate() {
        requestAnimFrame( animate );

        // render the stage
        renderer.render(stage);
    }
}