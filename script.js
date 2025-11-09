// Data for the website
const races = [
    { name: "Daytona 24 Hours", duration: "24H", flag: "🇺🇸", color: "#B22234" },
    { name: "Interlagos 6 Hours", duration: "6H", flag: "🇧🇷", color: "#009C3B" },
    { name: "Suzuka 10 Hours", duration: "10H", flag: "🇯🇵", color: "#BC002D" },
    { name: "Nürburgring 8 Hours", duration: "8H", flag: "🇩🇪", color: "#000000" },
    { name: "Barcelona 6 Hours", duration: "6H", flag: "🇪🇸", color: "#C60B1E" },
    { name: "Spa 24 Hours", duration: "24H", flag: "🇧🇪", color: "#000000" }
];

const formatSteps = [
    { title: "Practice Sessions", description: "Teams get familiar with the circuit and fine-tune their setups during multiple practice sessions." },
    { title: "Qualifying", description: "Drivers battle for grid positions in intense qualifying sessions." },
    { title: "Race Start", description: "The endurance challenge begins with a rolling or standing start depending on the circuit." },
    { title: "Driver Changes", description: "Teams execute strategic driver changes throughout the race." },
    { title: "Pit Stops", description: "Fuel, tires, and adjustments are made during carefully timed pit stops." },
    { title: "Finish", description: "Teams complete the grueling endurance test and cross the finish line." }
];

const championships = [
    { title: "Drivers' Championship", standings: [
        { position: 1, driver: "TBA", team: "TBA", points: "-" },
        { position: 2, driver: "TBA", team: "TBA", points: "-" },
        { position: 3, driver: "TBA", team: "TBA", points: "-" },
        { position: 4, driver: "TBA", team: "TBA", points: "-" },
        { position: 5, driver: "TBA", team: "TBA", points: "-" }
    ]},
    { title: "Teams' Championship", standings: [
        { position: 1, team: "TBA", points: "-" },
        { position: 2, team: "TBA", points: "-" },
        { position: 3, team: "TBA", points: "-" },
        { position: 4, team: "TBA", points: "-" },
        { position: 5, team: "TBA", points: "-" }
    ]},
    { title: "Manufacturers' Championship", standings: [
        { position: 1, manufacturer: "TBA", points: "-" },
        { position: 2, manufacturer: "TBA", points: "-" },
        { position: 3, manufacturer: "TBA", points: "-" },
        { position: 4, manufacturer: "TBA", points: "-" },
        { position: 5, manufacturer: "TBA", points: "-" }
    ]}
];

const galleryItems = [
    "Race Action",
    "Team Garages",
    "Pit Stops",
    "Victory Celebrations",
    "Circuit Views",
    "Behind the Scenes"
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website
function initializeWebsite() {
    generateCalendar();
    generateFormatSteps();
    generateStandings();
    generateGallery();
    setupEventListeners();
    setupScrollEffects();
}

// Generate calendar races
function generateCalendar() {
    const calendarContainer = document.querySelector('.calendar-container');
    
    if (!calendarContainer) return;
    
    calendarContainer.innerHTML = '';
    
    races.forEach((race, index) => {
        const raceCard = document.createElement('div');
        raceCard.className = 'race-card';
        
        raceCard.innerHTML = `
            <div class="race-header">
                <div class="race-flag" style="background-color: ${race.color}">
                ${race.flag}
            </div>
            <div class="race-info">
                <h3 class="race-name">${race.name}</h3>
                <div class="race-duration">${race.duration}</div>
            </div>
            <div class="race-details">
                <p>Round ${index + 1} of the Intercontinental GT Challenge.</p>
                <p>Experience the ultimate endurance challenge at this iconic circuit.</p>
            </div>
        `;
        
        calendarContainer.appendChild(raceCard);
    });
}

// Generate weekend format steps
function generateFormatSteps() {
    const formatContainer = document.querySelector('.format-container');
    
    if (!formatContainer) return;
    
    formatContainer.innerHTML = '';
    
    formatSteps.forEach((step, index) => {
        const formatStep = document.createElement('div');
        formatStep.className = 'format-step';
        
        formatStep.innerHTML = `
            <div class="step-icon">${index + 1}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
        `;
        
        formatContainer.appendChild(formatStep);
    });
}

// Generate championship standings
function generateStandings() {
    const standingsContainer = document.querySelector('.standings-container');
    
    if (!standingsContainer) return;
    
    standingsContainer.innerHTML = '';
    
    championships.forEach(championship => {
        const standingCard = document.createElement('div');
        standingCard.className = 'standing-card';
        
        let standingsHTML = '';
        championship.standings.forEach(standing => {
            if (championship.title === "Drivers' Championship") {
                standingsHTML += `
                    <div class="standing-item">
                        <div>
                            <strong>${standing.position}.</strong> ${standing.driver} - ${standing.team}
                    </div>
                    <div><strong>${standing.points}</strong></div>
                </div>
            `;
        } else if (championship.title === "Teams' Championship") {
                standingsHTML += `
                    <div class="standing-item">
                        <div>
                            <strong>${standing.position}.</strong> ${standing.team}
                    </div>
                    <div><strong>${standing.points}</strong></div>
            `;
        } else {
            standingsHTML += `
                <div class="standing-item">
                    <div>
                        <strong>${standing.position}.</strong> ${standing.manufacturer}
                    </div>
                    <div><strong>${standing.points}</strong></div>
            `;
        }
    });
    
    standingCard.innerHTML = `
        <h3 class="standing-title">${championship.title}</h3>
        <div class="standing-list">
            ${standingsHTML}
        </div>
    `;
    
    standingsContainer.appendChild(standingCard);
});
}

// Generate gallery items
function generateGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <div class="gallery-placeholder">
                ${item} - Coming Soon
            </div>
        `;
        
        galleryContainer.appendChild(galleryItem);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission();
            });
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        }
        
        // Race card animations
        document.querySelectorAll('.race-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
        });
    });
}

// Handle form submission
function handleFormSubmission() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (name && email) {
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        document.querySelector('.contact-form').reset();
    } else {
        alert('Please fill in all required fields.');
    }
}

// Setup scroll effects
function setupScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg');
        
        if (hero && heroBg) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
        heroBg.style.transform = `translateY(${rate}px)`;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}