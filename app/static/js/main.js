// Force scroll to top on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

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

    // Initial glitch after page load
    setTimeout(glitchText, 1000);
}

// Language Toggle - Global variable
let currentLang = 'pt'; // Default language (shared with terminal)

const langToggle = document.getElementById('langToggle');
if (langToggle) {
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

// Interactive Terminal
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');

if (terminalInput && terminalBody) {
    // Focus input when clicking anywhere in terminal
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    // Command history
    let commandHistory = [];
    let historyIndex = -1;

    // Terminal responses (uses global currentLang)
    const responses = {
        pt: {
            help: `Comandos disponíveis:
  <span class="success">sudo apt sobre</span>  - Informações sobre mim
  <span class="success">ls</span>             - Lista seções do portfolio
  <span class="success">whoami</span>         - Informações rápidas
  <span class="success">skills</span>         - Minhas habilidades
  <span class="success">clear</span>          - Limpa o terminal
  <span class="success">help</span>           - Mostra esta mensagem`,
            sobre: `<span class="success">[sudo] senha para visitor: ********</span>
<span class="success">Lendo pacotes... Pronto</span>
<span class="success">Acesso liberado!</span>

Olá! Sou Victor Medeiros, desenvolvedor e entusiasta de segurança cibernética.

Minha jornada na tecnologia começou com a curiosidade de entender como as coisas funcionam 
por baixo dos panos. Hoje, combino programação e segurança para criar soluções robustas e seguras.

Especialidades:
  • Desenvolvimento Full-Stack
  • Segurança de Aplicações
  • Pentesting & Ethical Hacking
  • DevSecOps

Sempre em busca de novos desafios e aprendizados!`,
            ls: `Seções disponíveis:
  <span class="info">sobre/</span>
  <span class="info">experiencia/</span>
  <span class="info">projetos/</span>
  <span class="info">habilidades/</span>
  <span class="info">contato/</span>`,
            whoami: `<span class="success">Victor Medeiros</span>
Cybersecurity Enthusiast | Full-Stack Developer
GitHub: github.com/djvyctor
LinkedIn: linkedin.com/in/victordevsec`,
            skills: `Habilidades principais:
  <span class="success">✓</span> Python, JavaScript, FastAPI
  <span class="success">✓</span> Segurança de Aplicações
  <span class="success">✓</span> Linux, Docker, Git
  <span class="success">✓</span> Pentesting & CTFs
  <span class="success">✓</span> HTML, CSS, React`,
            clear: 'CLEAR',
            error: (cmd) => `<span class="error">bash: ${cmd}: comando não encontrado</span>
Digite 'help' para ver os comandos disponíveis.`
        },
        en: {
            help: `Available commands:
  <span class="success">sudo apt sobre</span>  - About me information
  <span class="success">ls</span>             - List portfolio sections
  <span class="success">whoami</span>         - Quick information
  <span class="success">skills</span>         - My skills
  <span class="success">clear</span>          - Clear terminal
  <span class="success">help</span>           - Show this message`,
            sobre: `<span class="success">[sudo] password for visitor: ********</span>
<span class="success">Reading packages... Done</span>
<span class="success">Access granted!</span>

Hello! I'm Victor Medeiros, a developer and cybersecurity enthusiast.

My journey in technology started with curiosity about how things work under the hood.
Today, I combine programming and security to create robust and secure solutions.

Specialties:
  • Full-Stack Development
  • Application Security
  • Pentesting & Ethical Hacking
  • DevSecOps

Always seeking new challenges and learning opportunities!`,
            ls: `Available sections:
  <span class="info">about/</span>
  <span class="info">experience/</span>
  <span class="info">projects/</span>
  <span class="info">skills/</span>
  <span class="info">contact/</span>`,
            whoami: `<span class="success">Victor Medeiros</span>
Cybersecurity Enthusiast | Full-Stack Developer
GitHub: github.com/djvyctor
LinkedIn: linkedin.com/in/victordevsec`,
            skills: `Main skills:
  <span class="success">✓</span> Python, JavaScript, FastAPI
  <span class="success">✓</span> Application Security
  <span class="success">✓</span> Linux, Docker, Git
  <span class="success">✓</span> Pentesting & CTFs
  <span class="success">✓</span> HTML, CSS, React`,
            clear: 'CLEAR',
            error: (cmd) => `<span class="error">bash: ${cmd}: command not found</span>
Type 'help' to see available commands.`
        }
    };

    // Update language when toggle changes
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = langToggleBtn.textContent === 'PT' ? 'en' : 'pt';
        });
    }

    function addOutput(text, className = '') {
        const output = document.createElement('div');
        output.className = `terminal-output ${className}`;
        output.innerHTML = text;
        
        // Insert before the input line
        const inputLine = terminalBody.querySelector('.terminal-line');
        terminalBody.insertBefore(output, inputLine);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function processCommand(command) {
        const cmd = command.trim().toLowerCase();
        
        // Add command to history
        if (cmd) {
            commandHistory.unshift(cmd);
            historyIndex = -1;
        }

        // Show command in terminal
        addOutput(`<span class="terminal-prompt">visitor@portfolio:~$</span> ${command}`);

        // Process command
        if (cmd === 'clear') {
            // Clear terminal except welcome message
            const welcome = terminalBody.querySelector('.terminal-welcome');
            const inputLine = terminalBody.querySelector('.terminal-line');
            terminalBody.innerHTML = '';
            terminalBody.appendChild(welcome);
            terminalBody.appendChild(inputLine);
        } else if (cmd === 'sudo apt sobre' || cmd === 'sudo apt about') {
            addOutput(responses[currentLang].sobre);
        } else if (cmd === 'help') {
            addOutput(responses[currentLang].help);
        } else if (cmd === 'ls') {
            addOutput(responses[currentLang].ls);
        } else if (cmd === 'whoami') {
            addOutput(responses[currentLang].whoami);
        } else if (cmd === 'skills') {
            addOutput(responses[currentLang].skills);
        } else if (cmd === '') {
            // Empty command, do nothing
        } else {
            addOutput(responses[currentLang].error(command));
        }

        // Clear input
        terminalInput.value = '';
    }

    // Handle enter key
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(terminalInput.value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }
    });

    // Auto focus only when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                terminalInput.focus();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(terminalBody);
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

// Matrix Rain Effect - Invisible until Mouse Reveals
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters (binary + symbols) - Reduced for performance
    const chars = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Mouse position
    let mouseX = -1000;
    let mouseY = -1000;
    const revealRadius = 150; // Reduced reveal radius
    
    // Matrix opacity based on scroll
    let matrixOpacity = 1;
    
    // Array to store y position and speed of each column
    const drops = [];
    const speeds = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = 1; // Normal speed
    }
    
    // Performance: Track last frame time
    let lastFrameTime = 0;
    const frameInterval = 100; // Slower refresh rate (was ~80ms in setInterval)
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Matrix always visible (no scroll fade)
    matrixOpacity = 1;
    
    function drawMatrix(currentTime) {
        // Only draw if opacity > 0
        if (matrixOpacity <= 0.01) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawMatrix);
            return;
        }
        
        // Performance: Throttle frame rate
        if (currentTime - lastFrameTime < frameInterval) {
            requestAnimationFrame(drawMatrix);
            return;
        }
        lastFrameTime = currentTime;
        
        // Black background with slight transparency for trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters - Only process columns near mouse for better performance
        for (let i = 0; i < drops.length; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Skip columns far from mouse (optimization)
            const distanceX = Math.abs(mouseX - x);
            if (distanceX > revealRadius + 50) {
                // Still move the drop even if not visible
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 1;
                continue;
            }
            
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Calculate distance from mouse
            const distanceY = Math.abs(mouseY - y);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Only show characters near mouse
            if (distance < revealRadius) {
                // Closer to mouse = brighter and more visible
                const intensity = 1 - (distance / revealRadius);
                speeds[i] = 1 + intensity * 2; // Speed up near cursor
                
                // Calculate opacity based on distance
                const charOpacity = Math.min(1, intensity * 1.5) * matrixOpacity;
                const brightness = 255;
                
                ctx.fillStyle = `rgba(0, ${brightness}, ${Math.floor(brightness * 0.53)}, ${charOpacity})`;
                ctx.fillText(text, x, y);
            } else {
                speeds[i] = 1;
            }
            
            // Reset drop to top randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop with variable speed
            drops[i] += speeds[i];
        }
        
        requestAnimationFrame(drawMatrix);
    }
    
    // Start animation loop
    requestAnimationFrame(drawMatrix);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}