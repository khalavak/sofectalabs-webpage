(function() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = "true";

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const WAVE_COLOR = 'rgba(34, 197, 94,'; // Terminal Green
    const LINE_COLOR = 'rgba(255, 95, 86,'; // Tactical Red
    const INTERSECT_COLOR = '#f97316';       // Sofecta Orange

    // 1. Sine Wave Configuration with Fluctuating Amplitude
    const waves = [
        { y: 0.3, amp: 100, freq: 0.006, speed: 0.8, fluctFreq: 0.002, fluctSpeed: 0.1, color: WAVE_COLOR + ' 0.3)' },
        { y: 0.35, amp: 60, freq: 0.012, speed: -0.5, fluctFreq: 0.004, fluctSpeed: 0.15, color: WAVE_COLOR + ' 0.2)' },
        { y: 0.25, amp: 30, freq: 0.02, speed: 1.2, fluctFreq: 0.006, fluctSpeed: 0.2, color: WAVE_COLOR + ' 0.15)' }
    ];
    let waveOffset = 0;

    // 2. Angled Scanning Lines
    let lines = [];
    const maxLines = 12;

    function createLine() {
        const angle = (Math.random() * 0.4 - 0.2) + (Math.random() > 0.5 ? 0 : Math.PI); // Primarily horizontal-ish for better wave traversal
        const moveAngle = angle + (Math.PI / 2);
        const speed = 1.5 + Math.random() * 3.0;
        let x, y;
        
        // Start from off-screen
        if (Math.random() > 0.5) {
            x = Math.random() > 0.5 ? -200 : width + 200;
            y = Math.random() * height;
        } else {
            x = Math.random() * width;
            y = Math.random() > 0.5 ? -200 : height + 200;
        }
        
        return {
            x1: x, y1: y,
            angle: angle,
            moveAngle: moveAngle,
            speed: speed,
            opacity: 0.15 + Math.random() * 0.2,
            length: Math.max(width, height) * 2.5
        };
    }

    for(let i=0; i<maxLines; i++) lines.push(createLine());

    function getLineEndpoints(l) {
        return {
            x1: l.x1, y1: l.y1,
            x2: l.x1 + Math.cos(l.angle) * l.length,
            y2: l.y1 + Math.sin(l.angle) * l.length
        };
    }

    function calculateWaveY(x, w, offset) {
        // Fluctuating amplitude logic: Amp varies along X and Time
        const fluct = 0.5 + 0.5 * Math.sin(x * w.fluctFreq + offset * w.fluctSpeed);
        return height * w.y + Math.sin(x * w.freq + offset * w.speed) * (w.amp * fluct);
    }

    function drawSineWaves() {
        waveOffset += 0.05;
        const wavePoints = [];
        
        waves.forEach(w => {
            ctx.beginPath();
            ctx.strokeStyle = w.color;
            ctx.lineWidth = 1.5;
            const points = [];
            for (let x = 0; x < width; x += 4) {
                const y = calculateWaveY(x, w, waveOffset);
                points.push({x, y});
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            wavePoints.push(points);
        });

        // Bright green wave-wave intersections, small radius
        ctx.save();
        ctx.fillStyle = '#22c55e'; // Bright green
        for (let xIdx = 0; xIdx < wavePoints[0].length; xIdx++) {
            const x = wavePoints[0][xIdx].x;
            for (let i = 0; i < waves.length; i++) {
                for (let j = i + 1; j < waves.length; j++) {
                    if (Math.abs(wavePoints[i][xIdx].y - wavePoints[j][xIdx].y) < 2) {
                        ctx.beginPath();
                        ctx.arc(x, (wavePoints[i][xIdx].y + wavePoints[j][xIdx].y) / 2, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }
        ctx.restore();

        return wavePoints;
    }

    function updateAndDrawLines() {
        const activeLines = [];
        lines.forEach((l, i) => {
            l.x1 += Math.cos(l.moveAngle) * l.speed;
            l.y1 += Math.sin(l.moveAngle) * l.speed;

            const distToCenter = Math.sqrt(Math.pow(l.x1 - width/2, 2) + Math.pow(l.y1 - height/2, 2));
            if (distToCenter > Math.max(width, height) * 3) {
                lines[i] = createLine();
            }

            const p = getLineEndpoints(l);
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR + ` ${l.opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x1, p.y1);
            ctx.lineTo(p.x2, p.y2);
            ctx.stroke();
            activeLines.push(p);
        });
        return activeLines;
    }

    function drawIntersections(wavePoints, activeLines) {
        // 1. Wave-Line Intersections (The Orange Highlight)
        ctx.fillStyle = INTERSECT_COLOR;
        
        activeLines.forEach(l => {
            // Slope-intercept form: y = mx + c
            const dx = l.x2 - l.x1;
            const dy = l.y2 - l.y1;
            if (Math.abs(dx) < 0.01) return; // Skip vertical-ish lines for simplicity here
            
            const m = dy / dx;
            const c = l.y1 - m * l.x1;

            waves.forEach(w => {
                // Check points along the wave
                // To optimize, we only check x range of visible screen
                for (let x = 0; x < width; x += 10) { 
                    const waveY = calculateWaveY(x, w, waveOffset);
                    const lineY = m * x + c;
                    
                    if (Math.abs(waveY - lineY) < 3) {
                        ctx.beginPath();
                        ctx.arc(x, waveY, 1.0, 0, Math.PI * 2); // Small radius matching line width
                        ctx.fill();
                    }
                }
            });
        });

        // 2. Line-Line Intersections (Legacy Red)
        ctx.fillStyle = LINE_COLOR + ' 0.5)';
        for (let i = 0; i < activeLines.length; i++) {
            for (let j = i + 1; j < activeLines.length; j++) {
                const p1 = activeLines[i];
                const p2 = activeLines[j];
                const denom = (p1.x1 - p1.x2) * (p2.y1 - p2.y2) - (p1.y1 - p1.y2) * (p2.x1 - p2.x2);
                if (denom === 0) continue;
                
                const ix = ((p1.x1 * p1.y2 - p1.y1 * p1.x2) * (p2.x1 - p2.x2) - (p1.x1 - p1.x2) * (p2.x1 * p2.y2 - p2.y1 * p2.x2)) / denom;
                const iy = ((p1.x1 * p1.y2 - p1.y1 * p1.x2) * (p2.y1 - p2.y2) - (p1.y1 - p1.y2) * (p2.x1 * p2.y2 - p2.y1 * p2.x2)) / denom;
                
                if (ix > 0 && ix < width && iy > 0 && iy < height) {
                    ctx.beginPath();
                    ctx.arc(ix, iy, 1.0, 0, Math.PI * 2); // Small radius matching line width
                    ctx.fill();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const wavePoints = drawSineWaves();
        const activeLines = updateAndDrawLines();
        drawIntersections(wavePoints, activeLines);
        requestAnimationFrame(animate);
    }

    animate();
})();
