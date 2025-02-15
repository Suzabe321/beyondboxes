// Utility Functions
const createElement = (tag, options = {}) => {
    const element = document.createElement(tag);
    Object.assign(element, options);
    return element;
};

// Animation Styles
const createAnimationStyles = () => {
    const style = createElement('style');
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

        .toast-message {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--color-burgundy);
            color: var(--color-pearl);
            padding: 15px 30px;
            border-radius: 6px;
            z-index: 1000;
            font-family: 'Montserrat', sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);
};

// Toast Notification
const showToast = (message, duration = 3000) => {
    const toast = createElement('div', {
        className: 'toast-message',
        textContent: message,
        style: 'animation: fadeIn 0.3s ease'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// WhatsApp Integration
const initWhatsAppButtons = () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const message = encodeURIComponent(`I'm interested in the ${productName}`);
            const whatsappURL = `https://wa.me/917406839266?text=${message}`;
            
            window.open(whatsappURL, '_blank');
            showToast('Opening WhatsApp...');
        });
    });
};

// Settings Panel
const initSettingsPanel = () => {
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsPanel = document.querySelector('.settings-panel');
    const closeSettings = document.querySelector('.close-settings');

    if (settingsToggle && settingsPanel && closeSettings) {
        settingsToggle.addEventListener('click', () => {
            settingsPanel.classList.add('active');
        });

        closeSettings.addEventListener('click', () => {
            settingsPanel.classList.remove('active');
        });
    }
};

// Theme Management
const initThemeManagement = () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
};

// Text Size Management
const initTextSizeControls = () => {
    let currentSize = parseInt(localStorage.getItem('fontSize')) || 16;
    const decreaseText = document.getElementById('decrease-text');
    const increaseText = document.getElementById('increase-text');
    const resetText = document.getElementById('reset-text');

    const updateFontSize = (size) => {
        document.documentElement.style.fontSize = `${size}px`;
        localStorage.setItem('fontSize', size);
    };

    if (decreaseText && increaseText && resetText) {
        decreaseText.addEventListener('click', () => {
            if (currentSize > 12) {
                currentSize -= 2;
                updateFontSize(currentSize);
            }
        });

        increaseText.addEventListener('click', () => {
            if (currentSize < 24) {
                currentSize += 2;
                updateFontSize(currentSize);
            }
        });

        resetText.addEventListener('click', () => {
            currentSize = 16;
            updateFontSize(currentSize);
        });

        // Initialize with saved font size
        updateFontSize(currentSize);
    }
};

// Product Gallery
const initProductGallery = () => {
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    const mainImage = document.querySelector('.main-image img');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }
};

// Animation Speed
const initAnimationSpeed = () => {
    const speedSelect = document.getElementById('animation-speed');
    if (speedSelect) {
        speedSelect.addEventListener('change', () => {
            document.documentElement.style.setProperty('--animation-speed', speedSelect.value);
            localStorage.setItem('animationSpeed', speedSelect.value);
        });

        // Load saved animation speed
        const savedSpeed = localStorage.getItem('animationSpeed');
        if (savedSpeed) {
            speedSelect.value = savedSpeed;
            document.documentElement.style.setProperty('--animation-speed', savedSpeed);
        }
    }
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    createAnimationStyles();
    initWhatsAppButtons();
    initSettingsPanel();
    initThemeManagement();
    initTextSizeControls();
    initProductGallery();
    initAnimationSpeed();
});
