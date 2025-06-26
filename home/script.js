// Popular destinations data
const popularDestinations = [
    {
        image: "../image/binhthuan.jpg",
        title: "Khám phá đồi cát bay Mũi Né bằng xe Jeep",
        location: "Bình Thuận, Việt Nam",
        rating: "4.9",
        reviews: "124",
        days: "1",
        tours: "80+"
    },
    {
        image: "../image/vinhhalong.jpg",
        title: "Chèo thuyền kayak vịnh Hạ Long",
        location: "Quảng Ninh, Việt Nam",
        rating: "4.8",
        reviews: "310",
        days: "2",
        tours: "150+"
    },
    {
        image: "../image/danang.jpg",
        title: "City Tour tham quan thành phố Đà Nẵng",
        location: "Đà Nẵng, Việt Nam",
        rating: "4.7",
        reviews: "200",
        days: "1",
        tours: "90+"
    },
    {
        image: "../image/cantho.jpg",
        title: "Tour tham quan Cần Thơ – Chợ nổi Cái Răng",
        location: "Cần Thơ, Việt Nam",
        rating: "4.6",
        reviews: "178",
        days: "1",
        tours: "60+"
    },
    {
        image: "../image/ninhbinh.png",
        title: "Trekking vườn quốc gia Cúc Phương",
        location: "Ninh Bình, Việt Nam",
        rating: "4.9",
        reviews: "98",
        days: "2",
        tours: "30+"
    },
    {
        image: "../image/hoian.jpg",
        title: "Khám phá Hội An về đêm bằng thuyền hoa đăng",
        location: "Quảng Nam, Việt Nam",
        rating: "4.8",
        reviews: "212",
        days: "1",
        tours: "100+"
    },
    {
        image: "../image/yenbai.jpg",
        title: "Trải nghiệm ruộng bậc thang Mù Cang Chải",
        location: "Yên Bái, Việt Nam",
        rating: "4.9",
        reviews: "150",
        days: "3",
        tours: "40+"
    },
    {
        image: "../image/laocai.jpg",
        title: "Lên đỉnh Fansipan bằng cáp treo và leo bộ",
        location: "Lào Cai, Việt Nam",
        rating: "4.8",
        reviews: "267",
        days: "2",
        tours: "70+"
    }
];

// Popular cities data
const popularCities = [
    { name: "Hà Nội", tours: "300+", image: "../image/hanoi.jpg" },
    { name: "Đà Nẵng", tours: "250+", image: "../image/danang.jpg" },
    { name: "TP. Hồ Chí Minh", tours: "400+", image: "../image/hochiminh.jpg" },
    { name: "Hội An", tours: "200+", image: "../image/hoian.jpg" },
    { name: "Sapa", tours: "150+", image: "../image/sapa.jpg" },
    { name: "Phú Quốc", tours: "300+", image: "../image/phuquoc.jpg" },
    { name: "Nha Trang", tours: "220+", image: "../image/nhatrang.jpg" },
    { name: "Hạ Long", tours: "280+", image: "../image/vinhhalong.jpg" }
];

// Function to create destination card HTML
function createDestinationCard(destination) {
    return `
        <div class="destination-card">
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.title}" class="destination-img">
                <div class="heart-icon">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="destination-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${destination.location}</span>
            </div>
            <div class="destination-content">
                <h3 class="destination-title">${destination.title}</h3>
                <div class="destination-rating">
                    <div class="stars">
                        ${Array(5).fill('<i class="fas fa-star star"></i>').join('')}
                    </div>
                    <span class="rating-text">${destination.rating} (${destination.reviews})</span>
                </div>
                <div class="destination-footer">
                    <div class="destination-duration">
                        <i class="far fa-clock"></i>
                        <span class="duration-text">${destination.days} days</span>
                    </div>
                    <span class="tours-count">${destination.tours} tours</span>
                </div>
            </div>
        </div>
    `;
}

// Function to create city item HTML
function createCityItem(city) {
    return `
        <div class="city-item">
            <div class="city-image">
                <img src="${city.image}" alt="${city.name}" class="city-img">
            </div>
            <h3 class="city-name">${city.name}</h3>
            <p class="city-tours">${city.tours} Tours</p>
        </div>
    `;
}

// Function to populate destinations
function populateDestinations() {
    const destinationsGrid = document.getElementById('destinations-grid');
    if (destinationsGrid) {
        destinationsGrid.innerHTML = popularDestinations.map(createDestinationCard).join('');
    }
}

// Function to populate cities
function populateCities() {
    const citiesGrid = document.getElementById('cities-grid');
    if (citiesGrid) {
        citiesGrid.innerHTML = popularCities.map(createCityItem).join('');
    }
}

// Function to handle heart icon clicks
function handleHeartClicks() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.heart-icon')) {
            const heartIcon = e.target.closest('.heart-icon').querySelector('i');
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = '#e74c3c';
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = 'black';
            }
        }
    });
}

// Function to handle search functionality
function handleSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInputs = document.querySelectorAll('.search-input, .search-field');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add search functionality here
            console.log('Search clicked');
            // You can add actual search logic here
        });
    }
    
    // Handle header search
    const headerSearchInput = document.querySelector('.header .search-input');
    if (headerSearchInput) {
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Add search functionality here
                console.log('Header search:', this.value);
            }
        });
    }
}

// Function to add smooth scrolling to navigation links
function addSmoothScrolling() {
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
}

// Function to add scroll effects
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.destination-card, .benefit-item, .city-item, .travel-benefit-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Function to handle responsive navigation
function handleResponsiveNav() {
    // Add mobile menu functionality if needed
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

// Function to add loading animation
function addLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Function to handle form interactions
function handleFormInteractions() {
    const searchFields = document.querySelectorAll('.search-field');
    
    searchFields.forEach(field => {
        field.addEventListener('click', function() {
            // Add active state styling
            this.style.backgroundColor = '#f8f9fa';
            
            // Remove active state after a short delay
            setTimeout(() => {
                this.style.backgroundColor = 'transparent';
            }, 200);
        });
    });
}

// Function to add hover effects
function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.destination-card, .city-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateDestinations();
    populateCities();
    handleHeartClicks();
    handleSearch();
    addSmoothScrolling();
    addScrollEffects();
    handleResponsiveNav();
    addLoadingAnimation();
    handleFormInteractions();
    addHoverEffects();
    
    console.log('TravelShare website initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', function() {
    // Add any resize-specific functionality here
    console.log('Window resized');
});

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
    });
});