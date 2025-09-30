document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Button click effect
    const ctaButton = document.getElementById('ctaButton');
    ctaButton.addEventListener('click', () => {
        alert('Thanks for clicking! Ready to explore?');
        ctaButton.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    });
});
