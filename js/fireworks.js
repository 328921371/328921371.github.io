class Fireworks {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    this.particles = [];
    this.maxParticles = 20;  // 调整最大粒子数量
    this.colors = ['#ff1461', '#18FF92', '#5A87FF', '#FBF38C'];

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    document.addEventListener('click', (e) => {
      this.createParticles(e.clientX, e.clientY);
    });

    document.addEventListener('keydown', (e) => {
      const activeElement = document.activeElement;
      if (activeElement.tagName === 'TEXTAREA' || (activeElement.tagName === 'INPUT' && (activeElement.type === 'text' || activeElement.type === 'search'))) {
        const { left, top } = this.getCaretCoordinates(activeElement);
        console.log(left, top);
        this.createParticles(left, top);
      }
    });

    this.loop();
  }

  getCaretCoordinates(element) {
    const caret = getCaretCoordinates(element, element.selectionEnd);
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + caret.left + window.scrollX,
      top: rect.top + caret.top + window.scrollY
    };
  }

  createParticles(x, y) {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(new Particle(x, y, this.colors));
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(particle => particle.update(this.ctx));
  }
}

class Particle {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.radius = Math.random() * 2 + 1;  // 调整粒子的半径
    this.speedX = Math.random() * 2 - 1;  // 调整粒子的水平速度
    this.speedY = Math.random() * 4 - 2;  // 调整粒子的初始垂直速度
    this.gravity = 0.2;  // 增加重力效果
    this.alpha = 1;
  }

  update(ctx) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;  // 在垂直速度上添加重力
    this.alpha -= 0.02;
    if (this.alpha <= 0) return false;

    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;

    return true;
  }
}

new Fireworks();
