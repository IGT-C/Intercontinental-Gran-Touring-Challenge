document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Menu Navigasi Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav a');

    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // 2. Efek Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== 'regulations.pdf') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header Styling on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'var(--secondary-color)';
            header.style.padding = '15px 40px';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            header.style.padding = '20px 40px';
        }
    });


    // ===================================================
    // 4. LOGIKA KLASMEN DINAMIS
    // ===================================================

    function renderStandings(data, type) {
        let containerId = type === 'drivers' ? '#drivers-standings' : '#teams-standings';
        let placeholderNoteSelector = type === 'drivers' ? '.driver-note' : '.team-note';

        const tablePlaceholder = document.querySelector(containerId);
        const placeholderNote = tablePlaceholder.querySelector(placeholderNoteSelector);
        
        // Hapus pesan "Memuat data..." dan reset teks
        placeholderNote.innerText = 'Klasemen diperbarui secara otomatis.';

        data.forEach(item => {
            const newRow = document.createElement('div');
            newRow.className = 'standings-row'; 
            
            let nameContent;
            if (type === 'drivers') {
                // Untuk Driver: tampilkan Nama Driver - Nama Tim
                nameContent = `${item.driver} - ${item.team}`;
            } else {
                // Untuk Tim: tampilkan hanya Nama Tim
                nameContent = item.team;
            }
            
            newRow.innerHTML = `
                <span>${item.pos}</span>
                <span>${nameContent}</span>
                <span>${item.points}</span>
            `;
            
            // Masukkan baris baru tepat sebelum catatan placeholder
            tablePlaceholder.insertBefore(newRow, placeholderNote);
        });
    }

    function updateStandings() {
        // Fetch data dari file standings.json
        fetch('standings.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Render Klasemen Driver
                if (data.drivers && Array.isArray(data.drivers)) {
                    renderStandings(data.drivers, 'drivers');
                }
                
                // Render Klasemen Team
                if (data.teams && Array.isArray(data.teams)) {
                    renderStandings(data.teams, 'teams');
                }
            })
            .catch(error => {
                console.error('Gagal memuat data klasemen:', error);
                
                // Set pesan error untuk kedua tabel jika fetch gagal
                document.querySelectorAll('.placeholder-note').forEach(note => {
                    note.innerText = '❌ Gagal memuat data klasemen. File data mungkin hilang.';
                });
            });
    }

    // Panggil fungsi untuk memuat klasemen saat DOM siap
    updateStandings(); 

});