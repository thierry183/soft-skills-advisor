// ============================================
// QUIZ ENGINE - Questions, Navigation, Scoring
// ============================================

// ============================================
// QUIZ DATA - Questions (10 Regular + 3 Media)
// ============================================

const quizQuestions = [
    // ============================================
    // REGULAR QUESTIONS (1-10)
    // ============================================
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
    },
    
    // ============================================
    // INTERACTIVE MEDIA QUESTION 1: IMAGE HOTSPOT
    // ============================================
    {
        id: 11,
        category: 'Communication',
        question: 'Click the letter that represents your communication style:',
        type: 'hotspot',
        image: 'assets/pic.jpg',
        hotspots: [
            { x: 20, y: 30, label: 'A', text: 'Presenting to large groups', score: { Communication: 10, Leadership: 8 } },
            { x: 50, y: 20, label: 'B', text: 'One-on-one conversations', score: { Communication: 8, 'Critical Thinking': 5 } },
            { x: 70, y: 50, label: 'C', text: 'Writing and documentation', score: { Communication: 6, 'Critical Thinking': 8 } },
            { x: 40, y: 70, label: 'D', text: 'Leading team meetings', score: { Communication: 7, Leadership: 10 } }
        ],
        scores: {}
    },
    
    // ============================================
    // INTERACTIVE MEDIA QUESTION 2: AUDIO
    // ============================================
    {
        id: 12,
        category: 'Communication',
        question: 'Listen to the audio carefully and select good answer:',
        type: 'audio',
        audio: 'assets/audio.m4a',
        options: [
            'The speaker is confident and clear',
            'the speaker\'s voice is a bit nervous but well-prepared',
            'The speaker is disorganized',
            'This speaker did not prepare and he is struggling to deliver'
        ],
        scores: {
            'Communication': 10,
            'Critical Thinking': 5
        }
    },
    
    // ============================================
    // INTERACTIVE MEDIA QUESTION 3: VIDEO (SIMPLE)
    // ============================================
    {
        id: 13,
        category: 'Critical Thinking',
        question: 'Watch the video and answer the question:',
        type: 'video',
        video: 'assets/v.mp4',
        videoQuestion: 'What is being practiced in this video?',
        options: [
            'Taking immediate action to resolve the issue',
            'Consulting with the team to see how the conflict can be solved',
            'Only shouting at one another',
            'Asking for time off to recover from conflict'
        ],
        scores: {
            'Critical Thinking': 10,
            'Leadership': 5
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
        questionText.textContent = 'Q' + (index + 1) + ': ' + question.question;
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
        progressBar.style.width = progress + '%';
    }
    
    // Clear media section
    const mediaSection = document.getElementById('mediaSection');
    if (mediaSection) mediaSection.innerHTML = '';
    
    // Check question type and render accordingly
    if (question.type === 'hotspot') {
        document.getElementById('optionsContainer').style.display = 'none';
        renderHotspotQuestion(question);
    } else if (question.type === 'audio') {
        document.getElementById('optionsContainer').style.display = 'flex';
        renderAudioQuestion(question);
        generateOptions(question, index);
    } else if (question.type === 'video') {
        document.getElementById('optionsContainer').style.display = 'flex';
        renderVideoQuestion(question);
        generateOptions(question, index);
    } else {
        document.getElementById('optionsContainer').style.display = 'flex';
        generateOptions(question, index);
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

/**
 * Generate options for regular questions
 */
function generateOptions(question, index) {
    const optionsContainer = document.getElementById('optionsContainer');
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';
    
    const selectedAnswer = userAnswers[index];
    
    question.options.forEach(function(option, optionIndex) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        if (selectedAnswer === optionIndex) {
            optionDiv.classList.add('selected');
        }
        
        const letter = String.fromCharCode(65 + optionIndex);
        optionDiv.innerHTML = '<span class="option-letter">' + letter + '.</span> ' + option;
        
        optionDiv.addEventListener('click', function() {
            selectOption(index, optionIndex);
        });
        
        optionsContainer.appendChild(optionDiv);
    });
}

/**
 * Select an option for a question
 */
function selectOption(questionIndex, optionIndex) {
    if (quizSubmitted) return;
    
    userAnswers[questionIndex] = optionIndex;
    
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        const options = optionsContainer.querySelectorAll('.option-item');
        options.forEach(function(opt, idx) {
            if (idx === optionIndex) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
    
    updateScores();
}

/**
 * Update scores based on answers
 */
function updateScores() {
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
    
    userAnswers.forEach(function(answer, questionIndex) {
        if (answer === undefined || answer === null) return;
        
        const question = quizQuestions[questionIndex];
        
        // Handle hotspot answers (they have scores object)
        if (typeof answer === 'object' && answer.scores) {
            for (var category in answer.scores) {
                if (answer.scores.hasOwnProperty(category)) {
                    quizScore[category] = (quizScore[category] || 0) + answer.scores[category];
                    answerCount[category] = (answerCount[category] || 0) + 1;
                }
            }
            return;
        }
        
        // Handle regular answers
        const scores = question.scores;
        for (var cat in scores) {
            if (scores.hasOwnProperty(cat)) {
                quizScore[cat] = (quizScore[cat] || 0) + scores[cat];
                answerCount[cat] = (answerCount[cat] || 0) + 1;
            }
        }
    });
}

/**
 * Get percentage for a category
 */
function getCategoryPercentage(category) {
    var maxScore = answerCount[category] * 10 || 1;
    var score = quizScore[category] || 0;
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
        showSubmitButton();
    }
}

/**
 * Show the submit button
 */
function showSubmitButton() {
    var submitBtn = document.getElementById('submitBtn');
    var nextBtn = document.getElementById('nextBtn');
    
    if (submitBtn) submitBtn.style.display = 'inline-block';
    if (nextBtn) nextBtn.style.display = 'none';
}

/**
 * Update navigation buttons
 */
function updateNavigationButtons() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var submitBtn = document.getElementById('submitBtn');
    
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
    var unanswered = [];
    userAnswers.forEach(function(answer, index) {
        if (answer === undefined || answer === null) {
            unanswered.push(index + 1);
        }
    });
    
    if (unanswered.length > 0) {
        showNotification('Please answer questions ' + unanswered.join(', ') + ' before submitting', 'error');
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
    var results = {
        Communication: getCategoryPercentage('Communication'),
        'Critical Thinking': getCategoryPercentage('Critical Thinking'),
        'Time Management': getCategoryPercentage('Time Management'),
        Leadership: getCategoryPercentage('Leadership')
    };
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    
    showNotification('Quiz submitted! Redirecting to results...', 'success');
    
    setTimeout(function() {
        window.location.href = 'results.html';
    }, 1500);
}

// ============================================
// MEDIA RENDER FUNCTIONS
// ============================================

/**
 * Render a hotspot question
 */
function renderHotspotQuestion(question) {
    var container = document.getElementById('mediaSection');
    if (!container) return;
    
    var hotspotsHTML = '';
    question.hotspots.forEach(function(spot, index) {
        hotspotsHTML += `
            <div class="hotspot" 
                 id="hotspot-${index}"
                 style="left: ${spot.x}%; top: ${spot.y}%;"
                 data-index="${index}"
                 data-score='${JSON.stringify(spot.score)}'>
                ${spot.label}
            </div>
        `;
    });
    
    container.innerHTML = `
        <div class="media-container">
            <h3>Click on the area that best describes you</h3>
            <div class="hotspot-container" id="hotspotContainer">
                <img src="${question.image}" alt="Interactive image" style="max-width: 100%; border-radius: 8px;">
                ${hotspotsHTML}
            </div>
            <p id="hotspotFeedback" style="margin-top: 0.5rem; font-weight: 600; color: var(--text-medium);">
                Click a hotspot to select your answer
            </p>
        </div>
    `;
    
    question.hotspots.forEach(function(spot, index) {
        var el = document.getElementById('hotspot-' + index);
        if (el) {
            el.addEventListener('click', function() {
                document.querySelectorAll('.hotspot').forEach(function(h) {
                    h.classList.remove('selected');
                });
                this.classList.add('selected');
                
                var questionIndex = currentQuestionIndex;
                userAnswers[questionIndex] = {
                    type: 'hotspot',
                    selected: index,
                    scores: spot.score
                };
                
                document.getElementById('hotspotFeedback').textContent = 'Selected: ' + spot.text;
                document.getElementById('hotspotFeedback').style.color = '#5D8A7A';
                
                updateScores();
            });
        }
    });
}

/**
 * Render an audio question
 */
function renderAudioQuestion(question) {
    var container = document.getElementById('mediaSection');
    if (!container) return;
    
    container.innerHTML = `
        <div class="media-container">
            <h3>Listen to the audio clip</h3>
            <audio id="audioPlayer" src="${question.audio}"></audio>
            <div class="media-controls">
                <button class="play-btn" id="playAudio">Play</button>
                <button class="pause-btn" id="pauseAudio">Pause</button>
                <button class="replay-btn" id="replayAudio">Replay</button>
            </div>
            <div id="audioStatus" style="margin-top: 0.5rem; font-weight: 600; color: var(--text-medium);">
                Click play to listen
            </div>
        </div>
    `;
    
    var audio = document.getElementById('audioPlayer');
    var status = document.getElementById('audioStatus');
    
    document.getElementById('playAudio').addEventListener('click', function() {
        audio.play();
        status.textContent = 'Playing...';
        status.style.color = '#5D8A7A';
    });
    
    document.getElementById('pauseAudio').addEventListener('click', function() {
        audio.pause();
        status.textContent = 'Paused';
        status.style.color = '#B8986A';
    });
    
    document.getElementById('replayAudio').addEventListener('click', function() {
        audio.currentTime = 0;
        audio.play();
        status.textContent = 'Replaying...';
        status.style.color = '#5B7B8A';
    });
    
    audio.addEventListener('ended', function() {
        status.textContent = 'Audio finished - Select your answer below';
        status.style.color = '#5D8A7A';
    });
}

/**
 * Render a video question - SIMPLE VERSION
 */
function renderVideoQuestion(question) {
    var container = document.getElementById('mediaSection');
    if (!container) return;
    
    container.innerHTML = `
        <div class="media-container">
            <h3>Watch the video</h3>
            <video id="videoPlayer" src="${question.video}" controls style="width: 100%; max-width: 600px; border-radius: 8px;"></video>
            <div id="videoStatus" style="margin-top: 0.5rem; font-weight: 600; color: var(--text-medium);">
                Click play to watch the video
            </div>
        </div>
    `;
    
    var video = document.getElementById('videoPlayer');
    var status = document.getElementById('videoStatus');
    
    video.addEventListener('play', function() {
        status.textContent = 'Watching video...';
        status.style.color = '#5B7B8A';
    });
    
    video.addEventListener('pause', function() {
        status.textContent = 'Video paused';
        status.style.color = '#B8986A';
    });
    
    video.addEventListener('ended', function() {
        status.textContent = 'Video finished - Select your answer below';
        status.style.color = '#5D8A7A';
    });
}

// ============================================
// INITIALIZE QUIZ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('questionCard')) {
        var studentData = localStorage.getItem('studentData');
        if (!studentData) {
            showNotification('Please register first', 'error');
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
            return;
        }
        
        userAnswers = new Array(quizQuestions.length);
        currentQuestionIndex = 0;
        loadQuestion(currentQuestionIndex);
        
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        var submitBtn = document.getElementById('submitBtn');
        
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

window.submitQuiz = submitQuiz;