// Password is set to the date you first met (change this!)
// Format: DDMMYYYY - Example: 15072021 for July 15, 2021
const PASSWORD = "CZepAB"; // CHANGE THIS TO YOUR ACTUAL DATE

// DOM Elements
const passwordScreen = document.getElementById('password-screen');
const birthdayScreen = document.getElementById('birthday-screen');
const photosScreen = document.getElementById('photos-screen');
const giftScreen = document.getElementById('gift-screen');
const passwordInput = document.getElementById('password');
const submitPasswordBtn = document.getElementById('submit-password');
const showPhotosBtn = document.getElementById('show-photos');
const showGiftBtn = document.getElementById('show-gift');
const backToStartBtn = document.getElementById('back-to-start');

// Change the name here
document.getElementById('your-name').textContent = "Mimo"; // CHANGE TO YOUR NAME

// Set up event listeners
submitPasswordBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

showPhotosBtn.addEventListener('click', showPhotos);
showGiftBtn.addEventListener('click', showGift);
backToStartBtn.addEventListener('click', goBackToStart);

// Check password function
function checkPassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === PASSWORD) {
        // Correct password
        passwordScreen.classList.add('hidden');
        birthdayScreen.classList.remove('hidden');
        
        // Start playing music
        if (!musicPlaying) {
            toggleMusic();
        }
        
        // Add some confetti effect
        createConfetti();
    } else {
        // Wrong password - shake effect
        passwordInput.style.borderColor = '#ff0000';
        passwordInput.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
        
        // Show error message
        alert("That's not the right password! Hint: Our initials combined with 'ep' (your initials first, then mines).");
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Show photos screen
function showPhotos() {
    birthdayScreen.classList.add('hidden');
    photosScreen.classList.remove('hidden');
    
    // Add a little animation to photos
    const photos = document.querySelectorAll('.photo-item');
    photos.forEach((photo, index) => {
        photo.style.opacity = '0';
        photo.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            photo.style.transition = 'opacity 0.8s, transform 0.8s';
            photo.style.opacity = '1';
            photo.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Show gift screen
function showGift() {
    photosScreen.classList.add('hidden');
    giftScreen.classList.remove('hidden');
    
    // Animate gift box opening
    const giftBox = document.querySelector('.gift-box');
    giftBox.style.animation = 'none';
    
    setTimeout(() => {
        giftBox.style.transition = 'transform 1s';
        giftBox.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            giftBox.style.transform = 'scale(1)';
            giftBox.style.animation = 'bounce 2s infinite';
        }, 1000);
    }, 300);
}

// Go back to start
function goBackToStart() {
    giftScreen.classList.add('hidden');
    passwordScreen.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
}


// Create confetti effect
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Create new confetti elements
    const confettiTypes = ['fas fa-heart', 'fas fa-star', 'fas fa-birthday-cake', 'fas fa-gift'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('i');
        confetti.className = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        confetti.style.color = getRandomColor();
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 1;
        
        confetti.style.animation = `fall ${animationDuration}s linear ${animationDelay}s forwards`;
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
    
    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Helper function for random colors
function getRandomColor() {
    const colors = ['#ff6b8b', '#ff99ac', '#ffccd5', '#ff8fab', '#fb6f92'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize - set focus on password input
window.onload = function() {
    passwordInput.focus();
    
    // Add shake animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
};