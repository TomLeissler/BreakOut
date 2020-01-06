var canvasWidth = 900;
var CanvasHeight = 700;
var gameRunning;
var gameState;

//--------------------------------------------------------------------------------------------------------

function setup() {
    createCanvas(canvasWidth, CanvasHeight);
    gameRunning = false;
    gameState = 0;

    gameScene = new Group();

    setupMenuScene();
    setupGameScene();
    setupGameOverScene();
}

//--------------------------------------------------------------------------------------------------------



function draw() {
    if (gameState == 0) {
        drawMenuScene();
    }
    if (gameState == 1) {
        drawGameScene();
    }
    if (gameState == 2) {
        drawGameOverScene();
    }
    if (gameState == 3) {
        drawGameWonScene();
    }
}

//--------------------------------------------------------------------------------------------------------
/*
function drawGameWonScene() {
    let congrats = 'CONGRATULATIONS';
    background(100);
    textSize(90);
    text(c, width / 2 - textWidth(c), height / 2);
    fill(0, 102, 153);
}
*/
//--------------------------------------------------------------------------------------------------------