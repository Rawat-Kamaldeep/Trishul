document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    
    let currentIndex = 0;
    const slideWidth = 100; // 100%
    
    // Set initial position
    updateCarouselPosition();
    
    // Add event listeners to all prev buttons
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
            } else {
                // Loop to the last slide
                currentIndex = slides.length - 1;
                updateCarouselPosition();
            }
        });
    });
    
    // Add event listeners to all next buttons
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarouselPosition();
            } else {
                // Loop to the first slide
                currentIndex = 0;
                updateCarouselPosition();
            }
        });
    });
    
    function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
});