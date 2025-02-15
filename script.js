document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const message = encodeURIComponent(`I'm interested in the ${productName}`);
            const whatsappURL = `https://wa.me/917406839266?text=${message}`;
            
            // Open WhatsApp in a new window
            window.open(whatsappURL, '_blank');
            
            // Show confirmation message
            const confirmMessage = document.createElement('div');
            confirmMessage.textContent = 'Opening WhatsApp...';
            confirmMessage.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #722F37;
                color: #F8F3F1;
                padding: 15px 30px;
                border-radius: 6px;
                z-index: 1000;
                font-family: 'Montserrat', sans-serif;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                animation: fadeIn 0.3s ease;
            `;
            
            document.body.appendChild(confirmMessage);
            
            setTimeout(() => {
                confirmMessage.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    confirmMessage.remove();
                }, 300);
            }, 2700);
        });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
        }
    `;
    document.head.appendChild(style);
});
// Add to your existing script.js

// Settings Panel
const settingsToggle = document.querySelector('.settings-toggle');
const settingsPanel = document.querySelector('.settings-panel');
const closeSettings = document.querySelector('.close-settings');

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.add('active');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
});

// Theme Switching
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', button.dataset.theme);
        localStorage.setItem('theme', button.dataset.theme);
    });
});

// Text Size
let currentSize = 16;
const decreaseText = document.getElementById('decrease-text');
const increaseText = document.getElementById('increase-text');
const resetText = document.getElementById('reset-text');

decreaseText.addEventListener('click', () => {
    if (currentSize > 12) {
        currentSize -= 2;
        document.documentElement.style.fontSize = currentSize + 'px';
    }
});

increaseText.addEventListener('click', () => {
    if (currentSize < 24) {
        currentSize += 2;
        document.documentElement.style.fontSize = currentSize + 'px';
    }
});

resetText.addEventListener('click', () => {
    currentSize = 16;
    document.documentElement.style.fontSize = currentSize + 'px';
});

// Animation Speed
const speedSelect = document.getElementById('animation-speed');
speedSelect.addEventListener('change', () => {
    document.documentElement.style.setProperty('--animation-speed', speedSelect.value);
});

// Product Gallery
const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
const mainImage = document.querySelector('.main-image img');

if (thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

// Load saved preferences
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});
