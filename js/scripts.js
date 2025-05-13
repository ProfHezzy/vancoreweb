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


//----------------Image Slide-----------------------
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const wrapper = document.querySelector('.slider-wrapper');

    let currentIndex = 0;
    const slideCount = slides.length;
    let isSliding = false; // To prevent multiple quick clicks

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Update slider position
    function updateSlider(index) {
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.slider-dots .dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Go to a specific slide
    function goToSlide(index) {
        if (isSliding) return;
        isSliding = true;

        currentIndex = (index + slideCount) % slideCount;  //handle negative and positive index
        updateSlider(currentIndex);

        setTimeout(() => {
            isSliding = false;
        }, 1000); // 0.5s transition
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

        // Auto-rotate, but continuous
    let slideInterval = setInterval(nextSlide, 3000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    });

    updateSlider(currentIndex); // Initialize slider position
});


document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const stepNumbers = document.querySelectorAll(".step-number");
    const stepLines = document.querySelectorAll(".step-line");
    const sideTexts = document.querySelectorAll(".side");
    const headings = document.querySelectorAll(".side h5");
    const paragraphs = document.querySelectorAll(".side p");

    // Function to animate a step
    function animateStep(index) {
        stepNumbers[index].classList.add("active");
        setTimeout(() => {
            if (stepLines[index]) {
                stepLines[index].classList.add("active");
                stepLines[index].style.height = "100%";
            }
        }, 300);
        setTimeout(() => {
            sideTexts[index].classList.add("active");
        }, 600);
        setTimeout(() => {
            headings[index].classList.add("active");
        }, 900);
        setTimeout(() => {
            paragraphs[index].classList.add("active");
        }, 1200);
    }

    // Function to reset a step
    function resetStep(index) {
        stepNumbers[index].classList.remove("active");
        if (stepLines[index]) {
            stepLines[index].classList.remove("active");
            stepLines[index].style.height = "0";
        }
        sideTexts[index].classList.remove("active");
        headings[index].classList.remove("active");
        paragraphs[index].classList.remove("active");
    }

    // Intersection Observer setup
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const step = entry.target.closest(".step");
                if (step) {
                    const index = Array.from(steps).indexOf(step);
                    if (entry.isIntersecting) {
                        animateStep(index);
                    } else {
                        resetStep(index); // so it replays when back in view
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    // Observe each step
    steps.forEach((step) => observer.observe(step));

    // Reset everything on load
    steps.forEach((_, index) => resetStep(index));
});

const overlay = document.getElementById('image-overlay');
        const images = [
            'images/hero-mockup.png', // Placeholder 1
            'images/hero-mockup.png'  // Placeholder 2
        ];
        let currentImageIndex = 0;

        function swapImages() {
            overlay.style.backgroundImage = `url(${images[currentImageIndex]})`;
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }

        // Initial image load
        swapImages();

        // Change image every 3 seconds
        setInterval(swapImages, 3000);
