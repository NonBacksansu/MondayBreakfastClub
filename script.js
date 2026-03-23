// Analytics Mock & Tracking Event
function trackEvent(eventName) {
    console.log("Event Tracked: " + eventName);
    if(window.dataLayer) {
        window.dataLayer.push({'event': eventName});
    }
}

// Navigation (SPA Routing)
function navigate(pageId) {
    // Hide all sections and remove active classes
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    
    // Show targeted section
    document.getElementById(pageId).classList.add('active');
    
    // Add active state to clicked link (if triggered from nav)
    if(event && event.target.tagName === 'A') {
        event.target.classList.add('active');
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if it is currently open
    const navLinks = document.querySelector('.nav-links');
    if(navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
    }
    
    // Track the page view event
    trackEvent('Viewed ' + pageId);
}

// Mobile Menu Toggle
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('nav-active');
}

// Menu Filtering Logic
function filterMenu(category) {
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items based on data-category attribute
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if(category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    trackEvent('Filtered Menu: ' + category);
}

// Menu Search Bar Logic
function searchMenu() {
    let input = document.getElementById('menuSearch').value.toLowerCase();
    let items = document.querySelectorAll('.menu-item');
    
    items.forEach(item => {
        let name = item.querySelector('.item-name').innerText.toLowerCase();
        if (name.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Gallery Lightbox Logic
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Reservation Form Logic
function submitReservation(e) {
    e.preventDefault(); // Prevent page reload
    
    // Show success message
    document.getElementById('resConfirm').style.display = 'block';
    trackEvent('Reservation Submitted');
    
    // Grab form values
    let name = document.getElementById('resName').value;
    let date = document.getElementById('resDate').value;
    let time = document.getElementById('resTime').value;
    let guests = document.getElementById('resGuests').value;
    
    // Format message for WhatsApp
    let waText = encodeURIComponent(`Hi! I want to confirm my reservation. Name: ${name}, Date: ${date}, Time: ${time}, Guests: ${guests}.`);
    
    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
        window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
    }, 2000);
}

