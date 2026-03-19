const canvas = document.getElementById('networkCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const THEME_COLOR = 'rgba(34, 197, 94,'; // Terminal Green

    // 1. Sine Wave Configuration
    // ORIGINAL VALUES:
    // const waves = [
    //     { y: 0.5, amp: 45, freq: 0.008, speed: 0.96, color: THEME_COLOR + ' 0.2)' },
    //     { y: 0.52, amp: 25, freq: 0.015, speed: -0.64, color: THEME_COLOR + ' 0.15)' },
    //     { y: 0.48, amp: 15, freq: 0.025, speed: 1.44, color: THEME_COLOR + ' 0.1)' }
    // ];
    const waves = [
        { y: 0.25, amp: 45, freq: 0.008, speed: 0.96, color: THEME_COLOR + ' 0.2)' },
        { y: 0.27, amp: 25, freq: 0.015, speed: -0.64, color: THEME_COLOR + ' 0.15)' },
        { y: 0.23, amp: 15, freq: 0.025, speed: 1.44, color: THEME_COLOR + ' 0.1)' }
    ];
    let waveOffset = 0;

    // 2. Angled Scanning Lines
    let lines = [];
    const maxLines = 6;

    function createLine() {
        const angle = Math.random() * Math.PI * 2;
        const moveAngle = angle + (Math.PI / 2); // Move perpendicular to orientation
        const speed = 1.5 + Math.random() * 2.5;
        // Start from a random edge point
        let x, y;
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
            opacity: 0.08 + Math.random() * 0.18,
            length: Math.max(width, height) * 1.8
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

    function checkIntersection(l1, l2) {
        const p1 = getLineEndpoints(l1);
        const p2 = getLineEndpoints(l2);
        
        const denom = (p1.x1 - p1.x2) * (p2.y1 - p2.y2) - (p1.y1 - p1.y2) * (p2.x1 - p2.x2);
        if (denom === 0) return null;

        const intersectX = ((p1.x1 * p1.y2 - p1.y1 * p1.x2) * (p2.x1 - p2.x2) - (p1.x1 - p1.x2) * (p2.x1 * p2.y2 - p2.y1 * p2.x2)) / denom;
        const intersectY = ((p1.x1 * p1.y2 - p1.y1 * p1.x2) * (p2.y1 - p2.y2) - (p1.y1 - p1.y2) * (p2.x1 * p2.y2 - p2.y1 * p2.x2)) / denom;

        if (intersectX > 0 && intersectX < width && intersectY > 0 && intersectY < height) {
            return { x: intersectX, y: intersectY };
        }
        return null;
    }

    function drawSineWaves() {
        waveOffset += 0.05;
        const waveYValues = [];
        
        waves.forEach(w => {
            ctx.beginPath();
            ctx.strokeStyle = w.color;
            ctx.lineWidth = 1;
            const points = [];
            for (let x = 0; x < width; x += 2) {
                const y = height * w.y + Math.sin(x * w.freq + waveOffset * w.speed) * w.amp;
                points.push(y);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            waveYValues.push(points);
        });

        // Intersection Highlights (Brighter where waves cross)
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        // ORIGINAL: ctx.fillStyle = THEME_COLOR + ' 0.2)';
        ctx.fillStyle = 'rgba(255, 95, 86, 0.2)';
        for (let xIdx = 0; xIdx < waveYValues[0].length; xIdx++) {
            const x = xIdx * 2;
            for (let i = 0; i < waves.length; i++) {
                for (let j = i + 1; j < waves.length; j++) {
                    if (Math.abs(waveYValues[i][xIdx] - waveYValues[j][xIdx]) < 3) {
                        ctx.beginPath();
                        // ORIGINAL: ctx.arc(x, (waveYValues[i][xIdx] + waveYValues[j][xIdx]) / 2, 4, 0, Math.PI * 2);
                        ctx.arc(x, (waveYValues[i][xIdx] + waveYValues[j][xIdx]) / 2, 2.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }
        ctx.restore();
    }

    function updateAndDrawLines() {
        lines.forEach((l, i) => {
            l.x1 += Math.cos(l.moveAngle) * l.speed;
            l.y1 += Math.sin(l.moveAngle) * l.speed;

            // Reset if far off screen
            const distToCenter = Math.sqrt(Math.pow(l.x1 - width/2, 2) + Math.pow(l.y1 - height/2, 2));
            if (distToCenter > Math.max(width, height) * 2) {
                lines[i] = createLine();
            }

            const p = getLineEndpoints(l);
            ctx.beginPath();
            ctx.strokeStyle = THEME_COLOR + ` ${l.opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x1, p.y1);
            ctx.lineTo(p.x2, p.y2);
            ctx.stroke();
        });

        // Intersections
        // ORIGINAL: ctx.fillStyle = THEME_COLOR + ' 0.5)';
        ctx.fillStyle = 'rgba(255, 95, 86, 0.5)';
        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                const point = checkIntersection(lines[i], lines[j]);
                if (point) {
                    ctx.beginPath();
                    // ORIGINAL: ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                    ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Small scan highlight
                    // ORIGINAL: ctx.strokeStyle = THEME_COLOR + ' 0.1)';
                    ctx.strokeStyle = 'rgba(255, 95, 86, 0.15)';
                    // ORIGINAL: ctx.strokeRect(point.x - 6, point.y - 6, 12, 12);
                    ctx.strokeRect(point.x - 4, point.y - 4, 8, 8);
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawSineWaves();
        updateAndDrawLines();
        requestAnimationFrame(animate);
    }

    animate();
}
