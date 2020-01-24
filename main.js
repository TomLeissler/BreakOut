var canvasWidth = 900;
var CanvasHeight = 700;
var gameRunning;
var gameState;

const GameStates = {
    MENU: 0,
    GAME: 1,
    GAME_OVER: 2,
    STAGE_CLEAR: 3,
}

//--------------------------------------------------------------------------------------------------------

function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('sounds/bounce.mp3');
    Beat = loadSound('sounds/beat1.mp3');
    Beat1 = loadSound('sounds/beat2.mp3');
    ButtonSound = loadSound('sounds/button.mp3');
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
    setupStageClearScene();
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
    if (gameState == GameStates.STAGE_CLEAR) {
        drawStageClearScene();
    }
}

//--------------------------------------------------------------------------------------------------------


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
    mouseIsPressed = false;
    gameState = newState;
}