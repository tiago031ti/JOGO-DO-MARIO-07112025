const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.game-over');
const score = document.querySelector('.score');
const highScore = document.querySelector('#high-score');
const gameSound = document.querySelector('.gamesound');
const diemario = document.querySelector('.die');
const jumpMa = document.querySelector('.jumpMario');
const Obsbullet = document.querySelector('.Obsbullet');
let marioLevel = 'start'; 'beg'; 'pro'; 'fly';
const pointSound = document.querySelector('.power');
const turtle = document.querySelector('.turtle');
const clouds = document.querySelector('.clouds');


gameSound.currentTime = 0;
gameSound.volume = 0.5;
gameSound.play();


const setCookie = function (name, value, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";SameSite=Lax;path=/";
};


const getCookie = function (name) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    name = name + "=";

    console.log(ca);
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
};

var scoreValue = -1;
var highScoreValue = getCookie('#high-score');


highScore.textContent = getCookie('#high-score');

const jump = () => {

    jumpMa.currentTime = 0;
    jumpMa.play();

    if (
        gameOver.style.display === 'block'
        || mario.classList.contains('jump')
    ) {
        return;
    }

    mario.classList.add('jump');

    scoreValue += 1;
    score.textContent = scoreValue;


    if (scoreValue >= 0 && scoreValue < 5 && marioLevel !== 'starter') {
        mario.src = 'images/mario-starter.gif';
        marioLevel = 'starter';


    } else if (scoreValue >= 5 && scoreValue < 10 && marioLevel !== 'beginner') {
        mario.src = './images/mario-beginner.gif';
        marioLevel = 'beginner';
    } else if (scoreValue >= 10 && marioLevel !== 'pro') {
        mario.src = './images/mario-pro.gif';
        marioLevel = 'pro';
    }
    if (marioLevel === 'pro') {
        mario.src = './images/mario-flying.gif';
        setTimeout(() => {
            mario.src = './images/mario-pro.gif';
        }, 500);
    }
    if (scoreValue === 5) {
        pointSound.currentTime = 0;
        pointSound.play();
    }
    if (scoreValue === 10) {
        pointSound.currentTime = 0;
        pointSound.play();
    }


    if (highScoreValue < scoreValue) {
        setCookie('high-score', scoreValue, 365);
        highScoreValue = scoreValue;
        highScore.textContent = highScoreValue;
    }

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

}


const waitingFailure = () => {



    const pipePosition = pipe.offsetLeft;

    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');




    if (
        pipePosition <= 120
        && pipePosition > 0
        && marioPosition < 112


    ) {


        mario.style.animationPlayState = 'paused';
        mario.style.bottom = `${marioPosition}px`;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        clouds.style.animationPlayState = 'paused';

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';


        gameOver.style.display = 'block';



        var audiodie = new Audio('sound/mariodie.wav');
        diemario.play();
        gameSound.pause();

        clearInterval(loop);
        clearInterval(obstacleInterval);
        document.removeEventListener('keydown', jump);
        document.removeEventListener('touchstart', jump);
    }




    const ObsbulletPosition = Obsbullet.offsetLeft;


    if (
        ObsbulletPosition <= 120
        && ObsbulletPosition > 0
        && marioPosition < 112

    ) {

        mario.style.animationPlayState = 'paused';
        mario.style.bottom = `${marioPosition}px`;

        Obsbullet.style.animation = 'none';
        Obsbullet.style.left = `${ObsbulletPosition}px`;

        clouds.style.animationPlayState = 'paused';

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';


        gameOver.style.display = 'block';



        var audiodie = new Audio('sound/mariodie.wav');
        diemario.play();
        gameSound.pause();

        clearInterval(loop);
        clearInterval(obstacleInterval);


        document.removeEventListener('keydown', jump);
        document.removeEventListener('touchstart', jump);




    }
    const turtlePosition = turtle.offsetLeft;
    if (
        turtlePosition <= 120
        && turtlePosition > 0
        && marioPosition < 112

    ) {

        mario.style.animationPlayState = 'paused';
        mario.style.bottom = `${marioPosition}px`;

        turtle.style.animation = 'none';
        turtle.style.left = `${turtlePosition}px`;

        clouds.style.animationPlayState = 'paused';

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';


        gameOver.style.display = 'block';



        var audiodie = new Audio('sound/mariodie.wav');
        diemario.play();
        gameSound.pause();

        clearInterval(loop);
        clearInterval(obstacleInterval);


        document.removeEventListener('keydown', jump);
        document.removeEventListener('touchstart', jump);




    }
};




let obstacleInterval;
function randomObstacle() {
    const obstacles = [pipe, Obsbullet, turtle];
    const random = Math.floor(Math.random() * obstacles.length);
    obstacles.forEach(obs => obs.style.display = 'none');
    obstacles[random].style.display = 'block';




}

obstacleInterval = setInterval(randomObstacle, 1000);
randomObstacle();




var loop = setInterval(waitingFailure, 10);





const restartGame = function () {


    obstacleInterval = setInterval(randomObstacle, 1000);
    randomObstacle();



    gameOver.style.display = 'none';



    mario.style.animationPlayState = 'running';
    mario.src = './images/mario-starter.gif';
    mario.style.height = '120px';
    mario.style.width = '125px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';


    clouds.style.animation = 'clouds-animation 20s infinite linear';

    pipe.style.left = 'auto';
    pipe.style.animation = 'pipe-animation 1s infinite linear';

    Obsbullet.style.left = 'auto';
    Obsbullet.style.animation = 'Obsbullet-animation 1s infinite linear';

    turtle.style.left = 'auto';
    turtle.style.animation = 'turtle-animation 1s infinite linear';

    scoreValue = 0;
    score.textContent = scoreValue;



    gameSound.currentTime = 0;
    gameSound.volume = 0.5;
    gameSound.play();


    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);



    loop = setInterval(waitingFailure, 10);


};





document.querySelector('.retry').addEventListener('click', restartGame);

document.querySelector('.game-board').addEventListener('keydown', jump);
document.querySelector('.game-board').addEventListener('touchstart', jump);