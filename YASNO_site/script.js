document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let currentSlideIndex = 0;

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = index;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveCarousel(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveCarousel(1));
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    setInterval(() => {
        moveCarousel(1);
    }, 5000);
});

function toggleHall(hallItem) {
    const isActive = hallItem.classList.contains('active');
    
    document.querySelectorAll('.hall-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        hallItem.classList.add('active');
    }
}

let currentImageIndex = 0;
let sportsCarouselPosition = 0;
let sportsCarouselInterval;

function moveGallery(direction) {
    moveSportsCarousel(direction);
}

function goToImage(index) {
    // Not used anymore
}

function moveSportsCarousel(direction) {
    const track = document.querySelector('.sports-carousel-track-horizontal');
    const images = document.querySelectorAll('.sports-carousel-track-horizontal img');
    
    if (!track || images.length === 0) return;
    
    const imageWidth = images[0].offsetWidth + 32; // width + gap
    const containerWidth = document.querySelector('.sports-carousel-wrapper').offsetWidth;
    const maxPosition = -(images.length * imageWidth - containerWidth);
    
    sportsCarouselPosition += direction * imageWidth;
    
    // Loop back to start/end
    if (sportsCarouselPosition > 0) {
        sportsCarouselPosition = maxPosition;
    } else if (sportsCarouselPosition < maxPosition) {
        sportsCarouselPosition = 0;
    }
    
    track.style.transform = `translateX(${sportsCarouselPosition}px)`;
    
    // Reset auto-scroll timer
    clearInterval(sportsCarouselInterval);
    startSportsCarouselAutoScroll();
}

function startSportsCarouselAutoScroll() {
    sportsCarouselInterval = setInterval(() => {
        moveSportsCarousel(-1);
    }, 4000); // Auto-scroll every 4 seconds
}

// Old functions for compatibility
function moveSportsGallery(direction) {
    moveSportsCarousel(direction);
}

function goToSportsImage(index) {
    // Not used anymore
}

// Start auto-scroll when page loads
document.addEventListener('DOMContentLoaded', () => {
    startSportsCarouselAutoScroll();
});

let currentFoodImageIndex = 0;
let foodCarouselPosition = 0;
let foodCarouselInterval;

function moveFoodGallery(direction) {
    moveFoodCarousel(direction);
}

function goToFoodImage(index) {
    // Not used anymore
}

function moveFoodCarousel(direction) {
    const track = document.querySelector('.food-carousel-track-horizontal');
    const images = document.querySelectorAll('.food-carousel-track-horizontal img');
    
    if (!track || images.length === 0) return;
    
    const imageWidth = images[0].offsetWidth + 32; // width + gap
    const containerWidth = document.querySelector('.sports-carousel-wrapper').offsetWidth;
    const maxPosition = -(images.length * imageWidth - containerWidth);
    
    foodCarouselPosition += direction * imageWidth;
    
    // Loop back to start/end
    if (foodCarouselPosition > 0) {
        foodCarouselPosition = maxPosition;
    } else if (foodCarouselPosition < maxPosition) {
        foodCarouselPosition = 0;
    }
    
    track.style.transform = `translateX(${foodCarouselPosition}px)`;
    
    // Reset auto-scroll timer
    clearInterval(foodCarouselInterval);
    startFoodCarouselAutoScroll();
}

function startFoodCarouselAutoScroll() {
    foodCarouselInterval = setInterval(() => {
        moveFoodCarousel(-1);
    }, 4000); // Auto-scroll every 4 seconds
}

// Start auto-scroll when page loads
document.addEventListener('DOMContentLoaded', () => {
    startFoodCarouselAutoScroll();
});

const cat = document.getElementById('cat');
const catImage = cat.querySelector('img');
const phrases = [
    'Мрр! Приезжайте к нам! 🐾',
    'Мурр-мурр! Отдых ждёт вас! 😺',
    'Мяу! У нас уютно! 🏡',
    'Мрр! Баня, природа, покой! 🌿',
    'Мурчу от счастья! Ждём вас! ✨'
];

function checkCatPosition() {
    const catRect = cat.getBoundingClientRect();
    const sportsSection = document.getElementById('sports');
    
    if (sportsSection) {
        const sportsRect = sportsSection.getBoundingClientRect();
        
        // Проверяем, находится ли котик в области спортивной секции
        if (catRect.left >= sportsRect.left - 100 && catRect.left <= sportsRect.right + 100 &&
            catRect.top >= sportsRect.top - 200 && catRect.top <= sportsRect.bottom + 200) {
            // Меняем костюм и фразу
            catImage.src = 'images/kotik1.png';
            const speechBubble = cat.querySelector('.cat-speech-bubble');
            speechBubble.textContent = 'Надо подкачаться, хихихи! 💪';
            return true;
        }
    }
    return false;
}

function startCatWalk() {
    // Возвращаем обычный костюм
    catImage.src = 'images/kotik.png';
    
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const speechBubble = cat.querySelector('.cat-speech-bubble');
    speechBubble.textContent = randomPhrase;
    
    cat.style.animation = 'catWalk 15s linear';
    
    // Проверяем позицию котика каждые 100мс
    const positionCheckInterval = setInterval(() => {
        if (checkCatPosition()) {
            cat.classList.add('speaking');
        }
    }, 100);
    
    setTimeout(() => {
        cat.classList.add('speaking');
    }, 6000);
    
    setTimeout(() => {
        cat.classList.remove('speaking');
    }, 9000);
    
    setTimeout(() => {
        clearInterval(positionCheckInterval);
        cat.style.animation = 'none';
        cat.style.left = '-150px';
        
        const nextWalkDelay = Math.random() * 20000 + 15000;
        setTimeout(startCatWalk, nextWalkDelay);
    }, 15000);
}

cat.addEventListener('click', () => {
    cat.classList.add('speaking');
    setTimeout(() => {
        cat.classList.remove('speaking');
    }, 3000);
});

setTimeout(startCatWalk, 3000);

// Photo Carousel with manual and auto controls
let photoCarouselPosition = 0;
let photoCarouselInterval;

function movePhotoCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-track img');
    
    if (!track || images.length === 0) return;
    
    const imageWidth = images[0].offsetWidth + 32; // width + gap
    const containerWidth = document.querySelector('.carousel-track-container').offsetWidth;
    const maxPosition = -(images.length * imageWidth - containerWidth);
    
    photoCarouselPosition += direction * imageWidth;
    
    // Loop back to start/end
    if (photoCarouselPosition > 0) {
        photoCarouselPosition = maxPosition;
    } else if (photoCarouselPosition < maxPosition) {
        photoCarouselPosition = 0;
    }
    
    track.style.transform = `translateX(${photoCarouselPosition}px)`;
    
    // Reset auto-scroll timer
    clearInterval(photoCarouselInterval);
    startPhotoCarouselAutoScroll();
}

function startPhotoCarouselAutoScroll() {
    photoCarouselInterval = setInterval(() => {
        movePhotoCarousel(-1);
    }, 4000); // Auto-scroll every 4 seconds
}

// Start auto-scroll when page loads
document.addEventListener('DOMContentLoaded', () => {
    startPhotoCarouselAutoScroll();
});

// Image Modal Functions
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modal.classList.add('active');
    
    // Stop carousel auto-scroll when modal is open
    clearInterval(photoCarouselInterval);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    // Restart carousel auto-scroll
    startPhotoCarouselAutoScroll();
}


let currentAboutImageIndex = 0;

function moveAboutGallery(direction) {
    const images = document.querySelectorAll('.about-gallery-image');
    const dots = document.querySelectorAll('.about-photo .gallery-dot');
    
    if (images.length === 0) return;
    
    images[currentAboutImageIndex].classList.remove('active');
    dots[currentAboutImageIndex].classList.remove('active');
    
    currentAboutImageIndex += direction;
    
    if (currentAboutImageIndex >= images.length) {
        currentAboutImageIndex = 0;
    } else if (currentAboutImageIndex < 0) {
        currentAboutImageIndex = images.length - 1;
    }
    
    images[currentAboutImageIndex].classList.add('active');
    dots[currentAboutImageIndex].classList.add('active');
}

function goToAboutImage(index) {
    const images = document.querySelectorAll('.about-gallery-image');
    const dots = document.querySelectorAll('.about-photo .gallery-dot');
    
    if (images.length === 0) return;
    
    images[currentAboutImageIndex].classList.remove('active');
    dots[currentAboutImageIndex].classList.remove('active');
    
    currentAboutImageIndex = index;
    
    images[currentAboutImageIndex].classList.add('active');
    dots[currentAboutImageIndex].classList.add('active');
}


// Fullscreen Photo Carousel Auto-rotation
let currentPhotoIndex = 0;

function rotatePhotoCarousel() {
    const slides = document.querySelectorAll('.fullscreen-carousel .carousel-slide');
    
    if (slides.length === 0) return;
    
    slides[currentPhotoIndex].classList.remove('active');
    
    currentPhotoIndex = (currentPhotoIndex + 1) % slides.length;
    
    slides[currentPhotoIndex].classList.add('active');
}

// Start photo carousel rotation
setInterval(rotatePhotoCarousel, 3000); // Change photo every 3 seconds


// Video Carousel
let videoCarouselPosition = 0;

function moveVideoCarousel(direction) {
    const track = document.querySelector('.video-carousel-track');
    const videos = document.querySelectorAll('.video-item');
    
    if (!track || videos.length === 0) return;
    
    const videoWidth = videos[0].offsetWidth + 32; // width + gap
    const containerWidth = document.querySelector('.video-carousel-wrapper').offsetWidth;
    const maxPosition = -(videos.length * videoWidth - containerWidth);
    
    videoCarouselPosition += direction * videoWidth;
    
    // Loop back to start/end
    if (videoCarouselPosition > 0) {
        videoCarouselPosition = maxPosition;
    } else if (videoCarouselPosition < maxPosition) {
        videoCarouselPosition = 0;
    }
    
    track.style.transform = `translateX(${videoCarouselPosition}px)`;
}


// Rooms Gallery
let currentRoomsImageIndex = 0;

function moveRoomsGallery(direction) {
    const images = document.querySelectorAll('.rooms-gallery-image');
    const dots = document.querySelectorAll('.rooms-gallery-centered .gallery-dot');
    
    if (images.length === 0) return;
    
    images[currentRoomsImageIndex].classList.remove('active');
    if (dots.length > 0) {
        dots[currentRoomsImageIndex].classList.remove('active');
    }
    
    currentRoomsImageIndex += direction;
    
    if (currentRoomsImageIndex >= images.length) {
        currentRoomsImageIndex = 0;
    } else if (currentRoomsImageIndex < 0) {
        currentRoomsImageIndex = images.length - 1;
    }
    
    images[currentRoomsImageIndex].classList.add('active');
    if (dots.length > 0) {
        dots[currentRoomsImageIndex].classList.add('active');
    }
}

function goToRoomsImage(index) {
    const images = document.querySelectorAll('.rooms-gallery-image');
    const dots = document.querySelectorAll('.rooms-gallery-centered .gallery-dot');
    
    if (images.length === 0) return;
    
    images[currentRoomsImageIndex].classList.remove('active');
    if (dots.length > 0) {
        dots[currentRoomsImageIndex].classList.remove('active');
    }
    
    currentRoomsImageIndex = index;
    
    images[currentRoomsImageIndex].classList.add('active');
    if (dots.length > 0) {
        dots[currentRoomsImageIndex].classList.add('active');
    }
}


// Toggle Schedule Sections
function toggleSchedule(header) {
    const section = header.parentElement;
    const isActive = section.classList.contains('active');
    
    // Закрываем все секции
    document.querySelectorAll('.schedule-section').forEach(item => {
        item.classList.remove('active');
    });
    
    // Открываем текущую, если она была закрыта
    if (!isActive) {
        section.classList.add('active');
    }
}

// Toggle Price Sections
function togglePrice(header) {
    const section = header.parentElement;
    const isActive = section.classList.contains('active');
    
    // Закрываем все секции цен
    document.querySelectorAll('.price-section').forEach(item => {
        item.classList.remove('active');
    });
    
    // Открываем текущую, если она была закрыта
    if (!isActive) {
        section.classList.add('active');
    }
}

// Yoga Intro Carousel
let yogaIntroCarouselPosition = 0;

function moveYogaIntroCarousel(direction) {
    const track = document.querySelector('.yoga-intro-carousel-track');
    const images = document.querySelectorAll('.yoga-intro-carousel-track img');
    
    if (!track || images.length === 0) return;
    
    const imageWidth = images[0].offsetWidth + 32; // width + gap
    const containerWidth = document.querySelector('.yoga-intro-carousel-wrapper').offsetWidth;
    const maxPosition = -(images.length * imageWidth - containerWidth);
    
    yogaIntroCarouselPosition += direction * imageWidth;
    
    // Loop back to start/end
    if (yogaIntroCarouselPosition > 0) {
        yogaIntroCarouselPosition = maxPosition;
    } else if (yogaIntroCarouselPosition < maxPosition) {
        yogaIntroCarouselPosition = 0;
    }
    
    track.style.transform = `translateX(${yogaIntroCarouselPosition}px)`;
}

// Toggle Season Sections (for stoimost page)
function toggleSeason(header) {
    const season = header.parentElement;
    const isActive = season.classList.contains('active');
    
    // Закрываем все сезоны
    document.querySelectorAll('.stoimost-season').forEach(item => {
        item.classList.remove('active');
    });
    
    // Открываем текущий, если он был закрыт
    if (!isActive) {
        season.classList.add('active');
    }
}


// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});
