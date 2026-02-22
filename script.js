document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if you don't want it to repeat backwards
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
});

// Handle Contact Form Submission via Mailto
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const recipient = 'leidenfrostconsulting@gmail.com';
    const subject = encodeURIComponent('I need support (Stop Smoking Sakartvelo)');
    
    const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
    
    // Open default mail client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Provide user feedback
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Redirecting to your mail client...';
    formStatus.classList.remove('hidden');
    formStatus.classList.add('text-green-400');
    
    // Reset form after a delay
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        formStatus.classList.add('hidden');
    }, 5000);
}
