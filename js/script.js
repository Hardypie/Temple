// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize first page
    showPage('home');
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Donation option selection
    const donationOptions = document.querySelectorAll('.donation-option');
    const donationAmount = document.getElementById('amount');
    
    donationOptions.forEach(option => {
        option.addEventListener('click', () => {
            donationOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            if (option.textContent !== 'Custom') {
                donationAmount.value = option.textContent.replace('₹', '');
            } else {
                donationAmount.value = '';
                donationAmount.focus();
            }
        });
    });
    
    // Form submission
    document.getElementById('donationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show QR code animation
        const qrCode = document.getElementById('qrCode');
        qrCode.classList.add('animated');
        
        // In a real application, this would process the payment
        alert('Thank you for your donation! Please scan the QR code to complete your payment.');
        
        // Reset form
        this.reset();
        donationOptions[0].classList.add('active');
    });

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, this would send the message to a server
        // For demo, we'll just show an alert and store the message locally
        const messageData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value,
            date: new Date().toLocaleString()
        };
        
        // Store message in localStorage
        let messages = JSON.parse(localStorage.getItem('templeMessages') || '[]');
        messages.push(messageData);
        localStorage.setItem('templeMessages', JSON.stringify(messages));
        
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    // Load initial data
    loadGalleryImages();
    setupImageViewer();
});

// Show page with animation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const activePage = document.getElementById(pageId);
    activePage.classList.add('active');
    
    // Trigger animations for elements on the page
    setTimeout(() => {
        animatePageElements(activePage);
    }, 300);
}

// Animate elements on page
function animatePageElements(page) {
    // Feature cards animation
    const featureCards = page.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 150);
    });
    
    // Gallery items animation
    const galleryItems = page.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, index * 100);
    });
    
    // Donation form animation
    const donationForm = page.querySelector('.donation-form');
    if (donationForm) {
        setTimeout(() => {
            donationForm.classList.add('animated');
        }, 300);
    }
    
    // Owner cards animation
    const ownerCards = page.querySelectorAll('.owner-card');
    ownerCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 150);
    });
    
    // Contact form animation
    const contactForm = page.querySelector('.contact-form');
    if (contactForm) {
        setTimeout(() => {
            contactForm.classList.add('animated');
        }, 300);
    }
    
    // Contact items animation
    const contactItems = page.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, index * 150);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gallery functions
function loadGalleryImages() {
    // In a real application, this would fetch images from a server
    // For demo purposes, we'll use placeholder images
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Clear existing content
    if (galleryContainer) galleryContainer.innerHTML = '';
    
    // Sample images (in a real app, these would come from a database)
    const sampleImages = [
        {src: 'images/t1.png', type: 'image', caption: 'Main Temple'},
        {src: 'images/t4.png', type: 'image', caption: 'Prayer Ceremony'},
        {src: 'images/t6.png', type: 'image', caption: 'Festival Celebration'},
        {src: 'images/t7.png', type: 'image', caption: 'Meditation Session'},
        {src: 'images/t8.png', type: 'image', caption: 'Religious Ceremony'},
        {src: 'images/t10.png', type: 'image', caption: 'Community Service'},
        {src: 'images/t60.png', type: 'image', caption: 'Traditional Ritual'},
        {src: 'images/t78.png', type: 'image', caption: 'Temple Architecture'}
    ];
    
    // Create gallery items for public gallery
    if (galleryContainer) {
        sampleImages.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', index);
            
            if (item.type === 'image') {
                galleryItem.innerHTML = `
                    <img src="${item.src}" alt="${item.caption}">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                `;
            } else {
                galleryItem.innerHTML = `
                    <video controls>
                        <source src="${item.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="gallery-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                `;
            }
            
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    // Animate gallery items after loading
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
            }, index * 100);
        });
    }, 300);
}

// Image Viewer functionality
function setupImageViewer() {
    const imageViewer = document.getElementById('imageViewer');
    const imageViewerClose = document.getElementById('imageViewerClose');
    const viewerImage = document.getElementById('viewerImage');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const downloadImage = document.getElementById('downloadImage');
    
    let currentImageIndex = 0;
    const images = [
        'images/gallery/image1.jpg',
        'images/gallery/image2.jpg',
        'images/gallery/image3.jpg',
        'images/gallery/image4.jpg',
        'images/gallery/image5.jpg',
        'images/gallery/image6.jpg',
        'images/gallery/image7.jpg',
        'images/gallery/image8.jpg'
    ];
    
    // Open image viewer when gallery item is clicked
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            currentImageIndex = parseInt(galleryItem.getAttribute('data-index'));
            showImage(currentImageIndex);
            imageViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close image viewer
    imageViewerClose.addEventListener('click', function() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Navigate to previous image
    prevImage.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });
    
    // Navigate to next image
    nextImage.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });
    
    // Download image
    downloadImage.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = images[currentImageIndex];
        link.download = `temple-image-${currentImageIndex + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!imageViewer.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            imageViewer.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }
    });
    
    function showImage(index) {
        viewerImage.src = images[index];
        viewerImage.alt = `Temple Image ${index + 1}`;
    }
}