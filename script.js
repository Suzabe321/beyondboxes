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
            
            // Show confirmation message
            const confirmMessage = document.createElement('div');
            confirmMessage.textContent = 'Opening WhatsApp...';
            confirmMessage.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 1000;
            `;
            
            document.body.appendChild(confirmMessage);
            
            // Remove the message after 3 seconds
            setTimeout(() => {
                confirmMessage.remove();
            }, 3000);
        });
    });

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
