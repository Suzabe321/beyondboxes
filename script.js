// Constants
const CONSTANTS = {
    MIN_FONT_SIZE: 12,
    MAX_FONT_SIZE: 24,
    DEFAULT_FONT_SIZE: 16,
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    WHATSAPP_NUMBER: '917406839266'
};

// Utility Functions
const createElement = (tag, options = {}) => {
    const element = document.createElement(tag);
    Object.assign(element, options);
    return element;
};

const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('LocalStorage is not available:', e);
    }
};

const getFromLocalStorage = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (e) {
        console.warn('LocalStorage is not available:', e);
        return defaultValue;
    }
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

        @keyframes slideIn {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
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

        .settings-panel.active {
            animation: slideIn 0.3s ease forwards;
        }
    `;
    document.head.appendChild(style);
};

// Toast Notification System
class ToastNotification {
    constructor() {
        this.queue = [];
        this.isShowing = false;
    }

    show(message, duration = CONSTANTS.TOAST_DURATION) {
        this.queue.push({ message, duration });
        if (!this.isShowing) {
            this.showNext();
        }
    }

    showNext() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }

        this.isShowing = true;
        const { message, duration } = this.queue.shift();
        const toast = createElement('div', {
            className: 'toast-message',
            textContent: message,
            style: 'animation: fadeIn 0.3s ease'
        });

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                toast.remove();
                this.showNext();
            }, CONSTANTS.ANIMATION_DURATION);
        }, duration);
    }
}

const toast = new ToastNotification();

// WhatsApp Integration
const initWhatsAppButtons = () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const message = encodeURIComponent(`I'm interested in the ${productName}`);
            const whatsappURL = `https://wa.me/${CONSTANTS.WHATSAPP_NUMBER}?text=${message}`;
            
            window.open(whatsappURL, '_blank');
            toast.show('Opening WhatsApp...');
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

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!settingsPanel.contains(e.target) && 
                !settingsToggle.contains(e.target) && 
                settingsPanel.classList.contains('active')) {
                settingsPanel.classList.remove('active');
            }
        });
    }
};

// Theme Management
const initThemeManagement = () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        saveToLocalStorage('theme', theme);
        toast.show(`Theme changed to ${theme}`);
    };

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.theme);
        });
    });

    // Load saved theme
    const savedTheme = getFromLocalStorage('theme', 'light');
    applyTheme(savedTheme);
};

// Text Size Management
const initTextSizeControls = () => {
    let currentSize = parseInt(getFromLocalStorage('fontSize', CONSTANTS.DEFAULT_FONT_SIZE));
    const decreaseText = document.getElementById('decrease-text');
    const increaseText = document.getElementById('increase-text');
    const resetText = document.getElementById('reset-text');

    const updateFontSize = (size) => {
        document.documentElement.style.fontSize = `${size}px`;
        saveToLocalStorage('fontSize', size);
        toast.show(`Font size: ${size}px`);
    };

    if (decreaseText && increaseText && resetText) {
        decreaseText.addEventListener('click', () => {
            if (currentSize > CONSTANTS.MIN_FONT_SIZE) {
                currentSize -= 2;
                updateFontSize(currentSize);
            }
        });

        increaseText.addEventListener('click', () => {
            if (currentSize < CONSTANTS.MAX_FONT_SIZE) {
                currentSize += 2;
                updateFontSize(currentSize);
            }
        });

        resetText.addEventListener('click', () => {
            currentSize = CONSTANTS.DEFAULT_FONT_SIZE;
            updateFontSize(currentSize);
        });

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
        const updateAnimationSpeed = (speed) => {
            document.documentElement.style.setProperty('--animation-speed', speed);
            saveToLocalStorage('animationSpeed', speed);
            toast.show(`Animation speed: ${speed === '0.3s' ? 'Fast' : speed === '0.9s' ? 'Slow' : 'Normal'}`);
        };

        speedSelect.addEventListener('change', () => {
            updateAnimationSpeed(speedSelect.value);
        });

        // Load saved animation speed
        const savedSpeed = getFromLocalStorage('animationSpeed', '0.6s');
        speedSelect.value = savedSpeed;
        updateAnimationSpeed(savedSpeed);
    }
};

// Error Handling
const handleError = (error) => {
    console.error('An error occurred:', error);
    toast.show('Something went wrong. Please try again.', 5000);
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    try {
        createAnimationStyles();
        initWhatsAppButtons();
        initSettingsPanel();
        initThemeManagement();
        initTextSizeControls();
        initProductGallery();
        initAnimationSpeed();
    } catch (error) {
        handleError(error);
    }
});

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
        img.src = 'placeholder.jpg'; // Add a placeholder image
        handleError(new Error(`Failed to load image: ${img.src}`));
    });
});
