const menuButton = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navAnchors = [...document.querySelectorAll('.nav-links a')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function closeMenu(restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');

    if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navLinks.classList.toggle('active', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);

    if (!isOpen) navAnchors[0].focus();
});

navAnchors.forEach((link) => link.addEventListener('click', () => closeMenu()));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu(true);
    }

    if (event.key === 'Tab' && navLinks.classList.contains('active')) {
        const focusable = [menuButton, ...navAnchors];
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

const revealItems = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));
}

const sections = document.querySelectorAll('main section[id]');
const navById = new Map(navAnchors.map((link) => [link.getAttribute('href').slice(1), link]));

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleSection) return;

        navAnchors.forEach((link) => link.removeAttribute('aria-current'));
        navById.get(visibleSection.target.id)?.setAttribute('aria-current', 'true');
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.6] });

    sections.forEach((section) => sectionObserver.observe(section));
}

const rotatingRole = document.querySelector('.typed-text');

if (rotatingRole && !prefersReducedMotion) {
    const roles = rotatingRole.dataset.roles.split(',');
    let roleIndex = 0;

    window.setInterval(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        rotatingRole.textContent = roles[roleIndex];
    }, 2800);
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
