// ==================== CONFIGURATION ====================
const QUESTIONS_PER_ROUND = 10;
const TIME_LIMIT = 5; // seconds
const SPEECH_RATE = 0.85;
const FEEDBACK_DELAY = 2500; // ms to show feedback before next question

// ==================== ROUND DEFINITIONS ====================
const ROUNDS = [
    {
        name: 'Patterns',
        emoji: '\u{1F522}',
        description: 'Find the next number in the pattern!',
        generator: generatePatternQuestions
    },
    {
        name: 'Mental Math Chain',
        emoji: '\u{1F517}',
        description: 'Add and subtract single digits in a chain!',
        generator: generateChainQuestions
    },
    {
        name: '2-Digit Addition',
        emoji: '\u2795',
        description: 'Add two 2-digit numbers (no regrouping)!',
        generator: generateAdditionQuestions
    },
    {
        name: '2-Digit Subtraction',
        emoji: '\u2796',
        description: 'Subtract two 2-digit numbers (no regrouping)!',
        generator: generateSubtractionQuestions
    }
];

// ==================== STATE ====================
const state = {
    currentRound: 0,
    currentQuestion: 0,
    practiceMode: false,
    scores: [0, 0, 0, 0],
    questions: [],
    results: [],
    allResults: [[], [], [], []],
    timerInterval: null,
    timerTimeout: null,
    timeLeft: TIME_LIMIT,
    isAnswered: false,
    pdfQuestions: []
};

// ==================== DOM REFERENCES ====================
const $ = (id) => document.getElementById(id);
const dom = {
    roundBadge: $('round-badge'),
    roundName: $('round-name'),
    roundDescription: $('round-description'),

    headerRound: $('header-round'),
    headerQuestion: $('header-question'),
    headerScore: $('header-score'),
    timerBar: $('timer-bar'),
    timerText: $('timer-text'),
    questionText: $('question-text'),
    answerInput: $('answer-input'),
    btnSubmit: $('btn-submit'),
    inputSection: $('input-section'),

    feedbackIcon: $('feedback-icon'),
    feedbackText: $('feedback-text'),
    feedbackAnswer: $('feedback-answer'),

    summaryTitle: $('summary-title'),
    summaryScore: $('summary-score'),
    summaryDetails: $('summary-details'),

    finalBreakdown: $('final-breakdown'),
    finalTotal: $('final-total'),
    finalMessage: $('final-message')
};

// ==================== UTILITIES ====================
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== QUESTION GENERATORS ====================

function generatePatternQuestions() {
    const patternDefs = [
        { startMin: 1, startMax: 5, step: 1 },
        { startMin: 3, startMax: 8, step: 1 },
        { startMin: 2, startMax: 6, step: 2 },
        { startMin: 1, startMax: 5, step: 2 },
        { startMin: 5, startMax: 10, step: 5 },
        { startMin: 5, startMax: 15, step: 5 },
        { startMin: 10, startMax: 30, step: 10 },
        { startMin: 10, startMax: 20, step: 10 },
        { startMin: 8, startMax: 15, step: -1 },
        { startMin: 12, startMax: 20, step: -2 }
    ];

    const questions = [];
    for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
        const p = patternDefs[i % patternDefs.length];
        const start = random(p.startMin, p.startMax);
        const nums = [start];
        for (let j = 1; j < 4; j++) {
            nums.push(nums[j - 1] + p.step);
        }
        const answer = nums[3] + p.step;

        questions.push({
            display: nums.join(',  ') + ',  ?',
            speech: 'What comes next? ' + nums.join(', '),
            answer: answer
        });
    }
    return shuffle(questions);
}

function generateChainQuestions() {
    const questions = [];
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
        const firstNum = random(2, 9);
        const nums = [firstNum];
        const ops = [];
        let result = firstNum;

        for (let i = 0; i < 3; i++) {
            const canAdd = result < 14;
            const canSub = result > 3;
            let op;
            if (canAdd && canSub) {
                op = Math.random() < 0.5 ? '+' : '-';
            } else if (canAdd) {
                op = '+';
            } else {
                op = '-';
            }

            let num;
            if (op === '+') {
                num = random(1, Math.min(9, 18 - result));
                result += num;
            } else {
                num = random(1, Math.min(9, result - 1));
                result -= num;
            }
            ops.push(op);
            nums.push(num);
        }

        let display = String(nums[0]);
        let speech = String(nums[0]);
        for (let i = 0; i < 3; i++) {
            display += ' ' + ops[i] + ' ' + nums[i + 1];
            speech += ', ' + (ops[i] === '+' ? 'plus' : 'minus') + ' ' + nums[i + 1];
        }

        questions.push({
            display: display + ' = ?',
            speech: speech,
            answer: result
        });
    }
    return questions;
}

function generateAdditionQuestions() {
    const questions = [];
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
        const tens1 = random(1, 7);
        const ones1 = random(0, 8);
        const tens2 = random(1, 9 - tens1);
        const ones2 = random(0, 9 - ones1);

        const num1 = tens1 * 10 + ones1;
        const num2 = tens2 * 10 + ones2;

        questions.push({
            display: num1 + ' + ' + num2 + ' = ?',
            speech: num1 + ' plus ' + num2,
            answer: num1 + num2
        });
    }
    return questions;
}

function generateSubtractionQuestions() {
    const questions = [];
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
        const tens1 = random(3, 9);
        const ones1 = random(1, 9);
        const tens2 = random(1, tens1 - 1);
        const ones2 = random(0, ones1);

        const num1 = tens1 * 10 + ones1;
        const num2 = tens2 * 10 + ones2;

        questions.push({
            display: num1 + ' \u2212 ' + num2 + ' = ?',
            speech: num1 + ' minus ' + num2,
            answer: num1 - num2
        });
    }
    return questions;
}

// ==================== SPEECH SYNTHESIS ====================

function speak(text) {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            resolve();
            return;
        }
        speechSynthesis.cancel();

        // Chrome bug workaround: resume if paused/stuck after cancel
        speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = SPEECH_RATE;
        utterance.pitch = 1.1;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        // Chrome sometimes drops speech if called right after cancel
        setTimeout(() => {
            speechSynthesis.speak(utterance);
        }, 50);
    });
}

// ==================== EXCEL UPLOAD ====================

function parseExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const questions = [];

                for (const row of rows) {
                    if (!row || row.length < 2) continue;
                    const questionText = String(row[0]).trim();
                    const answerVal = parseInt(String(row[1]).trim(), 10);

                    if (!questionText || isNaN(answerVal)) continue;
                    // Skip header row
                    if (questionText.toLowerCase() === 'question') continue;

                    const speech = questionText
                        .replace(/\+/g, ' plus ')
                        .replace(/\-|\u2212/g, ' minus ')
                        .replace(/\*/g, ' times ')
                        .replace(/\//g, ' divided by ')
                        .replace(/,\s*\?/g, '')
                        .replace(/\?/g, '')
                        .replace(/,/g, ', ');

                    questions.push({
                        display: questionText + ' = ?',
                        speech: speech,
                        answer: answerVal
                    });
                }

                resolve(questions);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

function startPdfGame() {
    if (state.pdfQuestions.length === 0) return;

    state.currentRound = 0;
    state.practiceMode = true;
    state.scores = [0, 0, 0, 0];
    state.allResults = [[], [], [], []];

    // Override round 0 with uploaded questions
    ROUNDS[0]._originalGenerator = ROUNDS[0].generator;
    ROUNDS[0].generator = () => {
        return [...state.pdfQuestions];
    };
    ROUNDS[0]._originalName = ROUNDS[0].name;
    ROUNDS[0].name = 'Uploaded Questions';
    ROUNDS[0]._originalDesc = ROUNDS[0].description;
    ROUNDS[0].description = state.pdfQuestions.length + ' questions from your file';

    showRoundIntro();
}

function restoreRounds() {
    // Restore original round 0 if it was overridden
    if (ROUNDS[0]._originalGenerator) {
        ROUNDS[0].generator = ROUNDS[0]._originalGenerator;
        ROUNDS[0].name = ROUNDS[0]._originalName;
        ROUNDS[0].description = ROUNDS[0]._originalDesc;
        delete ROUNDS[0]._originalGenerator;
        delete ROUNDS[0]._originalName;
        delete ROUNDS[0]._originalDesc;
    }
}

// ==================== SCREEN MANAGEMENT ====================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ==================== GAME FLOW ====================

function startGame() {
    state.currentRound = 0;
    state.practiceMode = false;
    state.scores = [0, 0, 0, 0];
    state.allResults = [[], [], [], []];
    showRoundIntro();
}

function startPractice(roundIndex) {
    state.currentRound = roundIndex;
    state.practiceMode = true;
    state.scores = [0, 0, 0, 0];
    state.allResults = [[], [], [], []];
    showRoundIntro();
}

function showRoundIntro() {
    const round = ROUNDS[state.currentRound];
    dom.roundBadge.textContent = 'Round ' + (state.currentRound + 1);
    dom.roundName.textContent = round.emoji + ' ' + round.name;
    dom.roundDescription.textContent = round.description;
    showScreen('screen-round-intro');
    speak('Round ' + (state.currentRound + 1) + '. ' + round.name + '. ' + round.description);
}

function beginRound() {
    const round = ROUNDS[state.currentRound];
    state.currentQuestion = 0;
    state.scores[state.currentRound] = 0;
    state.results = [];
    state.questions = round.generator();
    showQuestion();
}

async function showQuestion() {
    const q = state.questions[state.currentQuestion];
    state.isAnswered = false;

    // Update header
    dom.headerRound.textContent = 'Round ' + (state.currentRound + 1);
    dom.headerQuestion.textContent = 'Q ' + (state.currentQuestion + 1) + '/' + QUESTIONS_PER_ROUND;
    dom.headerScore.textContent = '\u2B50 ' + state.scores[state.currentRound];

    // Single screen — show listening prompt + input area together
    dom.questionText.textContent = '\uD83D\uDD0A Listen carefully...';
    dom.inputSection.classList.remove('hidden');

    // Reset input — visible but disabled while question is being read
    dom.answerInput.value = '';
    dom.answerInput.disabled = true;
    setNumpadEnabled(false);
    dom.btnSubmit.disabled = true;

    // Reset timer visual (paused, full bar)
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = '100%';
    dom.timerBar.className = 'timer-bar';
    dom.timerText.textContent = TIME_LIMIT;

    showScreen('screen-question');

    // Speak the question (student listens on this same screen)
    await speak(q.speech);

    // Safety: if already answered somehow, bail
    if (state.isAnswered) return;

    // Now enable input and start the countdown — same screen, no transition
    dom.questionText.textContent = '\u2753 Your answer?';
    dom.answerInput.disabled = false;
    dom.answerInput.focus();
    setNumpadEnabled(true);
    dom.btnSubmit.disabled = false;

    startTimer();
}

function submitAnswer() {
    if (state.isAnswered) return;

    const inputVal = dom.answerInput.value.trim();
    if (inputVal === '') return;

    const userAnswer = parseInt(inputVal, 10);
    if (isNaN(userAnswer)) return;

    state.isAnswered = true;
    stopTimer();

    const q = state.questions[state.currentQuestion];
    const correct = userAnswer === q.answer;

    if (correct) {
        state.scores[state.currentRound]++;
    }

    state.results.push({
        questionDisplay: q.display,
        correctAnswer: q.answer,
        userAnswer: userAnswer,
        correct: correct,
        timedOut: false
    });

    showFeedback(correct ? 'correct' : 'wrong', q.answer, userAnswer);
}

function timeUp() {
    if (state.isAnswered) return;
    state.isAnswered = true;
    stopTimer();

    const q = state.questions[state.currentQuestion];

    // Check if partial answer was typed
    const inputVal = dom.answerInput.value.trim();
    const userAnswer = inputVal ? parseInt(inputVal, 10) : null;
    const correct = userAnswer !== null && userAnswer === q.answer;

    if (correct) {
        state.scores[state.currentRound]++;
    }

    state.results.push({
        questionDisplay: q.display,
        correctAnswer: q.answer,
        userAnswer: userAnswer,
        correct: correct,
        timedOut: true
    });

    if (correct) {
        showFeedback('correct', q.answer, userAnswer);
    } else {
        showFeedback('timeout', q.answer, userAnswer);
    }
}

function showFeedback(type, correctAnswer, userAnswer) {
    const feedbackCard = document.querySelector('.feedback-card');
    feedbackCard.className = 'card feedback-card';

    if (type === 'correct') {
        feedbackCard.classList.add('feedback-correct');
        dom.feedbackIcon.textContent = '\u{1F31F}';
        dom.feedbackText.textContent = 'Correct!';
        dom.feedbackAnswer.textContent = '';
        speak('Correct! Great job!');
    } else if (type === 'timeout') {
        feedbackCard.classList.add('feedback-timeout');
        dom.feedbackIcon.textContent = '\u23F0';
        dom.feedbackText.textContent = "Time's Up!";
        dom.feedbackAnswer.textContent = 'The answer was ' + correctAnswer;
        speak("Time's up! The answer was " + correctAnswer);
    } else {
        feedbackCard.classList.add('feedback-wrong');
        dom.feedbackIcon.textContent = '\u{1F614}';
        dom.feedbackText.textContent = 'Not quite!';
        dom.feedbackAnswer.textContent = 'The answer was ' + correctAnswer;
        speak('The answer was ' + correctAnswer);
    }

    showScreen('screen-feedback');

    setTimeout(() => {
        state.currentQuestion++;
        if (state.currentQuestion < QUESTIONS_PER_ROUND) {
            showQuestion();
        } else {
            showRoundSummary();
        }
    }, FEEDBACK_DELAY);
}

function showRoundSummary() {
    const round = ROUNDS[state.currentRound];
    const score = state.scores[state.currentRound];

    dom.summaryTitle.textContent = round.emoji + ' ' + round.name + ' Complete!';
    dom.summaryScore.textContent = score + ' / ' + QUESTIONS_PER_ROUND;

    // Build review list
    let html = '';
    state.results.forEach((r) => {
        const cls = r.correct ? 'correct' : 'wrong';
        const icon = r.correct ? '\u2705' : '\u274C';
        const questionClean = r.questionDisplay.replace(' = ?', '').replace(',  ?', '');
        const answerText = r.userAnswer !== null ? ('You: ' + r.userAnswer) : 'No answer';
        html +=
            '<div class="summary-item ' + cls + '">' +
                '<span class="icon">' + icon + '</span>' +
                '<span class="question-label">' + escapeHtml(questionClean) + '</span>' +
                '<span class="answer-info">= ' + r.correctAnswer + ' (' + escapeHtml(answerText) + ')</span>' +
            '</div>';
    });
    dom.summaryDetails.innerHTML = html;

    // Button text
    const btnNext = $('btn-next-round');
    if (state.practiceMode) {
        btnNext.textContent = 'See Results \u{1F3C6}';
    } else if (state.currentRound < ROUNDS.length - 1) {
        btnNext.textContent = 'Next Round \u2192';
    } else {
        btnNext.textContent = 'See Final Score \u{1F3C6}';
    }

    // Save this round's results for the final screen
    state.allResults[state.currentRound] = [...state.results];

    showScreen('screen-round-summary');

    const msg = score >= 8 ? 'Amazing!' : score >= 5 ? 'Good job!' : 'Keep practicing!';
    speak('You got ' + score + ' out of ' + QUESTIONS_PER_ROUND + '. ' + msg);
}

function nextRound() {
    if (state.practiceMode) {
        showFinalScore();
        return;
    }
    state.currentRound++;
    if (state.currentRound < ROUNDS.length) {
        showRoundIntro();
    } else {
        showFinalScore();
    }
}

function endGame() {
    // Save current round's results if any questions were answered
    if (state.results.length > 0) {
        state.allResults[state.currentRound] = [...state.results];
    }
    stopTimer();
    speechSynthesis.cancel();
    state.isAnswered = true;
    showFinalScore();
}

function showFinalScore() {
    const total = state.scores.reduce((a, b) => a + b, 0);
    // Count only rounds that were actually played
    let questionsPlayed = 0;
    ROUNDS.forEach((round, i) => {
        questionsPlayed += state.allResults[i].length;
    });
    const maxScore = questionsPlayed;

    let html = '';
    ROUNDS.forEach((round, i) => {
        // Skip rounds with no questions attempted
        if (state.allResults[i].length === 0) return;

        // Round header row
        html +=
            '<div class="final-round-header">' +
                '<span>' + round.emoji + ' ' + round.name + '</span>' +
                '<span class="final-round-score">' + state.scores[i] + ' / ' + QUESTIONS_PER_ROUND + '</span>' +
            '</div>';

        // Question-by-question details for this round
        state.allResults[i].forEach((r, qi) => {
            const cls = r.correct ? 'correct' : 'wrong';
            const icon = r.correct ? '\u2705' : '\u274C';
            const questionClean = r.questionDisplay.replace(' = ?', '').replace(',  ?', '');
            const yourAnswer = r.userAnswer !== null ? r.userAnswer : '\u2014';
            html +=
                '<div class="final-question-row ' + cls + '">' +
                    '<span class="fq-num">' + icon + '</span>' +
                    '<span class="fq-question">' + escapeHtml(questionClean) + '</span>' +
                    '<span class="fq-correct">= ' + r.correctAnswer + '</span>' +
                    '<span class="fq-yours">' + escapeHtml(String(yourAnswer)) + '</span>' +
                '</div>';
        });
    });
    dom.finalBreakdown.innerHTML = html;

    dom.finalTotal.textContent = total + ' / ' + maxScore;

    const pct = total / maxScore;
    let message;
    if (pct >= 0.9) message = "Outstanding! You're a Math Champion!";
    else if (pct >= 0.7) message = 'Great job! Keep it up!';
    else if (pct >= 0.5) message = 'Good effort! Practice makes perfect!';
    else message = "Keep practicing, you'll get better!";

    dom.finalMessage.textContent = message;

    showScreen('screen-final');
    speak('You scored ' + total + ' out of ' + maxScore + '. ' + message);
}

// ==================== TIMER ====================

function startTimer() {
    state.timeLeft = TIME_LIMIT;
    dom.timerText.textContent = TIME_LIMIT;
    dom.timerBar.className = 'timer-bar';

    // Reset bar to full
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = '100%';

    // Force reflow then animate
    void dom.timerBar.offsetHeight;
    dom.timerBar.style.transition = 'width ' + TIME_LIMIT + 's linear';
    dom.timerBar.style.width = '0%';

    // Countdown text and color changes
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        dom.timerText.textContent = Math.max(0, state.timeLeft);

        if (state.timeLeft <= 2) {
            dom.timerBar.classList.remove('warning');
            dom.timerBar.classList.add('danger');
        } else if (state.timeLeft <= 3) {
            dom.timerBar.classList.add('warning');
        }
    }, 1000);

    // Auto time-up
    state.timerTimeout = setTimeout(() => {
        timeUp();
    }, TIME_LIMIT * 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    if (state.timerTimeout) {
        clearTimeout(state.timerTimeout);
        state.timerTimeout = null;
    }
    // Freeze the bar
    const rect = dom.timerBar.getBoundingClientRect();
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = rect.width + 'px';
}

// ==================== NUMPAD ====================

function setNumpadEnabled(enabled) {
    document.querySelectorAll('.numpad-btn').forEach(btn => {
        btn.disabled = !enabled;
    });
}

function handleNumpadClick(e) {
    const btn = e.target.closest('.numpad-btn');
    if (!btn || btn.disabled) return;

    if (btn.dataset.num !== undefined) {
        if (dom.answerInput.value.length < 3) {
            dom.answerInput.value += btn.dataset.num;
        }
    } else if (btn.dataset.action === 'delete') {
        dom.answerInput.value = dom.answerInput.value.slice(0, -1);
    } else if (btn.dataset.action === 'submit') {
        submitAnswer();
    }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    $('btn-start').addEventListener('click', startGame);
    $('btn-begin-round').addEventListener('click', beginRound);

    // Practice round buttons
    document.querySelectorAll('.btn-practice').forEach(btn => {
        btn.addEventListener('click', () => {
            startPractice(parseInt(btn.dataset.round, 10));
        });
    });

    dom.btnSubmit.addEventListener('click', submitAnswer);

    $('numpad').addEventListener('click', handleNumpadClick);

    dom.answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitAnswer();
        }
    });

    // Only allow digits
    dom.answerInput.addEventListener('input', () => {
        dom.answerInput.value = dom.answerInput.value.replace(/[^0-9]/g, '');
    });

    $('btn-next-round').addEventListener('click', nextRound);

    $('btn-restart').addEventListener('click', () => {
        restoreRounds();
        showScreen('screen-start');
    });

    // End Game buttons (multiple across screens)
    document.querySelectorAll('[data-action="end-game"]').forEach(btn => {
        btn.addEventListener('click', endGame);
    });

    // Excel Upload
    $('file-upload').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const statusEl = $('upload-status');
        const btnUpload = $('btn-start-upload');
        statusEl.classList.remove('hidden');
        statusEl.className = 'upload-status';
        statusEl.textContent = 'Reading file...';
        btnUpload.classList.add('hidden');

        try {
            const questions = await parseExcel(file);
            if (questions.length === 0) {
                statusEl.className = 'upload-status upload-error';
                statusEl.textContent = 'No questions found. Use Column A for question, Column B for answer.';
            } else {
                state.pdfQuestions = questions;
                statusEl.className = 'upload-status upload-success';
                statusEl.textContent = '\u2705 Found ' + questions.length + ' questions from "' + file.name + '"';
                btnUpload.classList.remove('hidden');
            }
        } catch (err) {
            statusEl.className = 'upload-status upload-error';
            statusEl.textContent = '\u274C Error reading file. Please try another.';
        }
    });

    $('btn-start-upload').addEventListener('click', startPdfGame);
}

// ==================== INIT ====================

function init() {
    setupEventListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
