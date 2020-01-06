var buttonRetry;
var gameOverScene;

function setupGameOverScene() {
    gameOverScene = new Group();
    buttonRetry = createSprite(200, 200, 200, 200);
    buttonRetry.mouseActive = true;
    gameOverScene.add(buttonRetry);
}

function initGameOverScene() {
    cursor();
}

function drawGameOverScene() {
    background(255, 0, 0);
    fill(0);
    textSize(30);
    text("Back to menu", 100, 100);

    if (buttonRetry.mouseIsPressed && buttonRetry.mouseIsOver) {
        changeGameState(GameStates.MENU);
    }

    drawSprites(gameOverScene);
}