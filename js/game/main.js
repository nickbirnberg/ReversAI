function init() {
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(512, 512);
    // create background image
    var bgTexture = PIXI.Sprite.fromImage("img/bg.png");
    stage.addChild(bgTexture);
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    requestAnimFrame( animate );

    function animate() {
        requestAnimFrame( animate );

        // render the stage
        renderer.render(stage);
    }
}