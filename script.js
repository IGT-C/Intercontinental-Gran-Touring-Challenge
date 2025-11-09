// --- FUNGSI STANDINGS & ROSTER ---

function createDriverCard(driver) {
    const driverCard = document.createElement('div');
    driverCard.className = 'driver-card';

    driverCard.innerHTML = `
        <span class="driver-number">${driver.number}</span>
        <div class="number-nationality">
            <h3>#${driver.number}</h3>
            <span class="nationality-flag">${driver.nationality}</span>
        </div>

        <h3>${driver.name}</h3>
        <p>Team: ${driver.team}</p>
        <p>Car: ${driver.car}</p>
        <p>Class: <strong>${driver.class}</strong></p>

        <div class="image-container">
            <img src="${driver.driver_img}" alt="${driver.name}" class="driver-photo" onerror="this.onerror=null;this.src='assets/img/drivers/default.jpg';" />
            <img src="${driver.car_img}" alt="${driver.car}" class="car-photo" onerror="this.onerror=null;this.src='assets/img/cars/default.png';" />
        </div>
    `;
    return driverCard;
}

function renderRoster(rosterData) {
    const proContainer = document.getElementById('pro-roster');
    const proAmContainer = document.getElementById('pro-am-roster');
    
    if (!proContainer || !proAmContainer) return; 

    proContainer.innerHTML = '';
    proAmContainer.innerHTML = '';
    
    // Pisahkan data berdasarkan class
    const proDrivers = rosterData.filter(driver => driver.class === 'PRO');
    const proAmDrivers = rosterData.filter(driver => driver.class === 'PRO-AM');

    // Render Pembalap PRO
    if (proDrivers.length > 0) {
        proDrivers.forEach(driver => {
            proContainer.appendChild(createDriverCard(driver));
        });
    } else {
        proContainer.innerHTML = '<p class="placeholder-note">No PRO drivers currently registered.</p>';
    }

    // Render Pembalap PRO-AM
    if (proAmDrivers.length > 0) {
        proAmDrivers.forEach(driver => {
            proAmContainer.appendChild(createDriverCard(driver));
        });
    } else {
        proAmContainer.innerHTML = '<p class="placeholder-note">No PRO-AM drivers currently registered.</p>';
    }
}

// Fungsi utama untuk memuat data dari standings.json
function updateStandings() {
    fetch('standings.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Logika rendering Standings (Drivers & Teams) tetap sama di sini
            
            // Panggil renderRoster untuk halaman roster.html
            if (data.roster && Array.isArray(data.roster)) {
                renderRoster(data.roster);
            }
        })
        .catch(error => {
            console.error('Failed to load data:', error);
        });
}


// --- FUNGSI NAVIGASI MOBILE ---

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggleButton.classList.toggle('active');
        });
    }
    
    updateStandings(); 
});
    // Panggil fungsi untuk memuat klasemen saat DOM siap
    updateStandings(); 

});
