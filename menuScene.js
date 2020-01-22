var buttonStart;
var menuScene;
var bg;

function setupMenuScene() {
    Beat.playMode("restart");
    Beat.setVolume(1)
    Beat.play();
    bg = loadImage('textures/background.png');
    var img2 = loadImage('textures/startbutton.png');
    menuScene = new Group();
    buttonStart = createSprite(width / 2, height / 2, 500, 80);
    buttonStart.addImage(img2);
    buttonStart.mouseActive = true;
    menuScene.add(buttonStart);
}

function initMenuScene() {
    gameRunning = false;
    mouseIsPressed = false;
    cursor();
}

function drawMenuScene() {

    background(bg);
    if (buttonStart.mouseIsOver) {
        fill(200, 200, 200);
        rectMode(CENTER);
        rect(width / 2, height / 2, 510, 90)
    }
    if (buttonStart.mouseIsPressed) {
        changeGameState(GameStates.GAME);

    }

    drawSprites(menuScene);
}