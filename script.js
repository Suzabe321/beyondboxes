document.addEventListener('DOMContentLoaded', function() {
    // Get all order buttons
    const orderButtons = document.querySelectorAll('.order-btn');
    
    // Add click event listener to each button
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const message = encodeURIComponent(`I'm interested in the ${productName}`);
            const whatsappURL = `https://wa.me/917406839266?text=${message}`;
            
            // Open WhatsApp in a new window
            window.open(whatsappURL, '_blank');
            
            // Show confirmation message with luxury styling
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
                font-family: 'Playfair Display', serif;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                font-size: 16px;
                letter-spacing: 1px;
                animation: fadeIn 0.3s ease;
            `;
            
            document.body.appendChild(confirmMessage);
            
            // Remove the message after 3 seconds with fade out animation
            setTimeout(() => {
                confirmMessage.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    confirmMessage.remove();
                }, 300);
            }, 2700);
        });
    });

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 25px rgba(75, 56, 50, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(75, 56, 50, 0.1)';
        });
    });

    // Add CSS animations to the head
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

        .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .order-btn {
            transition: all 0.3s ease;
        }

        .order-btn:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
