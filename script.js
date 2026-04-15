const questions = [
    "Financial Support?",
    "Driving skills?",
    "Passenger Princess skills?",
    "Frequency of flowers?",
    "Frequency of affection?",
    "Frequency of head/sex?",
    "Quality of flowers?",
    "Quality of affection?",
    "Quality of head/sex?",
    "Mood?",
    "Emotional Support?",
    "Playlist quality?",
    "Does he notice the small things?",
    "Does he notice the big things?",
    "Does he notice things?",
    "Official review of Boyfriend (short answer)",
    "Final notes for Boyfriend (short answer)"
];

let currentQuestionIndex = 0;
let ratings = [];
let noClickCount = 0;

const questionText = document.getElementById('question-text');
const questionContainer = document.getElementById('question-container');
const finalContainer = document.getElementById('final-container');
const surpriseContainer = document.getElementById('surprise-container');
const successContainer = document.getElementById('success-container');
const generateReportBtn = document.getElementById('generate-report-btn');
const resultsSummary = document.getElementById('results-summary');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const resetBtn = document.getElementById('reset-btn');

const scoreButtons = document.getElementById('score-buttons');
const shortAnswerContainer = document.getElementById('short-answer-container');
const shortAnswerInput = document.getElementById('short-answer-input');
const submitShortAnswerBtn = document.getElementById('submit-short-answer-btn');

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionText.textContent = `CRITERION ${currentQuestionIndex + 1}: ${question}`;
        
        if (question.includes("(short answer)")) {
            scoreButtons.classList.add('hidden');
            shortAnswerContainer.classList.remove('hidden');
            shortAnswerInput.value = "";
        } else {
            scoreButtons.classList.remove('hidden');
            shortAnswerContainer.classList.add('hidden');
        }
    } else {
        questionContainer.classList.add('hidden');
        finalContainer.classList.remove('hidden');
    }
}

document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const score = e.target.getAttribute('data-score');
        ratings.push({
            criterion: questions[currentQuestionIndex],
            score: score
        });
        currentQuestionIndex++;
        showQuestion();
    });
});

submitShortAnswerBtn.addEventListener('click', () => {
    const answer = shortAnswerInput.value.trim() || "N/A";
    ratings.push({
        criterion: questions[currentQuestionIndex],
        score: answer
    });
    currentQuestionIndex++;
    showQuestion();
});

generateReportBtn.addEventListener('click', () => {
    finalContainer.classList.add('hidden');
    surpriseContainer.classList.remove('hidden');
});

yesBtn.addEventListener('click', () => {
    surpriseContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
    displaySummary();
});

function displaySummary() {
    let summaryHTML = "<h3>OFFICIAL PERFORMANCE LOG SUMMARY</h3><ul class='results-list'>";
    
    ratings.forEach((r, i) => {
        const isShortAnswer = r.criterion.includes("(short answer)");
        const scoreValue = isShortAnswer ? r.score : `${r.score}/3`;
        summaryHTML += `<li><strong>${r.criterion}</strong>: ${scoreValue}</li>`;
    });
    
    summaryHTML += "</ul>";
    summaryHTML += "<p class='final-verdict'>FINAL VERDICT: I CHOOSE YOU ❤️</p>";
    
    resultsSummary.innerHTML = summaryHTML;
}

noBtn.addEventListener('click', () => {
    noClickCount++;
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
    noBtn.textContent = "NON-COMPLIANCE DETECTED";
});

resetBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    ratings = [];
    noClickCount = 0;
    yesBtn.style.transform = 'scale(1)';
    noBtn.style.transform = 'scale(1)';
    noBtn.style.position = 'static';
    noBtn.textContent = 'DECLINE (NON-COMPLIANCE)';
    successContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
});

showQuestion();
