// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect (optional: add shadow on scroll)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
});

// Hacker Glitch Effect on Navbar Name with Font Changes
const navBrandLink = document.querySelector('.nav-brand a');
if (navBrandLink) {
    const originalText = navBrandLink.textContent;
    const originalFont = window.getComputedStyle(navBrandLink).fontFamily;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()アイウエオカキクケコ';
    const fonts = [
        'Courier New',
        'Impact',
        'Georgia',
        'Consolas',
        'Arial Black',
        'Times New Roman',
        'Verdana',
        'Comic Sans MS'
    ];
    let isAnimating = false;

    function glitchText() {
        if (isAnimating) return;
        isAnimating = true;
        let iteration = 0;
        const totalIterations = originalText.length;
        let fontIndex = 0;

        const interval = setInterval(() => {
            // Change font every 2 frames
            if (fontIndex % 2 === 0) {
                const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                navBrandLink.style.fontFamily = randomFont;
            }
            fontIndex++;

            navBrandLink.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            iteration += 0.5;

            if (iteration >= totalIterations) {
                clearInterval(interval);
                navBrandLink.textContent = originalText;
                navBrandLink.style.fontFamily = '';
                isAnimating = false;
            }
        }, 50);
    }

    // Trigger on hover
    navBrandLink.addEventListener('mouseenter', glitchText);

    // Auto-glitch every 8 seconds
    setInterval(() => {
        if (!isAnimating) {
            glitchText();
        }
    }, 8000);

    // Initial glitch after page load
    setTimeout(glitchText, 1000);
}

// Language Toggle
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    let currentLang = 'pt'; // Default language

    langToggle.addEventListener('click', () => {
        // Toggle language
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        
        // Update button text
        langToggle.textContent = currentLang === 'pt' ? 'EN' : 'PT';
        
        // Update only elements with .translatable class
        document.querySelectorAll('.translatable').forEach(element => {
            const newText = element.getAttribute('data-' + currentLang);
            if (newText) {
                // Special handling for typewriter element
                if (element.id === 'typewriter') {
                    element.textContent = '';
                    let i = 0;
                    
                    function typeWriter() {
                        if (i < newText.length) {
                            element.textContent += newText.charAt(i);
                            i++;
                            setTimeout(typeWriter, 100);
                        }
                    }
                    
                    setTimeout(typeWriter, 100);
                } else {
                    element.textContent = newText;
                }
            }
        });
    });
}

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const text = typewriterElement.getAttribute('data-pt'); // Get from attribute
    typewriterElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeWriter, 500);
}

// Smart Scroll Button
const scrollBtn = document.getElementById('scrollBtn');
const scrollLink = document.getElementById('scrollLink');
const scrollArrow = document.getElementById('scrollArrow');

if (scrollBtn && scrollLink && scrollArrow) {
    const sections = ['hero', 'sobre', 'experiencia', 'projetos', 'habilidades', 'contato'];
    let currentSectionIndex = 0;

    function updateScrollButton() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Show button after scrolling 200px
        if (scrollPosition > 200) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }

        // Find current section
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && scrollPosition >= section.offsetTop - 200) {
                currentSectionIndex = i;
                break;
            }
        }

        // Check if at bottom of page
        const isAtBottom = scrollPosition + windowHeight >= documentHeight - 100;

        if (isAtBottom) {
            // At bottom - go to top
            scrollArrow.textContent = '↑';
            scrollLink.href = '#hero';
        } else if (currentSectionIndex < sections.length - 1) {
            // Middle - go to next section
            scrollArrow.textContent = '↓';
            scrollLink.href = '#' + sections[currentSectionIndex + 1];
        } else {
            // At last section but not bottom - go to top
            scrollArrow.textContent = '↑';
            scrollLink.href = '#hero';
        }
    }

    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton(); // Initial call
}

// Matrix Rain Effect - Invisible until Mouse Reveals
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters (binary + symbols)
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Mouse position
    let mouseX = -1000;
    let mouseY = -1000;
    const revealRadius = 200; // Area of reveal around cursor
    
    // Matrix opacity based on scroll
    let matrixOpacity = 1;
    
    // Array to store y position and speed of each column
    const drops = [];
    const speeds = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = 1; // Normal speed
    }
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Matrix always visible (no scroll fade)
    matrixOpacity = 1;
    
    function drawMatrix() {
        // Only draw if opacity > 0
        if (matrixOpacity <= 0.01) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        
        // Black background with slight transparency for trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Calculate distance from mouse
            const distanceX = Math.abs(mouseX - x);
            const distanceY = Math.abs(mouseY - y);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Only show characters near mouse
            if (distance < revealRadius) {
                // Closer to mouse = brighter and more visible
                const intensity = 1 - (distance / revealRadius);
                speeds[i] = 1 + intensity * 2; // Speed up near cursor
                
                // Calculate opacity based on distance - invisible far, bright close
                const charOpacity = Math.min(1, intensity * 1.5) * matrixOpacity; // Stronger opacity
                const brightness = 255; // Full brightness
                
                ctx.fillStyle = `rgba(0, ${brightness}, ${Math.floor(brightness * 0.53)}, ${charOpacity})`;
                ctx.fillText(text, x, y);
            } else {
                // Characters are invisible outside mouse radius
                speeds[i] = 1; // Normal speed even when invisible
            }
            
            // Reset drop to top randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop with variable speed
            drops[i] += speeds[i];
        }
    }
    
    // Animation loop
    setInterval(drawMatrix, 80);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}