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
        let angle;
        if (Math.random() > 0.5) {
            // Horizontal-ish line (moves up/down)
            angle = (Math.random() * 0.4 - 0.2) + (Math.random() > 0.5 ? 0 : Math.PI);
        } else {
            // Vertical-ish line (moves left/right)
            angle = (Math.PI / 2) + (Math.random() * 0.4 - 0.2) + (Math.random() > 0.5 ? 0 : Math.PI);
        }
        const moveAngle = angle + (Math.PI / 2);
        const speed = 1.0 + Math.random() * 2.0; // Slightly scaled down speed for visual clarity
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

    function lineSegmentIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denom === 0) return null;
        
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
        
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1)
            };
        }
        return null;
    }

    function drawIntersections(wavePoints, activeLines) {
        // 1. Wave-Line Intersections (The Red Highlights for multi-directional lines)
        ctx.fillStyle = LINE_COLOR + ' 0.9)'; // Red intersection point matching line color
        
        activeLines.forEach(l => {
            waves.forEach((w, waveIdx) => {
                const pts = wavePoints[waveIdx];
                for (let i = 0; i < pts.length - 1; i++) {
                    const p1 = pts[i];
                    const p2 = pts[i+1];
                    const pt = lineSegmentIntersect(l.x1, l.y1, l.x2, l.y2, p1.x, p1.y, p2.x, p2.y);
                    
                    if (pt) {
                        ctx.beginPath();
                        ctx.arc(pt.x, pt.y, 1.0, 0, Math.PI * 2); // Small radius matching line width
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
