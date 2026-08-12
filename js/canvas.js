// ============================================
// CANVAS RADAR CHART - Pure HTML5 Canvas API
// ============================================

/**
 * Draw a radar/spider chart on canvas
 */
function drawRadarChart() {
    const canvas = document.getElementById('resultsChart');
    if (!canvas) {
        console.warn('Canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Get results from localStorage
    const resultsData = localStorage.getItem('quizResults');
    if (!resultsData) {
        ctx.fillStyle = '#8A9AA8';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('No data available. Please complete the quiz', canvas.width/2, canvas.height/2);
        return;
    }
    
    const results = JSON.parse(resultsData);
    
    // ============================================
    // CHART CONFIGURATION
    // ============================================
    
    const categories = ['Communication', 'Critical Thinking', 'Time Management', 'Leadership'];
    const values = categories.map(cat => (results[cat] || 0) / 100);
    const colors = ['#5B7B8A', '#6B7B8D', '#5D8A7A', '#B8986A'];
    const fillColor = 'rgba(91, 123, 138, 0.2)';
    const strokeColor = '#5B7B8A';
    
    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 50;
    const levels = 5;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // ============================================
    // DRAW BACKGROUND GRID
    // ============================================
    
    for (let level = 1; level <= levels; level++) {
        const r = (radius / levels) * level;
        ctx.beginPath();
        for (let i = 0; i < categories.length; i++) {
            const angle = (Math.PI * 2 * i / categories.length) - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#D5DDE5';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw percentage labels
        ctx.fillStyle = '#8A9AA8';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const labelX = centerX + r * Math.cos(-Math.PI / 2);
        const labelY = centerY + r * Math.sin(-Math.PI / 2);
        ctx.fillText(`${Math.round((r / radius) * 100)}%`, labelX - 5, labelY);
    }
    
    // ============================================
    // DRAW AXES WITH CATEGORY LABELS
    // ============================================
    
    for (let i = 0; i < categories.length; i++) {
        const angle = (Math.PI * 2 * i / categories.length) - Math.PI / 2;
        
        // Draw axis line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
        ctx.strokeStyle = '#D0D8E0';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw category labels
        const labelRadius = radius + 25;
        const labelX = centerX + labelRadius * Math.cos(angle);
        const labelY = centerY + labelRadius * Math.sin(angle);
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Adjust text position for better readability
        let offsetX = 0, offsetY = 0;
        if (i === 0) { offsetY = -15; }
        else if (i === 1) { offsetX = 15; }
        else if (i === 2) { offsetY = 15; }
        else if (i === 3) { offsetX = -15; }
        
        ctx.fillText(categories[i], labelX + offsetX, labelY + offsetY);
    }
    
    // ============================================
    // DRAW DATA POLYGON
    // ============================================
    
    ctx.beginPath();
    for (let i = 0; i < categories.length; i++) {
        const value = values[i] || 0;
        const r = radius * Math.min(value, 1);
        const angle = (Math.PI * 2 * i / categories.length) - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(91, 123, 138, 0.3)');
    gradient.addColorStop(1, 'rgba(91, 123, 138, 0.08)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke the polygon
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // ============================================
    // DRAW DATA POINTS
    // ============================================
    
    for (let i = 0; i < categories.length; i++) {
        const value = values[i] || 0;
        const r = radius * Math.min(value, 1);
        const angle = (Math.PI * 2 * i / categories.length) - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        // Draw point with glow
        ctx.shadowColor = colors[i];
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // White border
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw percentage value near point
        const percent = Math.round(value * 100);
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        const labelR = r + 18;
        const labelX = centerX + labelR * Math.cos(angle);
        const labelY = centerY + labelR * Math.sin(angle);
        ctx.fillText(`${percent}%`, labelX, labelY);
    }
    
    // ============================================
    // DRAW CENTER POINT
    // ============================================
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#8A9AA8';
    ctx.fill();
    
    // ============================================
    // ADD TITLE
    // ============================================
    
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('📊 Soft Skills Radar Chart', centerX, height - 10);
    
    // ============================================
    // DRAW LEGEND
    // ============================================
    
    const legendX = 15;
    const legendY = 15;
    const legendSpacing = 18;
    
    categories.forEach((cat, i) => {
        const yPos = legendY + i * legendSpacing;
        
        // Color box
        ctx.fillStyle = colors[i];
        ctx.shadowBlur = 0;
        ctx.fillRect(legendX, yPos, 12, 12);
        ctx.strokeStyle = '#D0D8E0';
        ctx.lineWidth = 1;
        ctx.strokeRect(legendX, yPos, 12, 12);
        
        // Label
        ctx.fillStyle = '#4A5A6A';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${cat}: ${Math.round(values[i] * 100)}%`, legendX + 16, yPos + 6);
    });
}

// ============================================
// ANIMATE CHART ON LOAD
// ============================================

function animateChart() {
    const canvas = document.getElementById('resultsChart');
    if (!canvas) return;
    
    // Draw initial chart
    drawRadarChart();
    
    // Add fade-in animation
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        canvas.style.opacity = '1';
    }, 200);
}

// ============================================
// INITIALIZE CANVAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultsChart')) {
        // Wait for results to load
        setTimeout(animateChart, 500);
        
        // Redraw on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(drawRadarChart, 300);
        });
    }
});

// Export for use in results page
window.drawRadarChart = drawRadarChart;