const questions = [
    "Who is more likely to be late?",
    "Who is the better driver?",
    "Who is more stubborn?",
    "Who falls asleep first?",
    "We're getting food... who said 'i don't care' first?",
    "Who is the better cook?",
    "We’re on a road trip… who controls the music?",
    "Who would press the “do not press” button?",
    "Who is more organized?",
    "Who is more clingy?",
    "Who is the more adventurous one?",
    "Who has the better taste in music?",
    "Who is more likely to get lost?",
    "Who is the romantic one?"
];

let currentQuestionIndex = 0;
let noClickCount = 0;

const questionText = document.getElementById('question-text');
const hisBtn = document.getElementById('his-btn');
const herBtn = document.getElementById('her-btn');
const questionContainer = document.getElementById('question-container');
const finalContainer = document.getElementById('final-container');
const surpriseContainer = document.getElementById('surprise-container');
const successContainer = document.getElementById('success-container');
const revealSurpriseBtn = document.getElementById('reveal-surprise-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const themeToggle = document.getElementById('theme-toggle');
const heartContainer = document.getElementById('heart-container');
const body = document.body;

const noTexts = [
    "Are you sure?",
    "Please?",
    "Think about it...",
    "Pretty please?",
    "Don't do this to me!",
    "I'll be sad...",
    "But Olive Garden!",
    "Fancy clothes??"
];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤️', '💖', '💗', '💓', '💕'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heartContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create hearts periodically
setInterval(createHeart, 300);

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.textContent = questions[currentQuestionIndex];
    } else {
        questionContainer.classList.add('hidden');
        finalContainer.classList.remove('hidden');
    }
}

function handleAnswer() {
    currentQuestionIndex++;
    showQuestion();
    // Burst of hearts on answer
    for(let i=0; i<5; i++) createHeart();
}

hisBtn.addEventListener('click', handleAnswer);
herBtn.addEventListener('click', handleAnswer);

revealSurpriseBtn.addEventListener('click', () => {
    finalContainer.classList.add('hidden');
    surpriseContainer.classList.remove('hidden');
});

yesBtn.addEventListener('click', () => {
    surpriseContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
    // Massive heart burst
    setInterval(createHeart, 50);
});

noBtn.addEventListener('click', () => {
    noClickCount++;
    
    const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
    noBtn.textContent = randomText;

    if (noClickCount <= 3) {
        const yesScale = 1 + (noClickCount * 0.5);
        const noScale = 1 - (noClickCount * 0.2);
        
        yesBtn.style.transform = `scale(${yesScale})`;
        noBtn.style.transform = `scale(${noScale})`;
    } else {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }
});

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('pink-theme')) {
        body.classList.replace('pink-theme', 'red-theme');
        themeToggle.textContent = 'Switch to Pink Theme';
    } else {
        body.classList.replace('red-theme', 'pink-theme');
        themeToggle.textContent = 'Switch to Red Theme';
    }
});

showQuestion();
