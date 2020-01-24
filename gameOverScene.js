var buttonRetry;
var gameOverScene;
var background2;

function setupGameOverScene() {
    bg2 = loadImage('textures/gameover.png');
    var backToMenu = loadImage('textures/backtomenu.png');
    gameOverScene = new Group();
    buttonRetry = createSprite(width / 2, height / 2 + 20, 500, 50);
    buttonRetry.addImage(backToMenu);
    buttonRetry.mouseActive = true;
    gameOverScene.add(buttonRetry);
}

function initGameOverScene() {
    cursor();
}

function drawGameOverScene() {
    background(bg2);
    fill(0);
    textSize(30);
    text("Back to menu", 100, 100);

    if (buttonRetry.mouseIsPressed && buttonRetry.mouseIsOver) {
        changeGameState(GameStates.MENU);
        mouseIsPressed = false;
    }

    if (buttonRetry.mouseIsOver) {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(width / 2, height / 2 + 20, 510, 60)
    }


    drawSprites(gameOverScene);


}