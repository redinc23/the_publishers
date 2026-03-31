
// Enhanced ManguApp with performance optimizations
const ManguApp = {
  // Initialize the application
  init: function() {
    this.setupEventListeners();
    this.loadUserPreferences();
    this.setupIntersectionObserver();
    this.setupTrendingHovers();
    this.optimizeImages();
    this.setupServiceWorker();
    console.log('MANGU PUBLISHING initialized successfully');
  },

  // Setup Service Worker for offline functionality
  setupServiceWorker: function() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('SW registered: ', registration);
        }).catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  },

  // Optimize images with lazy loading
  optimizeImages: function() {
    document.querySelectorAll('img').forEach(img => {
      if (img.complete) {
        img.setAttribute('loaded', 'true');
      } else {
        img.addEventListener('load', () => {
          img.setAttribute('loaded', 'true');
        });
        
        img.addEventListener('error', () => {
          // Add error handling for broken images
          img.alt = 'Image not available';
          img.style.backgroundColor = '#f0f0f0';
          img.style.minHeight = '200px';
        });
      }
    });
  },

  // Setup all event listeners
  setupEventListeners: function() {
    // Error handling
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      document.getElementById('errorBoundary')?.style.setProperty('display', 'block');
    });

    // Hero video pause button
    const heroVideo = document.getElementById('heroBackgroundVideo');
    const heroPauseBtn = document.getElementById('heroVideoPause');
    let heroVideoPlaying = true;

    if (heroPauseBtn && heroVideo) {
      heroPauseBtn.addEventListener('click', () => {
        if (heroVideoPlaying) {
          heroVideo.pause();
          heroPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
          heroVideoPlaying = false;
        } else {
          heroVideo.play();
          heroPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
          heroVideoPlaying = true;
        }
      });
    }

    // Online/offline detection
    window.addEventListener('online', () => {
      document.getElementById('offlineIndicator')?.classList.remove('show');
      this.showToast('Connection restored');
    });

    window.addEventListener('offline', () => {
      document.getElementById('offlineIndicator')?.classList.add('show');
    });

    // Cookie consent
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
        document.getElementById('cookieConsent')?.classList.add('show');
      }, 2000);
    }

    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      document.getElementById('cookieConsent')?.classList.remove('show');
    });

    document.getElementById('cookieReject')?.addEventListener('click', () => {
      localStorage.setItem('cookiesRejected', 'true');
      document.getElementById('cookieConsent')?.classList.remove('show');
    });

    // Header scroll effect + progress bar
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 60) header?.classList.add('scrolled'); 
      else header?.classList.remove('scrolled');
      
      const progress = document.getElementById('progressBar');
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      if (progress) progress.style.width = scrolled + '%';
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      themeToggle.innerHTML = next === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', next);
    });

    // Navigation dropdowns
    this.setupDropdown('libraryNav', 'libraryDropdown');
    this.setupDropdown('mediaNav', 'mediaDropdown');
    this.setupDropdown('newsroomNav', 'newsroomDropdown');

    // Profile dropdown
    const profileMenu = document.getElementById('profileMenu');
    const profileDropdown = document.getElementById('profileDropdown');
    profileMenu?.addEventListener('click', () => {
      const expanded = profileMenu.getAttribute('aria-expanded') === 'true';
      profileMenu.setAttribute('aria-expanded', !expanded);
      profileDropdown?.classList.toggle('active');
    });

    // Language dropdown
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    languageBtn?.addEventListener('click', () => {
      const expanded = languageBtn.getAttribute('aria-expanded') === 'true';
      languageBtn.setAttribute('aria-expanded', !expanded);
      languageDropdown?.classList.toggle('active');
    });

    // Accessibility panel
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    accessibilityBtn?.addEventListener('click', () => {
      accessibilityPanel?.classList.toggle('active');
    });

    // Text size controls
    document.querySelectorAll('.text-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.text-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.documentElement.style.fontSize = (btn.dataset.scale || 1) + 'em';
        localStorage.setItem('textScale', btn.dataset.scale);
      });
    });

    // High contrast toggle
    document.getElementById('contrastToggle')?.addEventListener('click', () => {
      const pressed = document.getElementById('contrastToggle').getAttribute('aria-pressed') === 'true';
      document.getElementById('contrastToggle').setAttribute('aria-pressed', !pressed);
      document.body.classList.toggle('high-contrast');
      localStorage.setItem('highContrast', !pressed);
    });

    // Enhanced focus management for accessibility
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('user-tabbing');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.documentElement.classList.remove('user-tabbing');
    });
    
    // Quick navigation with keyboard
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-input')?.focus();
      }
      
      // Escape key to close modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.books-dropdown.active, .profile-dropdown.active, .language-dropdown.active, .accessibility-panel.active').forEach(element => {
          element.classList.remove('active');
        });
      }
    });

    // Drag-scroll books row & interactions
    document.querySelectorAll('.books-row, .carousel-track').forEach(row => {
      let isDown = false, startX = 0, scrollLeft = 0;
      row.addEventListener('mousedown', e => { 
        isDown = true; 
        startX = e.pageX - row.offsetLeft; 
        scrollLeft = row.scrollLeft; 
      });
      row.addEventListener('mouseleave', () => { isDown = false; });
      row.addEventListener('mouseup', () => { isDown = false; });
      row.addEventListener('mousemove', e => { 
        if (!isDown) return; 
        e.preventDefault(); 
        const x = e.pageX - row.offsetLeft; 
        const walk = (x - startX) * 2; 
        row.scrollLeft = scrollLeft - walk; 
      });
    });

    // Book action interactions
    document.querySelectorAll('.book-action, .icon-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.animateButton(btn);
        this.showToast('Added!');
      });
    });

    // Search micro-interaction
    const searchInput = document.querySelector('.search-input');
    searchInput?.addEventListener('focus', function(){ 
      this.parentElement.style.transform='scale(1.02)'; 
    });
    searchInput?.addEventListener('blur', function(){ 
      this.parentElement.style.transform='scale(1)'; 
    });

    // Upload area interactions
    const fileUpload = document.getElementById('file-upload');
    const fileInput = document.getElementById('file-input');
    fileUpload?.addEventListener('click', ()=> fileInput?.click());
    fileUpload?.addEventListener('dragover', function(e){ 
      e.preventDefault(); 
      this.style.borderColor='#ff7700'; 
      this.style.background='rgba(255,119,0,.1)'; 
    });
    fileUpload?.addEventListener('dragleave', function(){ 
      this.style.borderColor='rgba(255,255,255,.3)'; 
      this.style.background='transparent'; 
    });
    fileUpload?.addEventListener('drop', (e) => { 
      e.preventDefault(); 
      this.showToast(`${e.dataTransfer.files.length} file(s) ready to upload`); 
      fileUpload.style.borderColor='rgba(255,255,255,.3)'; 
      fileUpload.style.background='transparent'; 
    });

    // Demo interactions
    document.getElementById('readNow')?.addEventListener('click', () => {
      this.showToast('Opening reading interface...');
    });

    document.getElementById('watchMovie')?.addEventListener('click', () => {
      this.showToast('Opening movie viewer...');
    });

    // Enhanced interactions for buttons
    document.querySelectorAll('.btn-read, .btn-watch, .btn-library, .premium-btn').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
      });
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Performance: requestIdleCallback for non-essential tasks
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.preloadImportantContent();
      });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.books-dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
      if (!e.target.closest('.profile-menu')) {
        document.getElementById('profileDropdown')?.classList.remove('active');
      }
      if (!e.target.closest('.language-selector')) {
        document.getElementById('languageDropdown')?.classList.remove('active');
      }
      if (!e.target.closest('.accessibility-tools')) {
        document.getElementById('accessibilityPanel')?.classList.remove('active');
      }
    });
  },

  // Setup dropdown functionality
  setupDropdown: function(navId, dropdownId) {
    const nav = document.getElementById(navId);
    const dropdown = document.getElementById(dropdownId);
    nav?.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown?.classList.toggle('active');
    });
  },

  // Animate button interactions
  animateButton: function(btn) {
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = 'scale(1.1)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
    }, 100);
    
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'fadeInUp .6s ease-out forwards';
    btn.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  },

  // Preload important content during idle time
  preloadImportantContent: function() {
    // Preload next carousel images
    const nextImages = [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=750&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=750&fit=crop'
    ];
    
    nextImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  },

  // Load user preferences from localStorage
  loadUserPreferences: function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    // Load accessibility settings
    const textScale = localStorage.getItem('textScale') || '1';
    document.documentElement.style.fontSize = textScale + 'em';
    document.querySelector(`.text-size-btn[data-scale="${textScale}"]`)?.classList.add('active');
    
    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
      document.body.classList.add('high-contrast');
      document.getElementById('contrastToggle')?.setAttribute('aria-pressed', 'true');
    }
  },

  // Setup intersection observer for animations
  setupIntersectionObserver: function() {
    const observer = new IntersectionObserver((entries) => { 
      entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.classList.add('fade-in-up'); 
        } 
      }); 
    }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.book-card, .upload-section').forEach(function(el) {
      observer.observe(el);
    });
  },

  // Setup hover effects for trending cards  
  setupTrendingHovers: function() {
    document.querySelectorAll('.book-card .icon-button').forEach(button => {
      const playButton = button.querySelector('.fa-play');
      const readButton = button.querySelector('.fa-book-open');
      const plusButton = button.querySelector('.fa-plus');

      if (playButton) {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const bookTitle = button.closest('.book-card').querySelector('.book-title').textContent;
          this.showToast(`Playing ${bookTitle}`);
        });
      }

      if (readButton) {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const bookTitle = button.closest('.book-card').querySelector('.book-title').textContent;
          this.showToast(`Reading ${bookTitle}`);
        });
      }

      if (plusButton) {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          button.innerHTML = '<i class="fas fa-check"></i>';
          button.style.backgroundColor = '#E50914';
          button.style.borderColor = '#E50914';
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i>';
            button.style.backgroundColor = 'rgba(42, 42, 42, 0.6)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }, 2000);
        });
      }
    });
  },

  // Show toast notification
  showToast: function(message) { 
    const center = document.getElementById('notificationCenter'); 
    if (!center) return;
    
    const note = document.createElement('div'); 
    note.className = 'notification'; 
    note.innerHTML = `
      <div class="notification-icon"><i class="fas fa-bell"></i></div>
      <div class="notification-content">
        <div class="notification-title">Notice</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `; 
    center.appendChild(note); 
    setTimeout(() => note.classList.add('show'), 50); 
    note.querySelector('.notification-close').addEventListener('click', () => note.remove()); 
    setTimeout(() => note.remove(), 3500); 
  }
};

// Enhanced trending carousel functionality
let currentIndex = 0;
const totalCards = 3; // Updated to match actual number of cards
const cardWidth = 225; // 200px card + 25px gap
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    moveCarousel(1);
  }, 5000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function moveCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  
  stopAutoScroll();
  
  currentIndex += direction;
  
  if (currentIndex < 0) currentIndex = totalCards - 1;
  if (currentIndex >= totalCards) currentIndex = 0;
  
  const translateX = -currentIndex * cardWidth;
  track.style.transform = `translateX(${translateX}px)`;
  
  startAutoScroll();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Use requestAnimationFrame for smoother initialization
  requestAnimationFrame(() => {
    ManguApp.init();
    
    // Start auto-scroll for carousel
    startAutoScroll();
    
    // Add hover effects to pause auto-scroll
    document.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        stopAutoScroll();
      });
      
      card.addEventListener('mouseleave', () => {
        startAutoScroll();
      });
    });
  });
});

// Make functions available globally
window.ManguApp = ManguApp;
window.moveCarousel = moveCarousel;
window.showToast = ManguApp.showToast.bind(ManguApp);
