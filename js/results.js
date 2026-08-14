// ============================================
// RESULTS PAGE - Display Scores & Recommendations
// ============================================

// ============================================
// RECOMMENDATION DATA
// ============================================

var recommendations = {
    Communication: {
        high: 'Excellent! You have strong communication skills. Consider roles in: Team Leadership, Project Management, Client Relations, or Teaching.',
        medium: 'Good communication skills. Focus on: Active listening, Public speaking practice, and Written communication workshops.',
        low: 'Develop your communication skills by: Joining a debate club, Practicing presentations, Writing daily journals, and Seeking feedback on your communication style.'
    },
    'Critical Thinking': {
        high: 'Outstanding critical thinker! You excel at: Problem Analysis, Strategic Planning, Research, and Decision Making.',
        medium: 'Solid critical thinking foundation. Work on: Analyzing case studies, Playing strategy games, and Practicing root cause analysis.',
        low: 'Strengthen critical thinking by: Reading diverse perspectives, Solving puzzles and riddles, Asking "why" more often, and Learning to question assumptions.'
    },
    'Time Management': {
        high: 'Excellent time manager! You\'re ready for: Project Management, Agile Development, and Leadership roles.',
        medium: 'Good time management habits. Try: Using time-blocking techniques, Setting SMART goals, and Using productivity apps like Trello or Asana.',
        low: 'Build time management skills: Start with to-do lists, Use the Pomodoro technique, Set daily priorities, and Learn to say "no" to non-essential tasks.'
    },
    Leadership: {
        high: 'Natural leader! You\'re equipped for: Management roles, Team Leadership, Mentoring, and Strategic Planning.',
        medium: 'Developing leadership skills. Focus on: Taking initiative, Delegating effectively, Building trust, and Inspiring others through your actions.',
        low: 'Start your leadership journey: Volunteer for team projects, Lead small groups, Read leadership books, and Seek mentorship from experienced leaders.'
    }
};

// ============================================
// GET DATA FROM LOCALSTORAGE
// ============================================

function getResults() {
    var resultsData = localStorage.getItem('quizResults');
    if (!resultsData) return null;
    return JSON.parse(resultsData);
}

function getStudentData() {
    var studentData = localStorage.getItem('studentData');
    if (!studentData) return null;
    return JSON.parse(studentData);
}

// ============================================
// DISPLAY RESULTS
// ============================================

function displayResults() {
    var results = getResults();
    if (!results) {
        document.querySelector('.results-container').innerHTML = `
            <div class="container">
                <h1>No Results Found</h1>
                <p style="text-align:center; color: var(--text-light);">Please complete the quiz first.</p>
                <div style="text-align:center; margin-top: 1rem;">
                    <a href="quiz.html" class="btn-primary">Take Quiz</a>
                </div>
            </div>
        `;
        return;
    }
    
    var student = getStudentData();
    var studentInfo = document.getElementById('studentInfo');
    if (studentInfo && student) {
        studentInfo.innerHTML = `
            <p><strong>Student:</strong> ${student.fullName}</p>
            <p><strong>Email:</strong> ${student.studentEmail}</p>
            <p><strong>ID:</strong> ${student.studentId}</p>
        `;
    }
    
    var categories = ['Communication', 'Critical Thinking', 'Time Management', 'Leadership'];
    var colors = ['#5B7B8A', '#6B7B8D', '#5D8A7A', '#B8986A'];
    
    var scoreIds = {
        'Communication': 'commScore',
        'Critical Thinking': 'criticalScore',
        'Time Management': 'timeScore',
        'Leadership': 'leadershipScore'
    };
    
    var barIds = {
        'Communication': 'commBar',
        'Critical Thinking': 'criticalBar',
        'Time Management': 'timeBar',
        'Leadership': 'leadershipBar'
    };
    
    categories.forEach(function(category, index) {
        var score = results[category] || 0;
        var scoreId = scoreIds[category];
        var barId = barIds[category];
        
        var scoreEl = document.getElementById(scoreId);
        var barEl = document.getElementById(barId);
        
        if (scoreEl) {
            scoreEl.textContent = score + '%';
            scoreEl.style.color = colors[index];
        }
        if (barEl) {
            barEl.style.width = score + '%';
            barEl.style.background = colors[index];
        }
    });
    
    generateRecommendations(results);
    
    if (typeof drawRadarChart === 'function') {
        setTimeout(drawRadarChart, 300);
    }
}

// ============================================
// GENERATE RECOMMENDATIONS
// ============================================

function generateRecommendations(results) {
    var container = document.getElementById('recommendationText');
    if (!container) return;
    
    var html = '';
    
    var sortedCategories = Object.keys(results).sort(function(a, b) {
        return results[b] - results[a];
    });
    
    var topCategory = sortedCategories[0];
    var bottomCategory = sortedCategories[sortedCategories.length - 1];
    
    var avgScore = Object.values(results).reduce(function(a, b) {
        return a + b;
    }, 0) / Object.keys(results).length;
    
    var overallMessage = '';
    if (avgScore >= 80) {
        overallMessage = 'Outstanding overall! You have a well-rounded skillset.';
    } else if (avgScore >= 60) {
        overallMessage = 'Good foundation! You have clear strengths to build on.';
    } else {
        overallMessage = 'Great starting point! Focus on developing your skills systematically.';
    }
    
    html += '<div class="recommendation-item"><strong>Overall Assessment:</strong> ' + overallMessage + '</div>';
    
    if (topCategory && results[topCategory] >= 60) {
        var topRec = recommendations[topCategory];
        var level = results[topCategory] >= 80 ? 'high' : results[topCategory] >= 60 ? 'medium' : 'low';
        html += '<div class="recommendation-item"><strong>Your Greatest Strength (' + topCategory + '):</strong> ' + topRec[level] + '</div>';
    }
    
    if (bottomCategory && results[bottomCategory] < 60) {
        var bottomRec = recommendations[bottomCategory];
        var level = results[bottomCategory] >= 40 ? 'medium' : 'low';
        html += '<div class="recommendation-item"><strong>Focus Area (' + bottomCategory + '):</strong> ' + bottomRec[level] + '</div>';
    }
    
    html += '<div class="recommendation-item"><strong>Detailed Breakdown:</strong></div>';
    
    Object.keys(results).forEach(function(category) {
        var score = results[category];
        var rec = recommendations[category];
        var level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
        
        html += `
            <div class="recommendation-item">
                <strong>${category}:</strong> ${score}% 
                <br>${rec[level]}
            </div>
        `;
    });
    
    html += `
        <div class="recommendation-item" style="border-left-color: #6B7B8D;">
            <strong>Recommended Next Steps:</strong>
            <ol>
                <li>Focus on developing your <strong>${bottomCategory}</strong> skills</li>
                <li>Leverage your strength in <strong>${topCategory}</strong> in your projects</li>
                <li>Seek opportunities to practice all skills through internships and team projects</li>
                <li>Consider courses or workshops that align with your development goals</li>
            </ol>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// INITIALIZE RESULTS PAGE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultsChart')) {
        displayResults();
    }
});