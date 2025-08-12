// ===============================
// EVERYTHING PSJ SCRIPT
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initScrollAnimations();
    initCardInteractions();
    initSmoothScrolling();
    initParallaxEffects();
    
    // Add loading animation to cards
    addLoadingAnimation();
});

// ===============================
// SCROLL ANIMATIONS
// ===============================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect to cards within the same container
                if (entry.target.classList.contains('work-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.work-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all work cards
    document.querySelectorAll('.work-card').forEach(card => {
        observer.observe(card);
    });

    // Observe year sections
    document.querySelectorAll('.year-section').forEach(section => {
        observer.observe(section);
    });
}

// ===============================
// CARD INTERACTIONS
// ===============================
function initCardInteractions() {
    const cards = document.querySelectorAll('.work-card');
    
    cards.forEach(card => {
        // Click handler for cards
        card.addEventListener('click', function (e) {
    // If clicking a link inside, follow that link normally
    if (e.target.classList.contains('card-link')) {
        return;
    }

    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);

    // Redirect after the animation
    setTimeout(() => {
        // Option 1: Redirect to a fixed page
        //window.location.href = "{placeholder}.html";

        //Option 2: If your card contains a link, follow it
         let link = this.querySelector('.card-link');
        if (link) {
        }
    }, 150);
});


        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ===============================
// CARD DETAILS MODAL
// ===============================
function showCardDetails(card) {
    const title = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-description').textContent;
    const type = card.querySelector('.card-type').textContent;
    const date = card.querySelector('.card-date').textContent;
    const category = card.dataset.category;
    
    // Create modal content
    const modalContent = `
        <div class="modal-overlay" id="cardModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-info">
                        <p><strong>Type:</strong> ${type}</p>
                        <p><strong>Date:</strong> ${date}</p>
                        <p><strong>Category:</strong> ${category}</p>
                    </div>
                    <div class="modal-description">
                        <p>${description}</p>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary">Learn More</button>
                        <button class="btn-secondary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Animate modal in
    setTimeout(() => {
        document.getElementById('cardModal').classList.add('show');
    }, 10);
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ===============================
// SMOOTH SCROLLING
// ===============================
function initSmoothScrolling() {
    // Smooth scroll for anchor links
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

// ===============================
// PARALLAX EFFECTS
// ===============================
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===============================
// LOADING ANIMATION
// ===============================
function addLoadingAnimation() {
    const cards = document.querySelectorAll('.work-card');
    
    cards.forEach((card, index) => {
        // Add loading class initially
        card.classList.add('loading');
        
        // Remove loading class after delay
        setTimeout(() => {
            card.classList.remove('loading');
        }, index * 200 + 500);
    });
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===============================
// ADDITIONAL STYLES FOR MODAL
// ===============================
const modalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-overlay.show {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.7);
    transition: transform 0.3s ease;
}

.modal-overlay.show .modal-content {
    transform: scale(1);
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.modal-close:hover {
    background: #f0f0f0;
}

.modal-body {
    padding: 1.5rem;
}

.modal-info {
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
}

.modal-info p {
    margin: 0.5rem 0;
    color: #666;
}

.modal-description {
    margin-bottom: 1.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
    background: #f0f0f0;
    color: #666;
}

.btn-secondary:hover {
    background: #e0e0e0;
}
</style>
`;

// Add modal styles to head
document.head.insertAdjacentHTML('beforeend', modalStyles);

// ===============================
// KEYBOARD NAVIGATION
// ===============================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===============================
// PERFORMANCE OPTIMIZATION
// ===============================
// Throttle scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-based animations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ===============================
// ACCESSIBILITY
// ===============================
// Add focus management for cards
document.querySelectorAll('.work-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${card.querySelector('.card-title').textContent}`);
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }

        $('.card').on('click', function(e) {
    e.preventDefault();
    var link = $(this).attr('href') || $(this).data('link');
    if (link) {
        window.location.href = link;
    }
});
    });
}); 




// ...existing code...

// ...existing code...

