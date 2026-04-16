(function init() {
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const header = document.querySelector('header');

  // Mobile Menu logic
  const toggleMenu = () => {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = isHidden ? '' : 'hidden';
    
    if (!isHidden) {
      // Elegant, cinematic fade in for the mobile links
      gsap.fromTo('.mobile-link', 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power2.out' }
      );
    }
  };

  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Soft shrinking header on scroll (Safely handled)
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('bg-black/80', 'backdrop-blur-md');
      header.style.transition = 'all 0.8s ease';
    } else {
      header.classList.remove('bg-black/80', 'backdrop-blur-md');
    }
  });

  // GSAP Cinematic Scroll Reveal Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Initial Load Animation (No ScrollTrigger needed above the fold)
    gsap.fromTo('.hero-reveal', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
    );

    // Hardware-accelerated CSS initialization guarantees no CSS jittering
    gsap.set('.reveal-up', { y: 40, opacity: 0 });

    // GSAP Batching to handle elements streaming in simultaneously gracefully
    ScrollTrigger.batch('.reveal-up', {
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: 'power2.out',
          overwrite: true
        });
      },
      start: 'top 85%'
    });
    
    // Hardware-accelerated cinematic pan on museum images
    document.querySelectorAll('.parallax-container').forEach((container) => {
      const bg = container.querySelector('.parallax-bg');
      if (bg) {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          },
          yPercent: 10, // Relaxed GPU-accelerated translation
          ease: 'none'
        });
      }
    });
  }

  // Set copyright year safely
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
})();
