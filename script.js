/**
 * JUJJUVARAPU SAI MANI VARMA — PORTFOLIO & RESUME SCRIPT
 * Functionality: Mobile Nav, Category Filters, Scrollspy, Clipboard Copy, Resume Modal, Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // 3. Scrollspy for Active Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 4. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 5.5 Experience Category Filtering
  const expFilterBtns = document.querySelectorAll('.exp-filter-btn');
  const expCards = document.querySelectorAll('.exp-card');

  expFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      expFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-exp-filter');

      expCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-exp-category') || '';

        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 6. Toast Notification Helper
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimeout = null;

  const showToast = (message, isSuccess = true) => {
    if (!toast || !toastMessage) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastMessage.textContent = message;
    if (toastIcon) {
      toastIcon.className = isSuccess
        ? 'fa-solid fa-circle-check toast-icon'
        : 'fa-solid fa-circle-exclamation toast-icon';
      toastIcon.style.color = isSuccess ? '#10b981' : '#ef4444';
    }

    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // 7. Clipboard Copy Handlers (Email & Phone)
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailToCopy = 'manivarma701@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        const originalIcon = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        showToast('Email (manivarma701@gmail.com) copied!');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalIcon;
        }, 2000);
      } catch (err) {
        showToast('Email: ' + emailToCopy, true);
      }
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const phoneToCopy = '+919392147272';

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(phoneToCopy);
        const originalIcon = copyPhoneBtn.innerHTML;
        copyPhoneBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        showToast('Phone (+91 9392147272) copied!');

        setTimeout(() => {
          copyPhoneBtn.innerHTML = originalIcon;
        }, 2000);
      } catch (err) {
        showToast('Phone: ' + phoneToCopy, true);
      }
    });
  }

  // 8. Interactive Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeTrigger = document.getElementById('hero-resume-trigger');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const printResumeBtn = document.getElementById('print-resume-btn');

  const openModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
  if (heroResumeTrigger) heroResumeTrigger.addEventListener('click', openModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeModal();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 9. Interactive Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields.', false);
        return;
      }

      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Preparing...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        contactForm.reset();
        showToast(`Thank you, ${name}! Your inquiry has been prepared.`);
        
        const mailtoUri = `mailto:manivarma701@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Sai Mani Varma,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
        window.location.href = mailtoUri;
      }, 700);
    });
  }
});
