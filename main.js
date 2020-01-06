var canvasWidth = 900;
var CanvasHeight = 700;
var gameRunning;
var gameState;

const GameStates = {
    MENU: 0,
    GAME: 1,
    GAME_OVER: 2,
    STAGE_OVER: 3,
  }

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
    if (gameState == GameStates.MENU) {
        drawMenuScene();
    }
    if (gameState == GameStates.GAME) {
        drawGameScene();
    }
    if (gameState == GameStates.GAME_OVER) {
        drawGameOverScene();
    }
    if (gameState == GameStates.STAGE_OVER) {
        //drawGameWonScene();
    }
}


function changeGameState(newState) {
    if (newState == GameStates.MENU) {
        initMenuScene()
    }
    if (newState == GameStates.GAME) {
        initGameScene();
    }
    if (newState == GameStates.GAME_OVER) {
        initGameOverScene();
    }
    if (newState == GameStates.STAGE_OVER) {
        //initStageOverScene();
    }

    gameState = newState;
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