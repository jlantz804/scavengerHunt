const questions = [
    "Likelihood to be late",
    "Driving competency",
    "Stubbornness coefficient",
    "Sleep onset speed",
    "Proactivity in verbal affection",
    "Culinary performance",
    "Argument initiation frequency",
    "Sickness-related fragility",
    "Organizational aptitude",
    "Financial expenditure rate",
    "Adventurous spirit",
    "Musical taste compatibility",
    "Navigation and spatial awareness",
    "Romantic gesture frequency"
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

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.textContent = `CRITERION ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex]}`;
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
    reportContent += "DETAILED RATINGS:\n";
    
    ratings.forEach((r, i) => {
        reportContent += `${i+1}. ${r.criterion}: ${r.score}/3\n`;
    });
    
    reportContent += "\nFINAL VERDICT: I CHOOSE YOU ❤️\n";
    reportContent += "DINNER DIRECTIVE: OLIVE GARDEN 4/20/2026 (FANCY™ ATTIRE)\n";

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
