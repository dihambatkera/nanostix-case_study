/* ==========================================================================
   Nanostix Creativity & Innovation ePortfolio - White RGB Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Age Verification Modal Logic
  const ageOverlay = document.getElementById('ageVerifyOverlay');
  const agePromptView = document.getElementById('agePromptView');
  const ageDeniedView = document.getElementById('ageDeniedView');
  const ageYesBtn = document.getElementById('ageVerifyYes');
  const ageNoBtn = document.getElementById('ageVerifyNo');
  const ageRetryBtn = document.getElementById('ageRetryBtn');

  if (ageOverlay) {
    const isVerified = sessionStorage.getItem('nanostix_age_verified') === 'true';
    if (!isVerified) {
      ageOverlay.classList.add('active');
      document.body.classList.add('age-locked');
    } else {
      ageOverlay.classList.remove('active');
      document.body.classList.remove('age-locked');
    }

    if (ageYesBtn) {
      ageYesBtn.addEventListener('click', () => {
        sessionStorage.setItem('nanostix_age_verified', 'true');
        ageOverlay.classList.remove('active');
        document.body.classList.remove('age-locked');
      });
    }

    if (ageNoBtn) {
      ageNoBtn.addEventListener('click', () => {
        if (agePromptView && ageDeniedView) {
          agePromptView.style.display = 'none';
          ageDeniedView.style.display = 'block';
        }
      });
    }

    if (ageRetryBtn) {
      ageRetryBtn.addEventListener('click', () => {
        if (agePromptView && ageDeniedView) {
          ageDeniedView.style.display = 'none';
          agePromptView.style.display = 'block';
        }
      });
    }
  }

  // 1. Ambient Cursor RGB Spotlight Tracking
  const spotlight = document.getElementById('cursorSpotlight');
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
  }

  // 2. Top Scroll Reading Progress Indicator
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 3. Active Scroll Navigation Link Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(section => navObserver.observe(section));

  // 4. Image Lightbox Modal Logic
  const modalOverlay = document.getElementById('lightboxModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');

  const placeholderContainers = document.querySelectorAll('.hero-image-placeholder, .ref-thumb-wrapper, .problem-media-container');
  placeholderContainers.forEach(container => {
    container.style.cursor = 'pointer';
    container.addEventListener('click', () => {
      const img = container.querySelector('img');
      if (img && img.src) {
        modalImage.src = img.src;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});
