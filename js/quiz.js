// ============================================
// QUIZ ENGINE - Questions, Navigation, Scoring
// ============================================

// ============================================
// QUIZ DATA - 10 Questions with Categories
// ============================================

const quizQuestions = [
    {
        id: 1,
        category: 'Communication',
        question: 'When working in a team, how do you typically share your ideas?',
        options: [
            'I speak up immediately and lead discussions',
            'I listen first, then share my thoughts clearly',
            'I write my ideas down and share them later',
            'I prefer to let others lead the conversation'
        ],
        scores: {
            'Communication': 10,
            'Leadership': 5
        }
    },
    {
        id: 2,
        category: 'Communication',
        question: 'How do you handle receiving constructive criticism?',
        options: [
            'I appreciate it and use it to improve',
            'I listen but feel defensive',
            'I ignore it completely',
            'I get upset and discouraged'
        ],
        scores: {
            'Communication': 8,
            'Critical Thinking': 5
        }
    },
    {
        id: 3,
        category: 'Critical Thinking',
        question: 'When faced with a complex problem, what is your first step?',
        options: [
            'Break it down into smaller parts',
            'Research similar problems',
            'Brainstorm multiple solutions',
            'Ask others for their opinion'
        ],
        scores: {
            'Critical Thinking': 10,
            'Communication': 3
        }
    },
    {
        id: 4,
        category: 'Critical Thinking',
        question: 'How do you evaluate the credibility of information?',
        options: [
            'Check multiple reliable sources',
            'Consider the author\'s expertise',
            'Look for evidence and data',
            'Trust my intuition'
        ],
        scores: {
            'Critical Thinking': 10,
            'Communication': 2
        }
    },
    {
        id: 5,
        category: 'Time Management',
        question: 'How do you prioritize multiple tasks with tight deadlines?',
        options: [
            'I use a priority matrix (urgent/important)',
            'I work on the hardest tasks first',
            'I do the easiest tasks first',
            'I ask for help to manage the workload'
        ],
        scores: {
            'Time Management': 10,
            'Leadership': 3
        }
    },
    {
        id: 6,
        category: 'Time Management',
        question: 'How often do you meet your deadlines?',
        options: [
            'Always, I plan ahead effectively',
            'Usually, with minor delays',
            'Sometimes, I struggle',
            'Rarely, I need better time management'
        ],
        scores: {
            'Time Management': 8,
            'Leadership': 2
        }
    },
    {
        id: 7,
        category: 'Leadership',
        question: 'How do you motivate team members who are struggling?',
        options: [
            'I offer support and guidance',
            'I encourage them and recognize their efforts',
            'I delegate tasks to reduce their workload',
            'I step in and do the work myself'
        ],
        scores: {
            'Leadership': 10,
            'Communication': 5
        }
    },
    {
        id: 8,
        category: 'Leadership',
        question: 'How do you handle conflict within a team?',
        options: [
            'I mediate and help find common ground',
            'I let team members resolve it themselves',
            'I make a decision to end the conflict',
            'I avoid the conflict altogether'
        ],
        scores: {
            'Leadership': 10,
            'Communication': 5,
            'Critical Thinking': 5
        }
    },
    {
        id: 9,
        category: 'Communication',
        question: 'How do you ensure your message is understood by others?',
        options: [
            'I ask for feedback and clarify if needed',
            'I use simple and clear language',
            'I provide examples to illustrate my point',
            'I assume others understand me'
        ],
        scores: {
            'Communication': 10,
            'Critical Thinking': 3
        }
    },
    {
        id: 10,
        category: 'Time Management',
        question: 'What tools or methods do you use to manage your time?',
        options: [
            'To-do lists and calendars',
            'Time blocking techniques',
            'Productivity apps',
            'I don\'t use any tools'
        ],
        scores: {
            'Time Management': 8,
            'Leadership': 2
        }
    }
];

// ============================================
// QUIZ STATE
// ============================================

let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = {
    Communication: 0,
    'Critical Thinking': 0,
    'Time Management': 0,
    Leadership: 0
};
let answerCount = {
    Communication: 0,
    'Critical Thinking': 0,
    'Time Management': 0,
    Leadership: 0
};
let quizSubmitted = false;

// ============================================
// QUIZ FUNCTIONS
// ============================================

/**
 * Load a question based on index
 * @param {number} index - The question index to load
 */
function loadQuestion(index) {
    const question = quizQuestions[index];
    if (!question) return;
    
    // Update question text
    const questionText = document.getElementById('questionText');
    if (questionText) {
        questionText.textContent = `Q${index + 1}: ${question.question}`;
    }
    
    // Update question counter
    const currentQ = document.getElementById('currentQuestion');
    const totalQ = document.getElementById('totalQuestions');
    if (currentQ) currentQ.textContent = index + 1;
    if (totalQ) totalQ.textContent = quizQuestions.length;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((index + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Generate options
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        // Find selected answer for this question
        const selectedAnswer = userAnswers[index];
        
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-item';
            if (selectedAnswer === optionIndex) {
                optionDiv.classList.add('selected');
            }
            
            const letter = String.fromCharCode(65 + optionIndex);
            optionDiv.innerHTML = `<span class="option-letter">${letter}.</span> ${option}`;
            
            optionDiv.addEventListener('click', function() {
                selectOption(index, optionIndex);
            });
            
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

/**
 * Select an option for a question
 * @param {number} questionIndex - The question index
 * @param {number} optionIndex - The selected option index
 */
function selectOption(questionIndex, optionIndex) {
    if (quizSubmitted) return;
    
    // Store the answer
    userAnswers[questionIndex] = optionIndex;
    
    // Update UI
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        const options = optionsContainer.querySelectorAll('.option-item');
        options.forEach((opt, idx) => {
            if (idx === optionIndex) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
    
    // Update scores
    updateScores();
    
    // Enable next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = false;
}

/**
 * Update scores based on answers
 */
function updateScores() {
    // Reset scores
    quizScore = {
        Communication: 0,
        'Critical Thinking': 0,
        'Time Management': 0,
        Leadership: 0
    };
    answerCount = {
        Communication: 0,
        'Critical Thinking': 0,
        'Time Management': 0,
        Leadership: 0
    };
    
    // Calculate scores
    userAnswers.forEach((answerIndex, questionIndex) => {
        if (answerIndex === undefined || answerIndex === null) return;
        
        const question = quizQuestions[questionIndex];
        const scores = question.scores;
        
        for (const category in scores) {
            if (scores.hasOwnProperty(category)) {
                quizScore[category] = (quizScore[category] || 0) + scores[category];
                answerCount[category] = (answerCount[category] || 0) + 1;
            }
        }
    });
}

/**
 * Get percentage for a category
 * @param {string} category - The category name
 * @returns {number} - Percentage score
 */
function getCategoryPercentage(category) {
    const maxScore = answerCount[category] * 10 || 1;
    const score = quizScore[category] || 0;
    return Math.round((score / maxScore) * 100);
}

/**
 * Navigate to previous question
 */
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

/**
 * Navigate to next question
 */
function goToNextQuestion() {
    // Check if current question is answered
    if (userAnswers[currentQuestionIndex] === undefined || userAnswers[currentQuestionIndex] === null) {
        showNotification('Please select an answer before continuing', 'error');
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        // Last question, show submit button
        showSubmitButton();
    }
}

/**
 * Show the submit button
 */
function showSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (submitBtn) submitBtn.style.display = 'inline-block';
    if (nextBtn) nextBtn.style.display = 'none';
}

/**
 * Update navigation buttons
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (nextBtn) {
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }
}

/**
 * Submit the quiz
 */
function submitQuiz() {
    // Check if all questions are answered
    const unanswered = [];
    userAnswers.forEach((answer, index) => {
        if (answer === undefined || answer === null) {
            unanswered.push(index + 1);
        }
    });
    
    if (unanswered.length > 0) {
        showNotification(`Please answer questions ${unanswered.join(', ')} before submitting`, 'error');
        return;
    }
    
    // Stop the timer
    if (window.stopTimer) {
        window.stopTimer();
    }
    
    quizSubmitted = true;
    
    // Calculate final scores
    updateScores();
    
    // Get percentages
    const results = {
        Communication: getCategoryPercentage('Communication'),
        'Critical Thinking': getCategoryPercentage('Critical Thinking'),
        'Time Management': getCategoryPercentage('Time Management'),
        Leadership: getCategoryPercentage('Leadership')
    };
    
    // Save results to localStorage
    localStorage.setItem('quizResults', JSON.stringify(results));
    
    showNotification('✅ Quiz submitted! Redirecting to results...', 'success');
    
    // Redirect to results page
    setTimeout(() => {
        window.location.href = 'results.html';
    }, 1500);
}

// ============================================
// INITIALIZE QUIZ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if on quiz page
    if (document.getElementById('questionCard')) {
        // Check if student data exists
        const studentData = localStorage.getItem('studentData');
        if (!studentData) {
            showNotification('Please register first', 'error');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            return;
        }
        
        // Initialize quiz
        userAnswers = new Array(quizQuestions.length);
        currentQuestionIndex = 0;
        loadQuestion(currentQuestionIndex);
        
        // Setup navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', goToPreviousQuestion);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', goToNextQuestion);
        }
        if (submitBtn) {
            submitBtn.addEventListener('click', submitQuiz);
        }
    }
});

// Expose submitQuiz globally for timer
window.submitQuiz = submitQuiz;