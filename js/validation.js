// ============================================
// FORM VALIDATION - Regex & Inline Validation
// ============================================

// ============================================
// REGEX PATTERNS
// ============================================

const regexPatterns = {
    // Student email: student.id@bse.ac.mu
    studentEmail: /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@bse\.ac\.mu$/,
    
    // Full name: Letters and spaces only, 2-50 chars
    fullName: /^[a-zA-Z\s]{2,50}$/,
    
    // Student ID: BSE-YYYY-NNN
    studentId: /^[A-Z]{3,4}-\d{4}-\d{3}$/,
    
    // Phone: +230 5XXX XXXX
    phoneNumber: /^\+230\s?[5-8]\d{3}\s?\d{4}$/,
    
    // General email
    contactEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    // Subject: 3-100 chars
    subject: /^.{3,100}$/,
    
    // Message: 10-500 chars
    message: /^.{10,500}$/
};

// ============================================
// VALIDATE SINGLE FIELD
// ============================================

/**
 * Validates a single input field with inline error display
 * @param {HTMLInputElement} input - The input element to validate
 * @param {RegExp} pattern - The regex pattern to test against
 * @param {string} errorMessage - Custom error message to display
 * @returns {boolean} - True if valid, false otherwise
 */
function validateField(input, pattern, errorMessage) {
    const errorElement = document.getElementById(input.id + 'Error');
    
    if (!errorElement) return false;
    
    const value = input.value.trim();
    const isValid = pattern.test(value);
    
    if (isValid) {
        input.className = 'is-valid';
        errorElement.textContent = '✅ Valid';
        errorElement.style.color = '#5D8A7A';
    } else {
        input.className = 'is-invalid';
        errorElement.textContent = errorMessage || 'Invalid input';
        errorElement.style.color = '#C47A7A';
    }
    
    return isValid;
}

// ============================================
// REGISTRATION FORM
// ============================================

function setupRegistrationValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const fullName = document.getElementById('fullName');
    const studentEmail = document.getElementById('studentEmail');
    const studentId = document.getElementById('studentId');
    const phoneNumber = document.getElementById('phoneNumber');
    
    // Real-time validation on input
    if (fullName) {
        fullName.addEventListener('input', function() {
            validateField(this, regexPatterns.fullName, 'Letters and spaces only (2-50 chars)');
        });
        fullName.addEventListener('blur', function() {
            validateField(this, regexPatterns.fullName, 'Letters and spaces only (2-50 chars)');
        });
    }
    
    if (studentEmail) {
        studentEmail.addEventListener('input', function() {
            validateField(this, regexPatterns.studentEmail, 'Use: student.id@bse.ac.mu');
        });
        studentEmail.addEventListener('blur', function() {
            validateField(this, regexPatterns.studentEmail, 'Use: student.id@bse.ac.mu');
        });
    }
    
    if (studentId) {
        studentId.addEventListener('input', function() {
            validateField(this, regexPatterns.studentId, 'Use: BSE-2024-001');
        });
        studentId.addEventListener('blur', function() {
            validateField(this, regexPatterns.studentId, 'Use: BSE-2024-001');
        });
    }
    
    if (phoneNumber) {
        phoneNumber.addEventListener('input', function() {
            validateField(this, regexPatterns.phoneNumber, 'Use: +230 5XXX XXXX');
        });
        phoneNumber.addEventListener('blur', function() {
            validateField(this, regexPatterns.phoneNumber, 'Use: +230 5XXX XXXX');
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(fullName, regexPatterns.fullName, 'Enter a valid name');
        const isEmailValid = validateField(studentEmail, regexPatterns.studentEmail, 'Enter a valid BSE email');
        const isIdValid = validateField(studentId, regexPatterns.studentId, 'Use: BSE-2024-001');
        const isPhoneValid = validateField(phoneNumber, regexPatterns.phoneNumber, 'Use: +230 5XXX XXXX');
        
        if (isNameValid && isEmailValid && isIdValid && isPhoneValid) {
            const studentData = {
                fullName: fullName.value.trim(),
                studentEmail: studentEmail.value.trim(),
                studentId: studentId.value.trim(),
                phoneNumber: phoneNumber.value.trim()
            };
            localStorage.setItem('studentData', JSON.stringify(studentData));
            
            showNotification('✅ Registration successful! Redirecting to quiz...', 'success');
            
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 1500);
        } else {
            showNotification('❌ Please fix all errors before continuing', 'error');
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================

function setupContactValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactSubject = document.getElementById('contactSubject');
    const contactMessage = document.getElementById('contactMessage');
    
    // Real-time validation
    if (contactName) {
        contactName.addEventListener('input', function() {
            validateField(this, regexPatterns.fullName, 'Letters and spaces only');
        });
        contactName.addEventListener('blur', function() {
            validateField(this, regexPatterns.fullName, 'Letters and spaces only');
        });
    }
    
    if (contactEmail) {
        contactEmail.addEventListener('input', function() {
            validateField(this, regexPatterns.contactEmail, 'Enter a valid email');
        });
        contactEmail.addEventListener('blur', function() {
            validateField(this, regexPatterns.contactEmail, 'Enter a valid email');
        });
    }
    
    if (contactSubject) {
        contactSubject.addEventListener('input', function() {
            validateField(this, regexPatterns.subject, 'At least 3 characters');
        });
        contactSubject.addEventListener('blur', function() {
            validateField(this, regexPatterns.subject, 'At least 3 characters');
        });
    }
    
    if (contactMessage) {
        contactMessage.addEventListener('input', function() {
            validateField(this, regexPatterns.message, 'At least 10 characters');
        });
        contactMessage.addEventListener('blur', function() {
            validateField(this, regexPatterns.message, 'At least 10 characters');
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(contactName, regexPatterns.fullName, 'Enter a valid name');
        const isEmailValid = validateField(contactEmail, regexPatterns.contactEmail, 'Enter a valid email');
        const isSubjectValid = validateField(contactSubject, regexPatterns.subject, 'At least 3 characters');
        const isMessageValid = validateField(contactMessage, regexPatterns.message, 'At least 10 characters');
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            showNotification('✅ Thank you for your feedback!', 'success');
            form.reset();
            
            [contactName, contactEmail, contactSubject, contactMessage].forEach(input => {
                if (input) {
                    input.className = '';
                    const errorEl = document.getElementById(input.id + 'Error');
                    if (errorEl) errorEl.textContent = '';
                }
            });
        } else {
            showNotification('❌ Please fix all errors before submitting', 'error');
        }
    });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    setupRegistrationValidation();
    setupContactValidation();
});