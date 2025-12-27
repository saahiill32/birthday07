// ==================== Slideshow with Luma Fade ====================
const canvas = document.getElementById('slideshowCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg'
];

let loadedImages = [];
images.forEach(src => {
  const img = new Image();
  img.src = src;
  loadedImages.push(img);
});

let current = 0;
let next = 1;
let alpha = 0;
const fadeSpeed = 0.02;

function drawSlideshow() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha = 1;
  ctx.drawImage(loadedImages[current],0,0,canvas.width,canvas.height);

  ctx.globalAlpha = alpha;
  ctx.drawImage(loadedImages[next],0,0,canvas.width,canvas.height);

  alpha += fadeSpeed;
  if(alpha >= 1){
    alpha = 0;
    current = next;
    next = (next+1)%loadedImages.length;
  }
  requestAnimationFrame(drawSlideshow);
}
drawSlideshow();

// ==================== Countdown Timer ====================
const countdownDate = new Date('December 28, 2025 00:00:00').getTime();
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const timerInterval = setInterval(() => {
  const now = new Date().getTime();
  let distance = countdownDate - now;

  if(distance <=0){
    clearInterval(timerInterval);
    document.getElementById('timerText').style.display='none';
    document.getElementById('countdown').style.display='none';
    showPostTimerMessages();
    return;
  }

  const h = Math.floor(distance / (1000*60*60));
  const m = Math.floor((distance % (1000*60*60)) / (1000*60));
  const s = Math.floor((distance % (1000*60)) / 1000);

  hoursEl.textContent = h.toString().padStart(2,'0');
  minutesEl.textContent = m.toString().padStart(2,'0');
  secondsEl.textContent = s.toString().padStart(2,'0');
},1000);

// ==================== Audio Handling ====================
const song01 = document.getElementById('song01');
const song02 = document.getElementById('song02');

window.addEventListener('load', () => {
  song01.currentTime = 15;
  song01.play();
});

function showPostTimerMessages() {
  song01.pause();
  song02.currentTime = 57;
  song02.play();

  const post = document.getElementById('postTimerMessage');
  post.style.display = 'block';

  // show 13s sub messages then 8s switch to "I LOVE UHH SO MUCH.."
  setTimeout(() => {
    post.style.display = 'none';
    document.getElementById('loveMessage').style.display='block';
  },13000);

  launchBalloons();
  launchFireworks();
}

// ==================== Balloons ====================
function launchBalloons(){
  const balloonsDiv = document.getElementById('balloons');
  for(let i=0;i<10;i++){
    const balloon = document.createElement('div');
    balloon.style.width='30px';
    balloon.style.height='50px';
    balloon.style.background='red';
    balloon.style.borderRadius='50% 50% 50% 50% / 60% 60% 40% 40%';
    balloon.style.position='absolute';
    balloon.style.left = Math.random()*window.innerWidth+'px';
    balloon.style.bottom='0px';
    balloon.style.opacity=Math.random()+0.5;
    balloonsDiv.appendChild(balloon);

    const duration = 3000 + Math.random()*1000;
    balloon.animate([{transform:`translateY(0px)`},{transform:`translateY(-${window.innerHeight+100}px)`}],{
      duration: duration,
      iterations:1,
      easing:'ease-out'
    });

    setTimeout(()=>balloon.remove(),duration);
  }
}

// ==================== Fireworks ====================
function launchFireworks(){
  const fire = document.createElement('div');
  fire.style.position='absolute';
  fire.style.width='100%';
  fire.style.height='100%';
  fire.style.top=0;
  fire.style.left=0;
  fire.style.background='radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 80%)';
  fire.style.pointerEvents='none';
  document.body.appendChild(fire);
  setTimeout(()=>fire.remove(),4000);
}