var buttonStart;
var menuScene;

function setupMenuScene() {
    menuScene = new Group();
    buttonStart = createSprite(100, 100, 100, 100);
    buttonStart.mouseActive = true;
    menuScene.add(buttonStart);
}


function drawMenuScene() {
    background(100);
    fill(255);
    textSize(30);
    text("MENU", 200, 100);
    if (buttonStart.mouseIsPressed) {
        gameState = 1;
        lives = 5;
        createBrickfield(3, 7, 70, 20, 20, 35);
        gameRunning = false;
        mouseIsPressed = false;
        noCursor();
    }

    drawSprites(menuScene);
}