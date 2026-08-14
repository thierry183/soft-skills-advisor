// ============================================
// CANVAS RADAR CHART - Pure HTML5 Canvas API
// ============================================

/**
 * Draw a radar/spider chart on canvas
 */
function drawRadarChart() {
    var canvas = document.getElementById('resultsChart');
    if (!canvas) {
        console.warn('Canvas element not found');
        return;
    }
    
    var ctx = canvas.getContext('2d');
    
    var resultsData = localStorage.getItem('quizResults');
    if (!resultsData) {
        ctx.fillStyle = '#8A9AA8';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('No data available. Please complete the quiz', canvas.width/2, canvas.height/2);
        return;
    }
    
    var results = JSON.parse(resultsData);
    
    // Chart configuration
    var categories = ['Communication', 'Critical Thinking', 'Time Management', 'Leadership'];
    var values = categories.map(function(cat) {
        return (results[cat] || 0) / 100;
    });
    var colors = ['#5B7B8A', '#6B7B8D', '#5D8A7A', '#B8986A'];
    
    var width = canvas.width;
    var height = canvas.height;
    var centerX = width / 2;
    var centerY = height / 2;
    var radius = Math.min(width, height) / 2 - 50;
    var levels = 5;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    for (var level = 1; level <= levels; level++) {
        var r = (radius / levels) * level;
        ctx.beginPath();
        for (var i = 0; i < categories.length; i++) {
            var angle = (Math.PI * 2 * i / categories.length) - Math.PI / 2;
            var x = centerX + r * Math.cos(angle);
            var y = centerY + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#D5DDE5';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.fillStyle = '#8A9AA8';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        var labelX = centerX + r * Math.cos(-Math.PI / 2);
        var labelY = centerY + r * Math.sin(-Math.PI / 2);
        ctx.fillText(Math.round((r / radius) * 100) + '%', labelX - 5, labelY);
    }
    
    // Draw axes with labels
    for (var j = 0; j < categories.length; j++) {
        var angle2 = (Math.PI * 2 * j / categories.length) - Math.PI / 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(angle2), centerY + radius * Math.sin(angle2));
        ctx.strokeStyle = '#D0D8E0';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        var labelRadius = radius + 25;
        var labelX = centerX + labelRadius * Math.cos(angle2);
        var labelY = centerY + labelRadius * Math.sin(angle2);
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        var offsetX = 0, offsetY = 0;
        if (j === 0) { offsetY = -15; }
        else if (j === 1) { offsetX = 15; }
        else if (j === 2) { offsetY = 15; }
        else if (j === 3) { offsetX = -15; }
        
        ctx.fillText(categories[j], labelX + offsetX, labelY + offsetY);
    }
    
    // Draw data polygon
    ctx.beginPath();
    for (var k = 0; k < categories.length; k++) {
        var value = values[k] || 0;
        var r2 = radius * Math.min(value, 1);
        var angle3 = (Math.PI * 2 * k / categories.length) - Math.PI / 2;
        var x2 = centerX + r2 * Math.cos(angle3);
        var y2 = centerY + r2 * Math.sin(angle3);
        k === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    
    var gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(91, 123, 138, 0.3)');
    gradient.addColorStop(1, 'rgba(91, 123, 138, 0.08)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.strokeStyle = '#5B7B8A';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // Draw data points
    for (var m = 0; m < categories.length; m++) {
        var value2 = values[m] || 0;
        var r3 = radius * Math.min(value2, 1);
        var angle4 = (Math.PI * 2 * m / categories.length) - Math.PI / 2;
        var x3 = centerX + r3 * Math.cos(angle4);
        var y3 = centerY + r3 * Math.sin(angle4);
        
        ctx.shadowColor = colors[m];
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x3, y3, 7, 0, Math.PI * 2);
        ctx.fillStyle = colors[m];
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(x3, y3, 7, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        var percent = Math.round(value2 * 100);
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        var labelR = r3 + 18;
        var labelX2 = centerX + labelR * Math.cos(angle4);
        var labelY2 = centerY + labelR * Math.sin(angle4);
        ctx.fillText(percent + '%', labelX2, labelY2);
    }
    
    // Center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#8A9AA8';
    ctx.fill();
    
    // Title
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Soft Skills Radar Chart', centerX, height - 10);
    
    // Legend
    var legendX = 15;
    var legendY = 15;
    var legendSpacing = 18;
    
    categories.forEach(function(cat, idx) {
        var yPos = legendY + idx * legendSpacing;
        
        ctx.fillStyle = colors[idx];
        ctx.shadowBlur = 0;
        ctx.fillRect(legendX, yPos, 12, 12);
        ctx.strokeStyle = '#D0D8E0';
        ctx.lineWidth = 1;
        ctx.strokeRect(legendX, yPos, 12, 12);
        
        ctx.fillStyle = '#4A5A6A';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(cat + ': ' + Math.round(values[idx] * 100) + '%', legendX + 16, yPos + 6);
    });
}

// ============================================
// ANIMATE CHART ON LOAD
// ============================================

function animateChart() {
    var canvas = document.getElementById('resultsChart');
    if (!canvas) return;
    
    drawRadarChart();
    
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.8s ease';
    
    setTimeout(function() {
        canvas.style.opacity = '1';
    }, 200);
}

// ============================================
// INITIALIZE CANVAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultsChart')) {
        setTimeout(animateChart, 500);
        
        var resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(drawRadarChart, 300);
        });
    }
});

window.drawRadarChart = drawRadarChart;