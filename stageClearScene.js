var stageClearScene;

function setupStageClearScene() {
    stageClearScene = new Group();

}

function initStageClearScene() {
    gameRunning = false;
    mouseIsPressed = false;

}

function drawStageClearScene() {
    background(100, 0, 100);
    fill(0, 255, 0);
    textSize(30);
    text("Stage Clear", 200, 100);

}