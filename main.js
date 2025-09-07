// ContentAI Website - Consolidated JavaScript

// Animated background with cursor effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background
    initBackground();
    
    // Initialize magic bento effects
    initMagicBento();
    
    // Initialize main website functionality
    initWebsite();
});

function initBackground() {
    const container = document.getElementById('liquid-ether-bg');
    if (!container) return;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    let mouse = { x: 0.5, y: 0.5 };
    let mouseTarget = { x: 0.5, y: 0.5 };
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function animate() {
        time += 0.01;
        
        // Smooth mouse movement
        mouse.x += (mouseTarget.x - mouse.x) * 0.1;
        mouse.y += (mouseTarget.y - mouse.y) * 0.1;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create animated gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width * mouse.x,
            canvas.height * mouse.y,
            0,
            canvas.width * mouse.x,
            canvas.height * mouse.y,
            Math.max(canvas.width, canvas.height) * 1.2
        );
        
        gradient.addColorStop(0, `rgba(82, 39, 255, ${0.15 + Math.sin(time) * 0.05})`);
        gradient.addColorStop(0.3, `rgba(255, 159, 252, ${0.08 + Math.cos(time * 1.2) * 0.03})`);
        gradient.addColorStop(0.6, `rgba(177, 158, 239, ${0.05 + Math.sin(time * 0.7) * 0.02})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add floating particles
        for (let i = 0; i < 30; i++) {
            const x = canvas.width * (0.5 + Math.sin(time * 0.5 + i * 0.3) * 0.6);
            const y = canvas.height * (0.5 + Math.cos(time * 0.3 + i * 0.4) * 0.6);
            const size = 30 + Math.sin(time + i) * 15;
            
            // Mouse influence on particles
            const dx = mouse.x * canvas.width - x;
            const dy = mouse.y * canvas.height - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = 1 / (1 + distance * 0.001);
            
            const particleX = x + dx * influence * 0.1;
            const particleY = y + dy * influence * 0.1;
            
            const particleGradient = ctx.createRadialGradient(particleX, particleY, 0, particleX, particleY, size);
            particleGradient.addColorStop(0, `rgba(82, 39, 255, ${0.4 + Math.sin(time + i) * 0.2})`);
            particleGradient.addColorStop(0.5, `rgba(255, 159, 252, ${0.2 + Math.cos(time + i) * 0.1})`);
            particleGradient.addColorStop(1, 'rgba(177, 158, 239, 0)');
            
            ctx.fillStyle = particleGradient;
            ctx.beginPath();
            ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add cursor trail effect
        const trailGradient = ctx.createRadialGradient(
            mouse.x * canvas.width,
            mouse.y * canvas.height,
            0,
            mouse.x * canvas.width,
            mouse.y * canvas.height,
            150
        );
        trailGradient.addColorStop(0, 'rgba(82, 39, 255, 0.3)');
        trailGradient.addColorStop(0.5, 'rgba(255, 159, 252, 0.1)');
        trailGradient.addColorStop(1, 'rgba(177, 158, 239, 0)');
        
        ctx.fillStyle = trailGradient;
        ctx.beginPath();
        ctx.arc(mouse.x * canvas.width, mouse.y * canvas.height, 150, 0, Math.PI * 2);
        ctx.fill();
        
        // Add flowing lines
        ctx.strokeStyle = `rgba(82, 39, 255, ${0.2 + Math.sin(time) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < 8; i++) {
            const x = ((time * 0.001 + i * 0.125) % 1) * canvas.width;
            const y = canvas.height * (0.5 + Math.sin(time * 0.002 + i) * 0.4);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        requestAnimationFrame(animate);
    }
    
    // Mouse move handler
    function handleMouseMove(e) {
        mouseTarget.x = e.clientX / window.innerWidth;
        mouseTarget.y = e.clientY / window.innerHeight;
    }
    
    // Initialize
    resize();
    animate();
    
    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
}

// Magic Bento Card Effects
class MagicBentoCard {
  constructor(card, options = {}) {
    this.card = card;
    this.options = {
      particleCount: 12,
      glowColor: '82, 39, 255',
      enableTilt: true,
      enableMagnetism: true,
      clickEffect: true,
      ...options
    };
    
    this.particles = [];
    this.timeouts = [];
    this.isHovered = false;
    this.magnetismAnimation = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupGlowEffect();
  }

  setupEventListeners() {
    this.card.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.card.addEventListener('mouseleave', () => this.handleMouseLeave());
    this.card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.card.addEventListener('click', (e) => this.handleClick(e));
  }

  setupGlowEffect() {
    // Add CSS custom properties for glow effect
    this.card.style.setProperty('--glow-x', '50%');
    this.card.style.setProperty('--glow-y', '50%');
    this.card.style.setProperty('--glow-intensity', '0');
    this.card.style.setProperty('--glow-radius', '200px');
  }

  handleMouseEnter() {
    this.isHovered = true;
    this.animateParticles();
    
    if (this.options.enableTilt) {
      this.card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
    }
  }

  handleMouseLeave() {
    this.isHovered = false;
    this.clearParticles();
    
    if (this.options.enableTilt) {
      this.card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    
    if (this.options.enableMagnetism) {
      this.card.style.transform = 'translateX(0px) translateY(0px)';
    }
  }

  handleMouseMove(e) {
    const rect = this.card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Update glow position
    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;
    this.card.style.setProperty('--glow-x', `${relativeX}%`);
    this.card.style.setProperty('--glow-y', `${relativeY}%`);
    this.card.style.setProperty('--glow-intensity', '1');

    if (this.options.enableTilt) {
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      this.card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    if (this.options.enableMagnetism) {
      const magnetX = (x - centerX) * 0.05;
      const magnetY = (y - centerY) * 0.05;
      this.card.style.transform += ` translateX(${magnetX}px) translateY(${magnetY}px)`;
    }
  }

  handleClick(e) {
    if (!this.options.clickEffect) return;

    const rect = this.card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    );

    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(${this.options.glowColor}, 0.4) 0%, rgba(${this.options.glowColor}, 0.2) 30%, transparent 70%);
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 1000;
    `;

    this.card.appendChild(ripple);

    // Animate ripple
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '1';
    
    requestAnimationFrame(() => {
      ripple.style.transition = 'all 0.8s ease-out';
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });

    setTimeout(() => {
      ripple.remove();
    }, 800);
  }

  createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(${this.options.glowColor}, 1);
      box-shadow: 0 0 6px rgba(${this.options.glowColor}, 0.6);
      pointer-events: none;
      z-index: 100;
      left: ${x}px;
      top: ${y}px;
    `;
    return particle;
  }

  animateParticles() {
    if (!this.isHovered) return;

    for (let i = 0; i < this.options.particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!this.isHovered) return;

        const rect = this.card.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        const particle = this.createParticle(x, y);
        this.card.appendChild(particle);
        this.particles.push(particle);

        // Animate particle
        particle.style.transition = 'all 0.3s ease-out';
        particle.style.transform = 'scale(1)';
        particle.style.opacity = '1';

        // Random movement
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        const rotation = Math.random() * 360;

        setTimeout(() => {
          particle.style.transition = 'all 2s ease-in-out';
          particle.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
          particle.style.opacity = '0.3';
        }, 100);

        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
          const index = this.particles.indexOf(particle);
          if (index > -1) {
            this.particles.splice(index, 1);
          }
        }, 2000);

      }, i * 100);

      this.timeouts.push(timeoutId);
    }
  }

  clearParticles() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    
    this.particles.forEach(particle => {
      particle.style.transition = 'all 0.3s ease-in';
      particle.style.transform = 'scale(0)';
      particle.style.opacity = '0';
      setTimeout(() => particle.remove(), 300);
    });
    this.particles = [];
  }
}

function initMagicBento() {
  const cards = document.querySelectorAll('.feature-card, .comparison-card, .problem-card, .workflow-step, .solution-card');
  
  cards.forEach(card => {
    new MagicBentoCard(card, {
      particleCount: 8,
      glowColor: '82, 39, 255',
      enableTilt: true,
      enableMagnetism: true,
      clickEffect: true
    });
  });
}

function initWebsite() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const animatedElements = document.querySelectorAll('.feature-card, .comparison-card, .problem-card, .workflow-step, .solution-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add mobile menu toggle
    function createMobileMenu() {
        const nav = document.querySelector('.nav-container');
        const menu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #1f2937;
                display: block;
            `;
            
            nav.appendChild(mobileMenuBtn);
            
            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', function() {
                menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
                menu.style.flexDirection = 'column';
                menu.style.position = 'absolute';
                menu.style.top = '100%';
                menu.style.left = '0';
                menu.style.right = '0';
                menu.style.background = 'white';
                menu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                menu.style.padding = '1rem';
            });
        }
    }

    // Initialize mobile menu
    createMobileMenu();
    
    // Recreate mobile menu on resize
    window.addEventListener('resize', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
        }
        createMobileMenu();
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
