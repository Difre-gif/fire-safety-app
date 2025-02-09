const pageContainer = document.getElementById('pageContainer');
const toSignUp = document.getElementById('toSignUp');
const toLogin = document.getElementById('toLogin');
const progress = document.getElementById('progress');
const steps = document.querySelectorAll('.step');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

let currentStep = 0;

toSignUp.addEventListener('click', () => {
    pageContainer.classList.add('flip');
    updateProgressBar(currentStep);
});

toLogin.addEventListener('click', () => {
    pageContainer.classList.remove('flip');
    updateProgressBar(currentStep);
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function updateProgressBar(step) {
    progress.style.width = `${(step / (steps.length - 1)) * 100}%`;
}

// Social login mockup
document.querySelector('.google-login').addEventListener('click', () => {
    alert('Google login clicked');
});

document.querySelector('.facebook-login').addEventListener('click', () => {
    alert('Facebook login clicked');
});