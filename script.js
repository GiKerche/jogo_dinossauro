const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let score = 0;

function scoreDino() {
  if (score != -1 && score != 0){
    alert("Sua pontuação foi: " + score);
  }else{
    alert("Sua pontuação foi: 0");
  }
}

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if(!isJumping){
            jump();
        }
    }
    if (event.keyCode === 38) {
        if(!isJumping){
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
      if (position >= 150) {
        // desce
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          } else {
            position -= 20;
            dino.style.bottom = position + 'px';
          }
        }, 20);
      } else {
        // pula
        position += 20;
        dino.style.bottom = position + 'px';
      }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    score+=10;
    if (isGameOver) return;
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftTimer = setInterval(() => {
      if (cactusPosition < -60) {
        // fora da tela
        clearInterval(leftTimer);
        background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        // game over
        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        scoreDino();
      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);
  
    setTimeout(createCactus, randomTime);
  }
  createCactus();
  document.addEventListener('keyup', handleKeyUp);