var stageClearScene;
var buttonNextStage;

function setupStageClearScene() {
    cursor()
    stageClearScene = new Group();
    var nextstage = loadImage('textures/nextstage.png');
    buttonNextStage = createSprite(width / 2, height / 2, 500, 50);
    buttonNextStage.addImage(nextstage);
    buttonNextStage.mouseActive = true;
    stageClearScene.add(buttonNextStage);

}

function initStageClearScene() {
    gameRunning = false;
    mouseIsPressed = false;

}

function drawStageClearScene() {
    background(0, 0, 0);

    if (buttonNextStage.mouseIsPressed) {
        currentLevel = (currentLevel + 1) % levels.length;
        changeGameState(GameStates.GAME);
        ButtonSound.setVolume(1);
        ButtonSound.play();

    }
    if (buttonNextStage.mouseIsOver) {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(width / 2, height / 2, 510, 60)
    }


    drawSprites(stageClearScene);

}