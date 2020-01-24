var paddle;
var paddleWidth = 110;
var paddleHeight = 20;
var ball;
var ballSpeed = 7;
var wallTop, wallBottom, wallLeft, wallRight;
var wallThickness = 200;
var bricks;
var lives = 3;
var livesabstand = 30;
var livesgroesse = 20;
var score = 0;
var row;
var gameScene;


function setupGameScene() {

    var img = loadImage('textures/paddletexture.png');
    var bg2 = loadImage('textures/gamebackground.png');
    var Ball = loadImage('textures/ball.png');
    var Heart = loadImage('textures/heart.png');

    // Paddle
    paddle = createSprite(width / 2, height - 50, paddleWidth, paddleHeight);
    paddle.addImage(img);
    paddle.shapeColor = color(255);
    paddle.immovable = true;
    gameScene.add(paddle);

    // Ball
    ball = createSprite(width / 2, height / 2);
    ball.addImage(Ball);
    ball.scale = 1.5;
    ball.setVelocity(0, 0);
    ball.setCollider('circle', 0, 0, 7.5);
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

    //Row

    row = createSprite(width / 2 + 100, height / 2, 30, 30);
    var rowtexture = loadImage('textures/rowtexture.png');
    row.addImage(rowtexture);
    row.shapeColor = color(255);
    row.immovable = true;
    gameScene.add(row);

    //Heart
    heart = createSprite();
    heart.addImage(Heart);

}

function initGameScene() {
    Beat.stop();
    Beat1.setVolume(0.5);
    Beat1.play();
    lives = 3;
    score = 0;
    ball.setVelocity(0, 0);
    createBrickfield(3, 10, 50, 17, 20, 25);
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
    ball.bounce(row);

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
    o2.lives -= 2;
    if (o2.lives == 1) {
        //o2.shapeColor = o2.shapeColor = color(125, 0, 125);
        mySound.setVolume(1)
        mySound.play();
        score += 5;
    }
    if (o2.lives == 0) {
        o2.remove();
        mySound.setVolume(1)
        mySound.play();
        score += 10;
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
        heart.position.x = spalte * livesabstand + 30;
        heart.position.y = 30;
        heart.display();
        //rect(spalte * livesabstand + 30, 5, livesgroesse, livesgroesse, 3);

    }

}

function drawScore() {
    textSize(20);
    fill(255, 0, 0);
    text('Score:' + score, width - 170, 20);
}