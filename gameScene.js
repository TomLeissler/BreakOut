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
var scoredisplay = 0;
var row;
var gameScene;
var currentLevel = 0;
var brickImages = [];
var superSized = false;
var superSizeCooldown = 360;
var superSizeCounter = 0;

function setupGameScene() {

    var img = loadImage('textures/paddletexture.png');
    var img2 = loadImage('textures/paddleSuperSized.png');
    var bg2 = loadImage('textures/gamebackground.png');
    var Ball = loadImage('textures/ball.png');
    var Heart = loadImage('textures/heart.png');

    // Paddle
    paddle = createSprite(width / 2, height - 50, paddleWidth, paddleHeight);
    paddle.addImage("normal", img);
    paddle.addImage("super", img2);
    paddle.shapeColor = color(255);
    paddle.immovable = true;
    gameScene.add(paddle);

    //Bricks
    brickImages[0] = loadImage('textures/red.png');
    brickImages[1] = loadImage('textures/green.png');
    brickImages[2] = loadImage('textures/blue.png');
    brickImages[3] = loadImage('textures/lila.png');
    brickImages[4] = loadImage('textures/orange.png');
    brickImages[5] = loadImage('textures/brightblue.png');
    brickImages[6] = loadImage('textures/yellow.png');
    brickImages[7] = loadImage('textures/darkgreen.png');
    brickImages[8] = loadImage('textures/grey.png');
    brickImages[9] = loadImage('textures/rowtexture.png');


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

    // row = createSprite(width / 2 + 100, height / 2, 30, 30);
    // var rowtexture = loadImage('textures/rowtexture.png');
    // row.addImage(rowtexture);
    // row.shapeColor = color(255);
    // row.immovable = true;
    // gameScene.add(row);

    //Heart
    heart = createSprite();
    heart.addImage(Heart);

    score = 0;
    lives = 3;

}

function initGameScene() {
    lives = 3;
    score = 0;
    scoredisplay = 0;
    ball.position.x = width / 2;
    ball.position.y = height / 2;
    Beat.stop();
    //Beat1.stop();
    Beat1.playMode("restart");
    Beat1.setVolume(0.2);
    Beat1.play();
    ball.setVelocity(0, 0);
    createBrickfield();
    gameRunning = false;
    mouseIsPressed = false;
    noCursor();
}

function drawGameScene() {
    if (keyIsPressed && keyCode == RIGHT_ARROW) {
        changeGameState(GameStates.STAGE_CLEAR);
    }

    superSizeCounter--;
    if (superSized && superSizeCounter <= 0) {
        paddle.changeImage("normal");
        //paddle.setCollider("rectangle", 0, 0, paddle.getBoundingBox().extents.x, paddle.getBoundingBox().extents.y);
        paddle.setCollider("rectangle", 0, 0, 110, 20);
        superSized = false;
    }

    paddle.position.x = mouseX;
    ball.bounce(bricks, removeBrick);

    if (ball.bounce(paddle)) {
        let xdiff = 0;
        if (superSized) {
            xdiff = (ball.position.x - paddle.position.x) * 110 / 200;
        } else {
            xdiff = ball.position.x - paddle.position.x;
        }

        ball.setSpeed(ballSpeed, ball.getDirection() + xdiff / 2);
        Break.setVolume(1);
        Break.play();
    }

    ball.bounce(wallTop);
    ball.bounce(wallBottom, bottomWallHit);
    ball.bounce(wallLeft);
    ball.bounce(wallRight);
    //ball.bounce(row);

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




function createBrickfield() {
    let cl = currentLevel;
    let rows = levels[cl].levelData.length;
    let columns = levels[cl].levelData[0].length;
    let marginHorizontal = levels[cl].marginHorizontal;
    let marginVertical = levels[cl].marginVertical;
    let brickWidth = brickImages[0].width;
    let brickHeight = brickImages[0].height;
    let fieldWidth = brickWidth * columns + marginHorizontal * (columns - 1);
    let fieldHeight = brickHeight * rows + marginVertical * (rows - 1);

    if (bricks) {
        bricks.removeSprites();
        bricks.clear();
    } else {
        bricks = new Group();
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (levels[cl].levelData[r][c] > 0) {
                var brick = createSprite(
                    width / 2 - fieldWidth / 2 + brickWidth / 2 + c * (brickWidth + marginHorizontal),
                    levels[cl].marginTop + r * (brickHeight + marginVertical));
                brick.addImage(brickImages[levels[cl].levelData[r][c] - 1]);

                brick.lives = brickTypes[levels[cl].levelData[r][c] - 1].lives;
                brick.immovable = true;
                bricks.add(brick);
                gameScene.add(brick);
            }
        }
    }
}

function removeBrick(o1, o2) {
    o2.lives -= 1;
    if (o2.lives > 0) {
        //o2.shapeColor = o2.shapeColor = color(125, 0, 125);
        mySound.setVolume(1);
        mySound.play();
        if (!superSized) {
            //console.log("score +5");
            score += 5;
        }

    }
    if (o2.lives == 0) {
        o2.remove();
        Breaker.setVolume(1);
        Breaker.play();
        if (!superSized) {
            //console.log("score +10");
            score += 10;
        }
    }
    if (bricks.size() == 0) {
        Beat1.stop();
        changeGameState(GameStates.STAGE_CLEAR);
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
    let myFont;

    function preload() {
        myFont = loadFont('joystick.ttf');
    }
    textAlign(CENTER);
    textSize(18);
    fill(255, 255, 255);
    textFont('Arial');
    text('' + bricks.length, width / 2, 45);
    rectMode(CENTER);
    r = random(255);
    g = random(255);
    b = random(255);
    fill(r, g, b);
    rect(paddle.position.x, height - 30, score / 2, 15, 10);
    if (!superSized && score > 220) {
        superSized = true;
        superSizeCounter = superSizeCooldown;
        paddle.changeImage("super");
        //paddle.setCollider("rectangle", 0, 0, paddle.getBoundingBox().extents.x, paddle.getBoundingBox().extents.y);
        paddle.setCollider("rectangle", 0, 0, 200, 20);
        score = 0;
        lives += 1;
        Charge.setVolume(1);
        Charge.play();
    }
    rectMode(CENTER);
    noStroke();
    fill(sin(frameCount * 0.05) * 75 + 180, 0, 0);
    rect(width / 2, 20, -bricks.length * 10, 10, 10);
}