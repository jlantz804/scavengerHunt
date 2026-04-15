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
const downloadFileBtn = document.getElementById('download-file-btn');
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
    saveReportLocally("ACCEPTED");
});

function saveReportLocally(status) {
    let reportContent = "OFFICIAL BOYFRIEND EVALUATION REPORT\n";
    reportContent += "====================================\n";
    reportContent += `DATE: ${new Date().toLocaleString()}\n`;
    reportContent += `SUBJECT: JOEY\n`;
    reportContent += `EVALUATOR: BRINLEIGH\n`;
    reportContent += `STATUS: ${status}\n\n`;
    reportContent += "DETAILED ASSESSMENT:\n";
    
    ratings.forEach((r, i) => {
        const isShortAnswer = r.criterion.includes("(short answer)");
        const scoreLabel = isShortAnswer ? "RESPONSE" : "RATING";
        const scoreValue = isShortAnswer ? r.score : `${r.score}/3`;
        reportContent += `${i+1}. ${r.criterion}\n   ${scoreLabel}: ${scoreValue}\n\n`;
    });
    
    reportContent += "FINAL VERDICT: I CHOOSE YOU ❤️\n";
    reportContent += "DIRECTIVE: RANDOM BULLSHIT AT AN UNDISCLOSED LOCATION\n";

    window.lastReport = reportContent;
}

downloadFileBtn.addEventListener('click', () => {
    const blob = new Blob([window.lastReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Boyfriend_Evaluation_Joey_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

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
