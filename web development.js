document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('main-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.padding = '0.75rem 0';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
      }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Add animation class to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('float-animation');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Process detail toggles
    const detailHeaders = document.querySelectorAll('.detail-header');
    
    detailHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const detailItem = this.parentElement;
        const isActive = detailItem.classList.contains('active');
        
        // Close all detail items
        document.querySelectorAll('.detail-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // If the clicked item wasn't active, make it active
        if (!isActive) {
          detailItem.classList.add('active');
        }
      });
    });
    
    // Show the first detail item in each process stage initially
    const processStages = document.querySelectorAll('.process-stage');
    processStages.forEach(stage => {
      const firstDetailItem = stage.querySelector('.detail-item');
      if (firstDetailItem) {
        firstDetailItem.classList.add('active');
      }
    });
    
    // Animate process stages on scroll
    const processContents = document.querySelectorAll('.process-content');
    const webAppContent = document.querySelector('.web-app-content');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          contentObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    processContents.forEach(content => {
      content.style.opacity = '0';
      contentObserver.observe(content);
    });
    
    // Observe web app content if it exists
    if (webAppContent) {
      webAppContent.style.opacity = '0';
      contentObserver.observe(webAppContent);
    }
  });
  