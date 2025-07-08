document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.faith-slider');
    const cards = document.querySelectorAll('.faith-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    // Set initial positions
    updateSlider();
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cardCount - 1;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < cardCount - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            // Swipe left
            currentIndex = (currentIndex < cardCount - 1) ? currentIndex + 1 : 0;
            updateSlider();
        } else if (difference < -50) {
            // Swipe right
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cardCount - 1;
            updateSlider();
        }
    }
    
    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Hide controls on desktop
        if (window.innerWidth >= 992) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            slider.style.transform = 'translateX(0)';
        } else {
            updateSlider();
        }
    });
});