// ==========================
// CONFIG GLOBAL
// ==========================
const CONFIG = {
    offset: 80,
    activeClass: "active",
    hiddenClass: "hidden",
    showClass: "show"
};

// ==========================
// UTILIDADES
// ==========================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// throttle para performance
const throttle = (fn, limit) => {
    let waiting = false;
    return function (...args) {
        if (!waiting) {
            fn.apply(this, args);
            waiting = true;
            setTimeout(() => waiting = false, limit);
        }
    };
};

// ==========================
// SCROLL SUAVE (mejorado)
// ==========================
const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const y = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.offset;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        });
    });
};

// ==========================
// NAV ACTIVO (optimizado)
// ==========================
const initActiveNav = () => {
    const sections = $$("section[id]");
    const navLinks = $$(".nav-list a");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        CONFIG.activeClass,
                        link.getAttribute("href") === `#${id}`
                    );
                });
            }
        });
    }, {
        rootMargin: "-40% 0px -50% 0px"
    });

    sections.forEach(section => observer.observe(section));
};

// ==========================
// HEADER DINÁMICO
// ==========================
const initHeaderEffect = () => {
    const header = $(".header");

    const handleScroll = throttle(() => {
        const scrolled = window.scrollY > 30;

        header.classList.toggle("scrolled", scrolled);
    }, 100);

    window.addEventListener("scroll", handleScroll);
};

// ==========================
// ANIMACIONES (PRO)
// ==========================
const initAnimations = () => {
    const elements = $$("section, .project-card, .experience-item, .skill-card");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(CONFIG.showClass);
                observer.unobserve(entry.target); // performance 🔥
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        el.classList.add(CONFIG.hiddenClass);
        observer.observe(el);
    });
};

// ==========================
// BOTÓN SCROLL TOP
// ==========================
const initScrollTop = () => {
    const btn = document.createElement("button");
    btn.innerText = "↑";
    btn.className = "scroll-top";
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const toggleVisibility = throttle(() => {
        btn.classList.toggle("visible", window.scrollY > 400);
    }, 100);

    window.addEventListener("scroll", toggleVisibility);
};

// ==========================
// INIT APP
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initActiveNav();
    initHeaderEffect();
    initAnimations();
    initScrollTop();
});