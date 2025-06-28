const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 300;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.speed = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 80%)`; // Random pastel colors
    }

    update() {
        this.z -= this.speed;
        if (this.z <= 0) {
            this.z = canvas.width;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.color = `hsl(${Math.random() * 360}, 70%, 80%)`;
        }
    }

    draw() {
        const x = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
        const size = (canvas.width / this.z) * 3;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

// Nebula effect
function drawNebula() {
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, 'rgba(50, 0, 100, 0.3)');
    gradient.addColorStop(0.5, 'rgba(0, 50, 150, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawNebula();
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();