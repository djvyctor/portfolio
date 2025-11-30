window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#hero') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
});
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
    navBrandLink.addEventListener('mouseenter', glitchText);
    setTimeout(glitchText, 1000);
}
let currentLang = 'pt'; // Default language (shared with terminal)
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        langToggle.textContent = currentLang === 'pt' ? 'EN' : 'PT';
        document.querySelectorAll('.translatable').forEach(element => {
            const newText = element.getAttribute('data-' + currentLang);
            if (newText) {
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
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');
if (terminalInput && terminalBody) {
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });
    let commandHistory = [];
    let historyIndex = -1;
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
Olá! Sou Victor Medeiros, desenvolvedor backend com foco em segurança cibernética.
Minha jornada na tecnologia começou com a curiosidade de entender como as coisas funcionam 
por baixo dos panos. Hoje, combino programação e segurança para criar soluções robustas e seguras.
Especialidades:
  • Desenvolvimento Backend
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
Cybersecurity | Backend
GitHub: github.com/djvyctor
LinkedIn: linkedin.com/in/victordevsec`,
            skills: `Habilidades principais:
  <span class="success">✓</span> Python, FastAPI
  <span class="success">✓</span> Segurança de Aplicações
  <span class="success">✓</span> Linux, Docker, Git
  <span class="success">✓</span> Pentesting & CTFs
  <span class="success">✓</span> SQL, PostgreSQL`,
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
Hello! I'm Victor Medeiros, a backend developer focused on cybersecurity.
My journey in technology started with curiosity about how things work under the hood.
Today, I combine programming and security to create robust and secure solutions.
Specialties:
  • Backend Development
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
Backend Developer | Cybersecurity
GitHub: github.com/djvyctor
LinkedIn: linkedin.com/in/victordevsec`,
            skills: `Main skills:
  <span class="success">✓</span> Python, FastAPI
  <span class="success">✓</span> Application Security
  <span class="success">✓</span> Linux, Docker, Git
  <span class="success">✓</span> Pentesting & CTFs
  <span class="success">✓</span> SQL, PostgreSQL`,
            clear: 'CLEAR',
            error: (cmd) => `<span class="error">bash: ${cmd}: command not found</span>
Type 'help' to see available commands.`
        }
    };
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
        const inputLine = terminalBody.querySelector('.terminal-line');
        terminalBody.insertBefore(output, inputLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    function processCommand(command) {
        const cmd = command.trim().toLowerCase();
        if (cmd) {
            commandHistory.unshift(cmd);
            historyIndex = -1;
        }
        addOutput(`<span class="terminal-prompt">visitor@portfolio:~$</span> ${command}`);
        if (cmd === 'clear') {
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
        } else {
            addOutput(responses[currentLang].error(command));
        }
        terminalInput.value = '';
    }
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                terminalInput.focus();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(terminalBody);
}
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
    setTimeout(typeWriter, 500);
}
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    let mouseX = -1000;
    let mouseY = -1000;
    const revealRadius = 150; // Reduced reveal radius
    let matrixOpacity = 1;
    const drops = [];
    const speeds = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = 1; // Normal speed
    }
    let lastFrameTime = 0;
    const frameInterval = 100; // Slower refresh rate (was ~80ms in setInterval)
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    matrixOpacity = 1;
    function drawMatrix(currentTime) {
        if (matrixOpacity <= 0.01) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawMatrix);
            return;
        }
        if (currentTime - lastFrameTime < frameInterval) {
            requestAnimationFrame(drawMatrix);
            return;
        }
        lastFrameTime = currentTime;
        ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const distanceX = Math.abs(mouseX - x);
            if (distanceX > revealRadius + 50) {
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 1;
                continue;
            }
            const text = chars[Math.floor(Math.random() * chars.length)];
            const distanceY = Math.abs(mouseY - y);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance < revealRadius) {
                const intensity = 1 - (distance / revealRadius);
                speeds[i] = 1 + intensity * 2; // Speed up near cursor
                const charOpacity = Math.min(1, intensity * 1.5) * matrixOpacity;
                const brightness = 255;
                ctx.fillStyle = `rgba(0, ${brightness}, ${Math.floor(brightness * 0.53)}, ${charOpacity})`;
                ctx.fillText(text, x, y);
            } else {
                speeds[i] = 1;
            }
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += speeds[i];
        }
        requestAnimationFrame(drawMatrix);
    }
    requestAnimationFrame(drawMatrix);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
const animateSkills = () => {
    const skillsSection = document.getElementById('habilidades');
    if (!skillsSection) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(skillsSection);
};
animateSkills();
