var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/6;
var y = canvas.height/2;

var playerMoveType = "none";
var moves = {
    "none":"none",
    "q":"fist",
    "e":"kick"
};

var playerSprites = {
    "none":"assets/player.png",
    "fist":"assets/fist.png",
    "kick":"assets/kick.png"
};

var enemySprites = [
    "assets/zamasu.png",
    "assets/cell.png"
];

var enemyX = canvas.width;
var enemyY = getNewRandomEnemyPosition();

var dimensionX = 50;
var dimensionY = 50;


var health = 100;
var enemies = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHealth();
    drawEnemies();
    drawPlayer();
    drawEnemy();
}

function drawHealth(){
    ctx.beginPath();
    ctx.font = "10px Arial";
    ctx.textAlign = "start";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "black";
    ctx.fillText("❤️ "+health, canvas.width-100, 20);
    ctx.closePath();
}

function drawEnemies(){
    ctx.beginPath();
    ctx.font = "10px Arial";
    ctx.textAlign = "start";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "black";
    ctx.fillText("🥊 "+enemies, canvas.width-100, 40);
    ctx.closePath();
}

function drawPlayer(){
    if(upPressed) {
        if (y > 0){
            y -= 1;
        }
    }
    else if(downPressed) {
        if(y < canvas.height-dimensionY){
            y += 1;
        }
    }
    collisionDetection();
    ctx.beginPath();
    var drawingPlayer = new Image();
    drawingPlayer.src = playerSprites[playerMoveType];
    ctx.beginPath();
    ctx.drawImage(drawingPlayer, x, y, dimensionX, dimensionY);
    ctx.fill();
    ctx.closePath();
}


var drawingEnemy = new Image();
function drawEnemy(){
    drawingEnemy.src = randomEnemySprite;
    ctx.drawImage(drawingEnemy,enemyX, enemyY, dimensionX, dimensionY);
    ctx.beginPath();
    ctx.fill();
    ctx.closePath();
    enemyX=enemyX-2;
    enemyY=enemyY;
}

setInterval(draw, 10);


var upPressed = false;
var downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
        playerMoveType = "none";
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
        playerMoveType = "none";
    }
    else {
        playerMoveType = moves[e.key];
    }
}

function collisionDetection(){
    if(x>enemyX && x<enemyX+dimensionX && y>enemyY && y<enemyY+dimensionY){
        console.log("collision")
        if(playerMoveType!="none"){
            console.log(playerMoveType)
            enemyX=-100;
            enemies+=1;
        }else{
            console.log("hurt")
            if(health>0){
                health-=1;
            }else{
                x=-100;
            }
        }
    }else if(x+dimensionX>enemyX && x+dimensionX<enemyX+dimensionX && y+dimensionY>enemyY && y+dimensionY<enemyY+dimensionY){
        console.log("collision")
        if(playerMoveType!="none"){
            console.log(playerMoveType)
            enemyX=-100;
            enemies+=1;
        }else{
            console.log("hurt")
            if(health>0){
                health-=1;
            }else{
                x=-100;
            }
        }
    }
}

setInterval(resetPlayerMove, 500);
function resetPlayerMove(){
    playerMoveType="none";
}

var randomEnemySprite = getNewRandomEnemySprite();
setInterval(resetEnemyPsition, 5000);
function resetEnemyPsition(){
    enemyX = canvas.width;
    enemyY = getNewRandomEnemyPosition();
    randomEnemySprite = getNewRandomEnemySprite();
}

function getNewRandomEnemySprite(){
    return enemySprites[Math.floor(Math.random() * enemySprites.length)];
}

function getNewRandomEnemyPosition(){
    return Math.floor(Math.random() * canvas.height) + 0;
}