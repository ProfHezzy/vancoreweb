// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('connection-canvas');
    const ctx = canvas.getContext('2d');
    const centralLogo = document.querySelector('.central-logo-wrapper');
    const platformIcons = document.querySelectorAll('.platform-icon');

    function resizeCanvas() {
        canvas.width = document.querySelector('.icon-connection-wrapper').offsetWidth;
        canvas.height = document.querySelector('.icon-connection-wrapper').offsetHeight;
        drawLines();
    }


  function drawLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const startX = centralLogo.offsetLeft + centralLogo.offsetWidth / 2;
        const startY = centralLogo.offsetTop + centralLogo.offsetHeight / 2 + centralLogo.offsetHeight/4;

        platformIcons.forEach(icon => {
            const endX = icon.offsetLeft + icon.offsetWidth / 2;
            const endY = icon.offsetTop + icon.offsetHeight / 2;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
        });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawLines();
});

// Activate pricing period buttons
const pricingButtons = document.querySelectorAll('.btn-group .btn');
pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        pricingButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

const swiper = new Swiper(".testimonial-swiper", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
    autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    },
});

document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const button = header.querySelector('.expand-button');

      faqItem.classList.toggle('open');

      if (faqItem.classList.contains('open')) {
        button.textContent = '×';
      } else {
        button.textContent = '+';
      }
    });
  });



document.addEventListener('DOMContentLoaded', function() {
        const slider = document.querySelector('.slider-container');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Update slider position
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Navigation functions
        function goToSlide(index) {
            currentIndex = (index + slideCount) % slideCount;
            updateSlider();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-rotate (optional)
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
