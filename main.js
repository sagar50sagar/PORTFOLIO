/*===== MENU SHOW & HIDE =====*/ 
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.querySelectorAll('.nav__link')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show')
    })
}

navClose.forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show')
}))

/*===== PROMPT PLAYGROUND LOGIC =====*/
const personas = {
    architect: "System Prompt: You are a Senior Web Architect. Analyze the provided codebase for scalability, modularity, and ADR compliance. Identify bottlenecks in the data layer.",
    debugger: "System Prompt: You are an Elite Debugger. Trace the execution flow of the provided function. Identify potential memory leaks and edge case failures in the async loop.",
    creative: "System Prompt: You are a GenAI Creative Strategist. Propose 3 unique ways to leverage LLMs for enhancing user engagement in this specific portfolio vertical."
};

function runPlayground() {
    const persona = document.getElementById('prompt-persona').value;
    const output = document.getElementById('prompt-output');
    output.style.opacity = '0';
    
    setTimeout(() => {
        output.innerText = personas[persona];
        output.style.opacity = '1';
        output.classList.add('pulse');
        setTimeout(() => output.classList.remove('pulse'), 2000);
    }, 300);
}

/*===== PROJECT IMPACT CALCULATOR =====*/
function simulateImpact() {
    const metrics = {
        users: { id: 'metric-users', target: 5000, suffix: '+' },
        latency: { id: 'metric-latency', target: 120, suffix: 'ms' },
        uptime: { id: 'metric-uptime', target: 99.9, suffix: '%' }
    };

    Object.keys(metrics).forEach(key => {
        const m = metrics[key];
        const el = document.getElementById(m.id);
        let current = 0;
        const duration = 2000;
        const step = m.target / (duration / 16);

        const counter = setInterval(() => {
            current += step;
            if (current >= m.target) {
                el.innerText = m.target + m.suffix;
                clearInterval(counter);
            } else {
                el.innerText = Math.floor(current) + (key === 'uptime' ? current.toFixed(1).split('.')[1] : '') + m.suffix;
                if(key === 'uptime') el.innerText = current.toFixed(1) + m.suffix;
            }
        }, 16);
    });
}

// Global scope for HTML onclick
window.runPlayground = runPlayground;
window.simulateImpact = simulateImpact;

/*===== HEADER BACKGROUND CHANGE =====*/ 
function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('scrolled'); else header.classList.remove('scrolled')
}
window.addEventListener('scroll', scrollHeader)

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__list a[href*=' + sectionId + ']')?.classList.add('active')
        }else{
            document.querySelector('.nav__list a[href*=' + sectionId + ']')?.classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
})

sr.reveal('.hero__content, .section-title')
sr.reveal('.hero__img-container', {origin: 'right', delay: 400})
sr.reveal('.hero__badge', {delay: 100})
sr.reveal('.hero__subtitle', {delay: 300})
sr.reveal('.hero__cta', {delay: 500})
sr.reveal('.card', {interval: 100})





