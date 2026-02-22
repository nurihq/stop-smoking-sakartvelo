document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Logic
    const langBtn = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-en]');

    // Default to Georgian ('ka') per requirements
    let currentLang = localStorage.getItem('lang') || 'ka';

    function updateLanguage() {
        // Toggle text logic: if current is Ka, button should show US flag to switch to English
        langBtn.textContent = currentLang === 'ka' ? '🇺🇸' : '🇬🇪';

        // Ensure the html lang attribute is correct for accessibility
        document.documentElement.lang = currentLang;

        // Update text content for all elements with data attributes
        translatableElements.forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation) {
                // Determine if it needs to update placeholder (for inputs) or innerHTML/textContent
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.hasAttribute('placeholder')) {
                        el.placeholder = translation; // Update placeholder if needed
                    }
                } else if (el.tagName === 'TITLE') {
                    document.title = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Save preference
        localStorage.setItem('lang', currentLang);
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ka' ? 'en' : 'ka';
        updateLanguage();
    });

    // Initialize language on load
    updateLanguage();

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
});

// Helper to scroll smoothly to sections
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// 3. Handle Contact Form Submission via Mailto
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const recipient = 'leidenfrostconsulting@gmail.com';
    const subject = encodeURIComponent('Support Request (Stop Smoking Sakartvelo)');

    const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);

    // Track form submission
    if (window.gtag) {
        gtag('event', 'send_mailto', { 'event_category': 'conversion' });
    }

    // Open default mail client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Provide user feedback
    const formStatus = document.getElementById('formStatus');
    const currentLang = localStorage.getItem('lang') || 'ka';
    formStatus.textContent = currentLang === 'en' ? 'Opening your mail client...' : 'იხსნება თქვენი ფოსტის აპლიკაცია...';
    formStatus.classList.remove('hidden');

    // Reset form after a delay
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        formStatus.classList.add('hidden');
    }, 5000);
}
