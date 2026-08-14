// ============================================
// COUNTDOWN TIMER - setInterval/clearInterval
// ============================================

// ============================================
// TIMER STATE
// ============================================

let timeLeft = 300; // 5 minutes (300 seconds)
let timerId = null;
let isTimerRunning = false;
let isTimerExpired = false;

// ============================================
// TIMER FUNCTIONS
// ============================================

/**
 * Start the countdown timer
 */
function startTimer() {
    if (isTimerRunning) return;
    
    const timerDisplay = document.getElementById('timerDisplay');
    if (!timerDisplay) {
        console.warn('Timer display element not found');
        return;
    }
    
    isTimerRunning = true;
    
    timerId = setInterval(() => {
        timeLeft--;
        
        // Update display
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Change color when less than 1 minute
        if (timeLeft <= 60) {
            timerDisplay.classList.add('warning');
        }
        
        // Handle timeout
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            isTimerRunning = false;
            isTimerExpired = true;
            timerDisplay.textContent = '00:00';
            handleTimerExpired();
        }
    }, 1000);
}

/**
 * Stop the timer
 */
function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        isTimerRunning = false;
    }
}

/**
 * Handle timer expiration
 */
function handleTimerExpired() {
    showNotification('Time is up! Auto-submitting your quiz...', 'error');
    
    // Lock quiz controls
    const options = document.querySelectorAll('.option-item');
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        opt.style.opacity = '0.6';
    });
    
    // Disable navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    
    // Auto-submit after 2 seconds
    setTimeout(() => {
        if (typeof submitQuiz === 'function') {
            submitQuiz();
        }
    }, 2000);
}

/**
 * Reset the timer
 */
function resetTimer() {
    stopTimer();
    timeLeft = 300;
    isTimerExpired = false;
    
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.textContent = '05:00';
        timerDisplay.classList.remove('warning');
    }
}

/**
 * Get remaining time in seconds
 * @returns {number} - Remaining time in seconds
 */
function getRemainingTime() {
    return timeLeft;
}

// ============================================
// INITIALIZE TIMER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Start timer if on quiz page
    if (document.getElementById('timerDisplay')) {
        startTimer();
    }
});

// Expose functions globally
window.stopTimer = stopTimer;
window.getRemainingTime = getRemainingTime;
window.resetTimer = resetTimer;