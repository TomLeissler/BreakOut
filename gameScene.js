var paddle;
var paddleWidth = 110;
var paddleHeight = 20;
var ball;
var ballSize = 10;
var ballSpeed = 7;
var wallTop, wallBottom, wallLeft, wallRight;
var wallThickness = 200;
var bricks;
var lives = 3;
var livesabstand = 30;
var livesgroesse = 20;
var score = 0;


var gameScene;


function setupGameScene() {

    var img = loadImage('textures/paddletexture.png');
    bg2 = loadImage('textures/gamebackground.png');
    // Paddle
    paddle = createSprite(width / 2, height - 50, paddleWidth, paddleHeight);
    paddle.addImage(img);
    paddle.shapeColor = color(255);
    paddle.immovable = true;
    gameScene.add(paddle);

    // Ball
    ball = createSprite(width / 2, height / 2, ballSize * 1.5, ballSize * 1.5);
    // var balltexture = loadImage('textures/balltexture.png');
    // ball.addImage(balltexture);
    ball.draw = function () {
        fill(200, 200, 200);
        circle(0, 0, this.width);
        fill(255, 0, 0);
        circle(0, 0, this.width - 5);
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
    Beat.stop();
    Beat1.setVolume(1)
    Beat1.play();
    lives = 5;
    score = 0;
    ball.setVelocity(0, 0);
    createBrickfield(5, 10, 50, 17, 20, 25);
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
            var brick1 = loadImage('textures/red.png');
            brick.addImage(brick1)
            //    brick.shapeColor = color(255, 0, 255);
            brick.lives = 2;
            brick.immovable = true;
            bricks.add(brick);
            gameScene.add(brick);
        }
    }
}

function removeBrick(o1, o2) {
    o2.lives = o2.lives - 2;
    if (o2.lives == 1) {
        //o2.shapeColor = o2.shapeColor = color(125, 0, 125);
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
        // var live = createSprite(spalte * livesabstand + 30, 5, livesgroesse, livesgroesse, 3)
        // var live1 = loadImage('textures/livetexture.png');
        // live.addImage(live1)
        // scale = 50 % ;
        // live.immovable = true;
        // gameScene.add(live);

        noStroke();
        fill(200, 0, 0);
        rect(spalte * livesabstand + 30, 5, livesgroesse, livesgroesse, 3);

    }

}

function drawScore() {
    textSize(20);
    fill(255, 0, 0);
    text('Score:' + score, width - 170, 20);
}