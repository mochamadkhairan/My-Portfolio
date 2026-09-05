const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Cek apakah user sebelumnya sudah memilih Dark Mode
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️ Light Mode';
}

toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️ Light Mode';
    }
});

const textElement = document.getElementById("typing-text");
const words = ["Web Developer.", "Fullstack Developer.", "Software Developer.", "UI/UX Designer."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Menghapus teks
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 70;
    } else {
        // Mengetik teks
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    // Jika kata selesai diketik
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Jeda saat kata lengkap
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}


document.addEventListener("DOMContentLoaded", type);

function reveal() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -150px 0px", // Setara dengan elementVisible = 150 di versi lama
        threshold: 0
    });

    reveals.forEach((element) => revealObserver.observe(element));
}

document.addEventListener("DOMContentLoaded", reveal);

let currentImages = [];
let currentIndex = 0;

function openLightbox(title, images) {
    currentImages = images;
    currentIndex = 0;
    
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");

    lightboxImg.src = currentImages[currentIndex];
    caption.innerText = title;
    
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Stop scrolling
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
    document.body.style.overflow = "auto";
}

function changeImage(step) {
    currentIndex += step;
    
    // Loop back to start or end
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;

    const img = document.getElementById("lightbox-img");
    img.style.opacity = "0"; // Animasi transisi antar gambar
    
    setTimeout(() => {
        img.src = currentImages[currentIndex];
        img.style.opacity = "1";
    }, 200);
}

// Close with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

const scrollNav = document.getElementById("scrollNav");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollNav.classList.add("active");
    } else {
        scrollNav.classList.remove("active");
    }
});

function scrollToAnchor(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

const langToggle = document.getElementById("lang-toggle");
let currentLang = "en";

const translations = {
    // === HERO SECTION ===
    "logo": { id: "Saya <span>Khay</span>", en: "It's <span>Khay</span>" },
    "welcome-text": { id: "SELAMAT DATANG DI DUNIA SAYA", en: "WELCOME TO MY WORLD" },
    "hero-title": { id: "Hai, Saya <span class='highlight'>Khay</span><br>seorang <span class='highlight' id='typing-text'>Software Developer</span><br><span class='sub-text'>Berasal dari Indonesia.</span>", en: "Hi, I’m <span class='highlight'>Khay</span><br>a <span class='highlight' id='typing-text'>Software Developer</span><br><span class='sub-text'>Based in Indonesia.</span>" },
    "description": { id: "Membangun situs web modern yang cepat, fungsional, dan dirancang untuk memberikan pengalaman pengguna terbaik. Saya membantu bisnis dan merek pribadi untuk tampil lebih profesional di dunia digital.", en: "Building modern websites that are fast, functional, and designed to deliver the best user experience. I help businesses and personal brands present themselves more professionally in the digital world." },
    "btn-about": { id: "Tentang Saya", en: "About Me" },
    "btn-cta": { id: "Cek Proyek Saya", en: "Check My Projects" },
    "find-me": { id: "SOSIAL MEDIA SAYA", en: "MY SOCIAL MEDIA" },
    "best-skill": { id: "KEAHLIAN TERBAIK", en: "BEST SKILL ON" },
    "toggle-darkmode": { id: "🌙 Mode Gelap", en: "🌙 Dark Mode" },

    // === SERVICE SECTION ===
    "title-service": { id: "Apa yang Saya <span class='highlight'>Tawarkan</span>", en: "What I <span class='highlight'>Offer</span>" },
    "service-desc": { id: "Berbagai layanan untuk membantu Anda membangun kehadiran digital yang kuat.", en: "A range of services to help you establish a strong digital presence." },
    "srv-web-title": { id: "Pengembangan Web", en: "Web Development" },
    "srv-web-desc": { id: "Membangun situs web yang responsif dan ramah pengguna menggunakan teknologi modern seperti Laravel dan Tailwind CSS.", en: "Building responsive, user-friendly websites using modern technologies like Laravel and Tailwind CSS." },
    "srv-mob-title": { id: "Pengembangan Aplikasi Mobile", en: "Mobile App Development" },
    "srv-mob-desc": { id: "Membuat aplikasi mobile lintas platform dengan Flutter yang memberikan pengalaman pengguna yang mulus.", en: "Creating cross-platform mobile applications with Flutter that provide seamless user experiences." },
    "srv-ui-title": { id: "Desain UI/UX", en: "UI/UX Design" },
    "srv-ui-desc": { id: "Merancang antarmuka yang intuitif dan pengalaman pengguna yang menarik yang selaras dengan identitas merek Anda.", en: "Designing intuitive interfaces and engaging user experiences that align with your brand identity." },
    "srv-maint-title": { id: "Pemeliharaan Website", en: "Maintenance Websites" },
    "srv-maint-desc": { id: "Memberikan dukungan dan pembaruan berkelanjutan untuk menjaga situs web Anda berjalan lancar dan selalu terbaru.", en: "Providing ongoing support and updates to keep your website running smoothly and up-to-date." },
    "srv-dyn-title": { id: "Aplikasi Web Dinamis", en: "Dynamic Web Applications" },
    "srv-dyn-desc": { id: "Membangun aplikasi web interaktif dan kaya fitur yang memberikan pengalaman pengguna yang luar biasa.", en: "Building interactive and feature-rich web applications that provide an exceptional user experience." },
    "srv-comp-title": { id: "Website Profil Perusahaan", en: "Company Profile Websites" },
    "srv-comp-desc": { id: "Menciptakan kehadiran online yang menarik untuk memamerkan merek Anda dan melibatkan audiens target Anda.", en: "Creating compelling online presences that showcase your brand and engage your target audience." },

    // === PORTFOLIO SECTION ===
    "title-portfolio": { id: "Portofolio <span class='highlight'>Saya</span>", en: "My <span class='highlight'>Portfolio</span>" },
    "proj-magang-desc": { id: "MagangTrack adalah sistem manajemen magang berbasis web yang dirancang untuk menyederhanakan proses pengelolaan magang di dalam sebuah perusahaan.", en: "MagangTrack is a web-based internship management system designed to simplify the process of managing internships within a company." },
    "proj-pick-desc": { id: "PickitUp adalah platform belajar gitar berbasis web yang dirancang untuk membantu pengguna belajar gitar melalui pelajaran interaktif, video latihan, kuis, dan latihan terpandu.", en: "PickitUp is a web-based guitar learning platform designed to help users learn guitar through interactive lessons, practice videos, quizzes, and guided exercises." },
    "proj-tutur-desc": { id: "Tutur Aja adalah aplikasi seluler yang dibangun dengan Flutter yang memungkinkan pengguna untuk dengan mudah melaporkan keluhan, masalah, dan saran kepada pihak berwenang terkait.", en: "Tutur Aja is a mobile application built with Flutter that allows users to easily report complaints, issues, and suggestions to the relevant authorities." },
    "proj-bch-desc": { id: "BCH Website adalah platform berbasis web yang dirancang untuk mengelola fasilitas dan ruang di Bandung Creative Hub, memungkinkan pengguna menjelajahi ruangan dan admin mengelola data.", en: "BCH Website is a web-based platform designed to manage facilities and spaces at Bandung Creative Hub, allowing users to explore available rooms and administrators to manage bookings and facility data through an integrated dashboard." },
    "proj-warseng-desc": { id: "Website Warung Gurangseng adalah situs profil perusahaan sederhana yang menampilkan informasi tentang kedai makanan, menu yang tersedia, dan gambaran visual tempat usaha.", en: "The Warung Gurangseng website is a simple company profile website that displays information about the food stall, the available menu, and a visual depiction of the business premises." },
    "proj-slider-desc": { id: "Proyek landing page interaktif yang menampilkan koleksi Hero Mobile Legends dengan desain modern, animasi transisi yang halus, dan fitur premium.", en: "An interactive landing page project featuring a collection of Mobile Legends Heroes with modern design, smooth transition animations, and premium features." },
    "textShowMore": { id: "Tampilkan Lebih Banyak", en: "Show More" },

    // === SKILLS SECTION ===
    "title-skills": { id: "Keahlian <span class='highlight'>Teknis</span>", en: "Technical <span class='highlight'>Skills</span>" },
    "lang-skills-desc": { id: "Bahasa pemrograman, framework, dan alat yang saya gunakan untuk mewujudkan ide.", en: "The tools, languages, and frameworks I use to bring ideas to life." },
    "lang-skill-cat1": { id: "Bahasa Pemrograman", en: "Programming Languages" },
    "lang-skill-cat2": { id: "Framework & Perpustakaan", en: "Frameworks & Libraries" },
    "lang-skill-cat3": { id: "Alat & Basis Data", en: "Tools & Databases" },

    // === ABOUT SECTION ===
    "section-subtitle": { id: "BIOGRAFI SAYA", en: "MY BIOGRAPHY" },
    "title-about": { id: "Ingin Tahu <span class='highlight'>Lebih Banyak Tentang Saya</span>?", en: "Want to Know <span class='highlight'>More About Me</span>?" },
    "about-desc-text": { id: "Saya adalah seorang Software Developer yang bersemangat, berdedikasi untuk membangun solusi digital yang tidak hanya sangat fungsional tetapi juga menarik secara visual. Berbasis di Indonesia, saya menggabungkan keahlian teknis dengan desain yang cermat untuk menciptakan pengalaman pengguna yang mulus dan membantu bisnis membangun kehadiran yang kuat di dunia digital.", en: "I am a passionate Software Developer dedicated to building digital solutions that are not only highly functional but also visually engaging. Based in Indonesia, I combine technical expertise with thoughtful design to create seamless user experiences and help businesses establish a strong presence in the digital world." },
    "exp-badge-text": { id: "Tahun<br>Pengalaman", en: "Years of<br>Experience" },
    "stat-proj": { id: "Proyek Selesai", en: "Projects Done" },
    "stat-code": { id: "Jam Coding", en: "Hours of Coding" },
    "info-name": { id: "Nama: ", en: "Name: " },
    "info-location": { id: "Lokasi: ", en: "Location: " },

    // === CERTIFICATES SECTION ===
    "title-certs": { id: "Prestasi <span class='highlight'>Saya</span>", en: "My <span class='highlight'>Achievements</span>" },
    "lang-certs-desc": { id: "Sertifikasi profesional dan penghargaan yang telah saya raih.", en: "Professional certifications and recognitions I've earned." },
    "textShowMoreCert": { id: "Tampilkan Lebih Banyak", en: "Show More" },

    // === CERTIFICATES ===

    // Tags
    "tag-bus-comp": { id: "Bisnis & Kompetisi", en: "Business & Competition" },
    "tag-committee": { id: "Panitia Penyelenggara", en: "Organizing Committee" },
    "tag-entrep": { id: "Kewirausahaan", en: "Entrepreneurship" },
    "tag-acad-comp": { id: "Kompetisi Akademik", en: "Academic Competition" },
    "tag-sports": { id: "Olahraga (Bela Diri)", en: "Sports (Martial Arts)" },
    "tag-it": { id: "Teknologi Informasi", en: "Information Technology" },
    "tag-tech-seminar": { id: "Seminar Teknologi", en: "Technology Seminar" },
    "tag-acc-fin": { id: "Akuntansi & Keuangan", en: "Accounting & Finance" },

    // Certificate Titles
    "cert-title-1": { id: "Peserta Terbaik: The 7th Ambassador of Business Edupreneur", en: "Best Participant: The 7th Ambassador of Business Edupreneur" },
    "cert-title-2": { id: "Anggota Panitia: Career Day IDE LPKIA 2026", en: "Committee Member: Career Day IDE LPKIA 2026" },
    "cert-title-3": { id: "Peserta: Program Pengembangan Mahasiswa Wirausaha (P2MW) 2025", en: "Participant: 2025 Student Entrepreneurship Development Program (P2MW)" },
    "cert-title-4": { id: "Juara 2: Lomba Pidato (Speech Competition)", en: "2nd Place: Speech Competition" },
    "cert-title-5": { id: "Juara 2: Pencak Silat (Kategori SMA) Bandung Lautan Api Championship 2", en: "2nd Place: Pencak Silat (Senior High Category) Bandung Lautan Api Championship 2" },
    "cert-title-6": { id: "Peserta: IF DAY", en: "Participant: IF DAY" },
    "cert-title-7": { id: "Peserta: Seminar 'Programming Transformation with AI'", en: "Participant: 'Programming Transformation with AI' Seminar" },
    "cert-title-8": { id: "Peserta: FAC (Fun Accounting Club)", en: "Participant: FAC (Fun Accounting Club)" },

    // Common Labels
    "cert-date-label": { id: "Tanggal Terbit: ", en: "Date Issued: " },
    "cert-issuer-label": { id: "Diterbitkan oleh: ", en: "Issued by: " },

    // Specific Months/Dates (If needed for full localization)
    "date-cert-1": { id: "2 Mei 2019", en: "May 2, 2019" },
    "date-cert-2": { id: "24 Januari 2026", en: "January 24, 2026" },
    "date-cert-3": { id: "Agustus 2025", en: "August 2025" },
    "date-cert-4": { id: "20 Januari 2025", en: "January 20, 2025" },
    "date-cert-5": { id: "9-10 Nov 2019", en: "Nov 9-10, 2019" },
    "date-cert-6": { id: "22 Maret 2025", en: "March 22, 2025" },
    "date-cert-7": { id: "10 Juli 2024", en: "July 10, 2024" },
    "date-cert-8": { id: "19 November 2023", en: "November 19, 2023" },

    // === LIFE BEYOND CODING SECTION ===
    "title-life": { id: "Kehidupan di Luar <span class='highlight'>Coding</span>", en: "Life Beyond <span class='highlight'>Coding</span>" },
    "lang-life-desc": { id: "Hover kartu untuk menjelajahi cerita saya.", en: "Hover the cards to explore my story." },
    "life-music-title": { id: "Musik & Panggung", en: "Music & Stage" },
    "life-music-desc": { id: "Gitaris aktif. 5+ penampilan panggung dan antusias produksi musik.", en: "Active guitarist. 5+ stage performances and music production enthusiast." },
    "life-music-foot": { id: "Klik untuk melihat galeri", en: "Click to see gallery" },
    "life-content-title": { id: "Kreator Konten", en: "Content Creator" },
    "life-content-desc": { id: "Mengabadikan momen melalui lensa. Berpengalaman dalam dokumentasi acara dan editing.", en: "Capturing life through lenses. Experience in event documentation and editing." },
    "life-content-foot": { id: "Jelajahi karya", en: "Explore works" },
    "life-org-title": { id: "Organisasi", en: "Organization" },
    "life-org-desc": { id: "Memimpin komunitas teknologi dan menyelenggarakan workshop kampus.", en: "Leading tech communities and organizing campus workshops." },
    "life-org-foot": { id: "Lihat aktivitas", en: "View activities" },

    // === FOOTER/CONTACT ===
    "title-contact": { id: "Mari <span class='highlight'>Terhubung</span>", en: "Let's <span class='highlight'>Connect</span>" },
    "contact-info-title": {
        id: "Informasi Kontak",
        en: "Contact Information"
    },
    "contact-desc": {
        id: "Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya. Saya selalu terbuka untuk mendiskusikan proyek baru dan peluang untuk mewujudkan ide Anda.",
        en: "Interested in working together? Feel free to reach out. I'm always open to discussing new projects and opportunities to bring your ideas to life."
    },
    "email-label": {
        id: "Email Saya",
        en: "Email Me"
    },
    "location-label": {
        id: "Lokasi",
        en: "Location"
    },
    "wa-btn": {
        id: "Chat Sekarang <i class='fas fa-arrow-right'></i>",
        en: "Chat Now <i class='fas fa-arrow-right'></i>"
    },
    "form-title": {
        id: "Kirim <span class='highlight'>Pesan</span> Via <span class='highlight'>Email</span>",
        en: "Send a <span class='highlight'>Message</span> Via <span class='highlight'>Email</span>"
    },
    "form-name-placeholder": {
        id: "Nama Anda",
        en: "Your Name"
    },
    "form-email-placeholder": {
        id: "Email Anda",
        en: "Your Email"
    },
    "form-message-placeholder": {
        id: "Pesan Anda...",
        en: "Your Message..."
    },
    "form-submit-btn": {
        id: "<span>Kirim Pesan</span> ",
        en: "<span>Send Message</span> "
    },
    "footer-copyright": {
        id: "© 2026 M.Khairan. Dibuat dengan ❤️",
        en: "© 2026 M.Khairan. Built with ❤️"
    },
    "tag-creator": {
        id: "Pencipta",
        en: "Creator"
    },
    "tag-performer": {
        id: "Pemeran",
        en: "Performer"
    },
    "tag-leader": {
        id: "Pemimpin",
        en: "Leader"
    }
};

langToggle.addEventListener("click", () => {
    // Switch bahasa
    currentLang = currentLang === "en" ? "id" : "en";
    
    // Update teks tombol
    langToggle.textContent = currentLang === "en" ? "ID" : "EN";

    // 1. Update Menu Navigasi
    document.querySelectorAll(".nav-links a").forEach(link => {
        const text = link.getAttribute(`data-${currentLang}`);
        if (text) link.textContent = text;
    });

    // 2. Update Elemen Konten (Gunakan class sebagai penanda)
    Object.keys(translations).forEach(key => {
        const elements = document.querySelectorAll(`.${key}`);
        elements.forEach(el => {
            el.innerHTML = translations[key][currentLang];
        });
    });

    // Simpan preferensi ke Local Storage
    localStorage.setItem("preferred-lang", currentLang);
});

// Hide project cards beyond the first 3 by adding the helper class
const projectGrid = document.querySelector('.project-grid');
if (projectGrid) {
    const projects = Array.from(projectGrid.querySelectorAll('.project-card'));
    const initialVisible = 3;
    projects.forEach((p, i) => {
        if (i >= initialVisible) p.classList.add('hidden-project');
    });
}

const btnShowMore = document.getElementById('btnShowMore');
const hiddenProjects = document.querySelectorAll('.hidden-project');
const textShowMore = document.getElementById('textShowMore');
const iconShowMore = document.getElementById('iconShowMore');

let isExpanded = false;

btnShowMore.addEventListener('click', () => {
    isExpanded = !isExpanded;

    hiddenProjects.forEach(project => {
        if (isExpanded) {
            project.classList.remove('hidden-project');
            // Sedikit delay agar animasi munculnya halus
            setTimeout(() => project.style.opacity = '1', 10);
        } else {
            project.classList.add('hidden-project');
        }
    });

    // Update Teks & Icon
    if (isExpanded) {
        textShowMore.innerText = "Show Less";
        btnShowMore.classList.add('active');
    } else {
        textShowMore.innerText = "Show More";
        btnShowMore.classList.remove('active');
        // Scroll kembali ke atas grid project jika ditutup
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
});

// Efek Spotlight & Hover 3D
const cards = document.querySelectorAll('.experience-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Logika Spotlight
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        // Logika Tilt 3D Ringan
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

const btnShowMoreCert = document.getElementById('btnShowMoreCert');
const certCanvas = document.getElementById('certCanvas');
const textShowMoreCert = document.getElementById('textShowMoreCert');

btnShowMoreCert.addEventListener('click', () => {
    certCanvas.classList.toggle('show-all-certs');
    
    // Update teks tombol
    if (certCanvas.classList.contains('show-all-certs')) {
        textShowMoreCert.innerText = "Show Less";
        btnShowMoreCert.querySelector('i').style.transform = "rotate(180deg)";
    } else {
        textShowMoreCert.innerText = "Show More";
        btnShowMoreCert.querySelector('i').style.transform = "rotate(0deg)";
        
        // Scroll balik ke judul sertifikat agar tidak tersesat
        document.getElementById('certificates').scrollIntoView({ behavior: 'smooth' });
    }
});