var paddle;
var paddleWidth = 100;
var paddleHeight = 20;
var ball;
var ballSize = 10;
var ballSpeed = 7;
var wallTop, wallBottom, wallLeft, wallRight;
var wallThickness = 200;
var bricks;
var lives = 3;
var livesabstand = 50;
var livesgroesse = 20;
var score = 0;

var gameScene;


function setupGameScene() {
    var img = loadImage('paddletexture.png');

    // Paddle
    paddle = createSprite(width / 2, height - 50, paddleWidth, paddleHeight);
    paddle.addImage(img);
    paddle.shapeColor = color(255);
    paddle.immovable = true;
    gameScene.add(paddle);

    // Ball
    ball = createSprite(width / 2, height / 2, ballSize * 1.5, ballSize * 1.5);

    ball.draw = function () {
        fill(this.shapeColor);
        circle(0, 0, this.width);
    };

    ball.shapeColor = color(255);
    ball.setVelocity(0, 0);
    ball.setCollider('circle', 0, 0, ballSize * 0.75);
    //ball.debug = true;
    gameScene.add(ball);

    // Walls
    wallTop = createSprite(width / 2, -wallThickness / 2, width + 2 * wallThickness, wallThickness);
    wallTop.immovable = true;

    wallBottom = createSprite(width / 2, height + wallThickness / 2, width + 2 * wallThickness, wallThickness);
    wallBottom.immovable = true;

    wallLeft = createSprite(0 - wallThickness / 2, height / 2, wallThickness, height);
    wallLeft.immovable = true;

    wallRight = createSprite(width + wallThickness / 2, height / 2, wallThickness, height);
    wallRight.immovable = true;

    gameScene.add(wallTop);
    gameScene.add(wallBottom);
    gameScene.add(wallRight);
    gameScene.add(wallLeft);

}

function initGameScene() {
    lives = 5;
    score = 0;
    ball.setVelocity(0, 0);
    createBrickfield(5, 10, 50, 20, 10, 25);
    gameRunning = false;
    mouseIsPressed = false;
    noCursor();
}

function drawGameScene() {
    paddle.position.x = mouseX;
    ball.bounce(bricks, removeBrick);

    if (ball.bounce(paddle)) {
        let xdiff = ball.position.x - paddle.position.x;
        ball.setSpeed(ballSpeed, ball.getDirection() + xdiff / 2);
        mySound.setVolume(1)
        mySound.play();
    }

    ball.bounce(wallTop);
    ball.bounce(wallBottom, bottomWallHit);
    ball.bounce(wallLeft);
    ball.bounce(wallRight);

    if (mouseIsPressed && gameRunning == false) {
        gameRunning = true;
        ball.setSpeed(ballSpeed, 90 + random(-20, 20));
    }

    background(0);
    drawSprites(gameScene);
    drawLives();
    if (lives == 0) {
        changeGameState(GameStates.GAME_OVER);
    }
    drawScore();
}




function createBrickfield(rows, columns, brickWidth, brickHeight, marginHorizontal, marginVertical) {
    let fieldWidth = brickWidth * columns + marginHorizontal * (columns - 1);
    let fieldHeight = brickHeight * rows + marginVertical * (rows - 1);
    if (bricks) {
        bricks.removeSprites();
        bricks.clear();
    }
    bricks = new Group();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            var brick = createSprite(
                width / 2 - fieldWidth / 2 + brickWidth / 2 + c * (brickWidth + marginHorizontal),
                height / 5 - fieldHeight / 2 + r * (brickHeight + marginVertical), brickWidth, brickHeight);
            brick.shapeColor = color(255, 0, 255);
            brick.lives = 2;
            brick.immovable = true;
            bricks.add(brick);
            gameScene.add(brick);
        }
    }
}

function removeBrick(o1, o2) {
    o2.lives = o2.lives - 1;
    if (o2.lives == 1) {
        o2.shapeColor = o2.shapeColor = color(125, 0, 125);
        mySound.setVolume(1)
        mySound.play();
        score = score + 5;
    }
    if (o2.lives == 0) {
        o2.remove();
        mySound.setVolume(1)
        mySound.play();
        score = score + 10;
    }
    if (bricks.size() == 0) {
        gameState = 3;
    }
}

function bottomWallHit(o1, o2) {
    lives = lives - 1;
    ball.position.x = width / 2;
    ball.position.y = height / 2;
    ball.setVelocity(0, 0);
    gameRunning = false;
}

function drawLives() {
    for (var spalte = 0; spalte < lives; spalte++) {
        noStroke();
        fill(255, 0, 0);
        rect(spalte * livesabstand + 50, 10, livesgroesse, livesgroesse);
    }

}

function drawScore() {
    textSize(20);
    fill(255, 0, 255);
    text('Score:' + score, 20, height / 2);
}


function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('bounce.mp3');
}