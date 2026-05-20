document.addEventListener('DOMContentLoaded', () => {
    const clues = [
        {
            riddle: "I have many aisles but no wings, I'm where you go to buy all the things. Walk through the heart of the city to find your next treasure. What are we doing?",
            answer: "shopping",
            activity: "Shopping Adventure",
            place: "Downtown Manitowoc"
        },
        {
            riddle: "When the sun goes down and your stomach starts to growl, we head to a kitchen where the cocktails are top-shelf. What are we having?",
            answer: "dinner",
            activity: "Dinner and Cocktails",
            place: "KC Kitchen and Cocktails"
        },
        {
            riddle: "At the end of the day, when the sky turns to gold, we walk the trail by the water to watch the day grow old. What are we watching?",
            answer: "sunset",
            activity: "Watching the Sunset",
            place: "Bayshore Trail"
        }
    ];

    let currentClueIndex = 0;

    const clueTitle = document.getElementById('clue-title');
    const clueText = document.getElementById('clue-text');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackMsg = document.getElementById('feedback-msg');
    const clueContainer = document.getElementById('clue-container');
    const successContainer = document.getElementById('success-container');
    const activityRevealed = document.getElementById('activity-revealed');
    const placeRevealed = document.getElementById('place-revealed');
    const nextClueBtn = document.getElementById('next-clue-btn');
    const finalContainer = document.getElementById('final-container');
    const restartBtn = document.getElementById('restart-btn');
    const completeHuntBtn = document.getElementById('complete-hunt-btn');
    const heartPage = document.getElementById('heart-page');
    const heartContainer = document.getElementById('heart-container');
    const huntContainer = document.querySelector('.hunt-container');

    function showClue() {
        if (currentClueIndex < clues.length) {
            const clue = clues[currentClueIndex];
            clueTitle.textContent = `CLUE #${currentClueIndex + 1}`;
            clueText.textContent = clue.riddle;
            answerInput.value = "";
            feedbackMsg.classList.add('hidden');
            clueContainer.classList.remove('hidden');
            successContainer.classList.add('hidden');
            finalContainer.classList.add('hidden');
            heartPage.classList.add('hidden');
            huntContainer.classList.remove('hidden');
        } else {
            clueContainer.classList.add('hidden');
            successContainer.classList.add('hidden');
            finalContainer.classList.remove('hidden');
        }
    }

    submitBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const currentClue = clues[currentClueIndex];

        if (userAnswer === currentClue.answer) {
            showSuccess(currentClue);
        } else {
            feedbackMsg.textContent = "Incorrect. The treasure remains hidden. Try again!";
            feedbackMsg.classList.remove('hidden');
            feedbackMsg.style.color = "#b71c1c";
        }
    });

    function showSuccess(clue) {
        clueContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        activityRevealed.innerHTML = `<strong>Activity:</strong> ${clue.activity}`;
        placeRevealed.innerHTML = `<strong>Location:</strong> ${clue.place}`;
    }

    nextClueBtn.addEventListener('click', () => {
        currentClueIndex++;
        showClue();
    });

    completeHuntBtn.addEventListener('click', () => {
        if (confirm("Are you sure you have completed the treasure hunt?")) {
            showHeartPage();
        }
    });

    function showHeartPage() {
        huntContainer.classList.add('hidden');
        heartPage.classList.remove('hidden');
        heartContainer.innerHTML = '';
        
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.textContent = 'i love you';
            span.className = 'heart-text';
            span.style.animationDelay = `${(i / 20) * -10}s`;
            heartContainer.appendChild(span);
        }
    }

    restartBtn.addEventListener('click', () => {
        currentClueIndex = 0;
        showClue();
    });

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    showClue();
});
