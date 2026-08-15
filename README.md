# Soft Skills Advisor

An interactive web application that helps students discover their soft skills profile across four key areas: Communication, Critical Thinking, Time Management, and Leadership.

---

## Live Demo

[https://thierry183.github.io/soft-skills-advisor](https://thierry183.github.io/soft-skills-advisor)

---

## Repository

[https://github.com/thierry183/soft-skills-advisor](https://github.com/thierry183/soft-skills-advisor)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Installation and Setup](#installation-and-setup)
6. [How to Use](#how-to-use)
7. [Interactive Media Features](#interactive-media-features)
8. [Form Validation](#form-validation)
9. [Key Regex Patterns](#key-regex-patterns)
10. [Code Documentation](#code-documentation)
11. [Scoring Logic](#scoring-logic)
12. [Browser Compatibility](#browser-compatibility)
13. [Author](#author)
14. [Module Information](#module-information)
15. [Academic Integrity](#academic-integrity)
16. [Media Sources](#media-sources)
17. [Acknowledgments](#acknowledgments)
18. [Assessment Requirements](#assessment-requirements)
19. [Future Improvements](#future-improvements)
20. [Contact](#contact)

---

## Project Overview

This application was developed as a summative assessment for the Frontend Web Development module (BSc Software Engineering). The tool allows incoming students to reflect on their strengths, interests, and goals to build their Learning Journey Plan.

Users complete a registration form, take an interactive quiz with 13 questions, and receive a detailed results page showing their scores, a radar chart visualization, and personalized recommendations.

### The Four Skills Assessed

| Skill | Description |
|-------|-------------|
| Communication | How effectively you express ideas and connect with others |
| Critical Thinking | Your approach to problem-solving and analysis |
| Time Management | How you handle deadlines and prioritize tasks |
| Leadership | Your ability to guide and inspire others |

---

## Features

### Landing Page
- Welcome section with call-to-action
- Overview of the four skills assessed
- Registration form with real-time validation
- Student email validation using regex pattern (student.id@bse.ac.mu)
- Student ID validation (format: BSE-2024-001)
- Phone number validation (format: +230 5XXX XXXX)
- Full name validation (letters and spaces only)
- Inline error messages displayed below each field
- Visual state toggling (green valid / red invalid borders)

### Quiz Page
- 13 questions covering 4 skill categories
- Progress bar tracking completion
- Question counter (current/total)
- Countdown timer (5 minutes) with warning state at 1 minute
- Auto-submit on timer expiration with visual warning
- Interactive media integration:
  - Image hotspot question (click on image regions)
  - Audio question with custom play/pause/replay controls
  - Video question with automatic pause at designated timestamp
- Navigation buttons (previous/next)
- Submit button on final question
- Unanswered question validation

### Results Page
- Student information display from registration
- Score breakdown by category with percentage bars
- Dynamic radar chart using HTML5 Canvas API
- Personalized recommendations based on scores
- Top strength identification
- Area for improvement identification
- Action buttons:
  - Retake Quiz
  - Get Feedback (Contact page)

### Contact Page
- Developer information section
- GitHub repository link
- Live demo link
- Feedback form with validation
- Subject and message validation
- Success notification on submission

---

## Technologies Used

### Frontend
- HTML5 - Semantic markup and structure
- CSS3 - Responsive design, custom properties, flexbox, grid, animations
- JavaScript ES6+ - Vanilla JavaScript, no frameworks or libraries

### APIs and Web Technologies
- HTML5 Canvas API - Radar chart visualization
- Web Audio API - Custom audio player controls
- HTML5 Video API - Timestamp pause functionality
- LocalStorage API - Data persistence between pages
- DOM API - Dynamic content manipulation

### Development Tools
- Git - Version control
- GitHub - Repository hosting
- GitHub Pages - Live deployment

---

## Project Structure
