var buttonStart;
var menuScene;
var bg;
var buttonStage;

function setupMenuScene() {

    bg = loadImage('textures/background.png');
    var img2 = loadImage('textures/startbutton.png');
    var img3 = loadImage('textures/stagebutton.png');
    menuScene = new Group();
    buttonStart = createSprite(width / 2, height / 2, 500, 50);
    buttonStart.addImage(img2);
    buttonStart.mouseActive = true;
    menuScene.add(buttonStart);

    buttonStage = createSprite(width / 2, height / 2 + 80, 500, 50);
    buttonStage.addImage(img3);
    buttonStage.mouseActive = true;
    menuScene.add(buttonStage);
}

function initMenuScene() {
    Beat1.stop();
    Beat.playMode("restart");
    Beat.setVolume(1)
    Beat.play();
    gameRunning = false;
    mouseIsPressed = false;
    cursor();
}

function drawMenuScene() {

    background(bg);
    if (buttonStart.mouseIsOver) {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(width / 2, height / 2, 510, 60)
    }
    if (buttonStart.mouseIsPressed) {
        changeGameState(GameStates.GAME);
        ButtonSound.setVolume(1);
        ButtonSound.play();

    }
    if (buttonStage.mouseIsOver) {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(width / 2, height / 2 + 80, 510, 60)
    }

    drawSprites(menuScene);
}