var buttonStart;
var menuScene;

function setupMenuScene() {
    menuScene = new Group();
    buttonStart = createSprite(100, 100, 100, 100);
    buttonStart.mouseActive = true;
    menuScene.add(buttonStart);
}

function initMenuScene() {
    gameRunning = false;
    mouseIsPressed = false;
    cursor();
}

function drawMenuScene() {
    background(100);
    fill(255);
    textSize(30);
    text("MENU", 200, 100);
    if (buttonStart.mouseIsPressed) {
        changeGameState(GameStates.GAME);
    }

    drawSprites(menuScene);
}