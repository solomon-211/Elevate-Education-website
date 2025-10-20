// ===============================
// ELEVATE EDUCATION FOUNDATION
// Complete JavaScript File
// ===============================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===============================
  // CONTACT FORM HANDLING
  // ===============================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (name && email && message) {
        // Show success message
        formStatus.innerHTML = '<p style="color: #28a745; padding: 1rem; background: #d4edda; border-radius: 6px; margin-top: 1rem;">Thank you for contacting us! We will get back to you soon.</p>';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(function() {
          formStatus.innerHTML = '';
        }, 5000);
        
        // In production, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
      } else {
        formStatus.innerHTML = '<p style="color: #dc3545; padding: 1rem; background: #f8d7da; border-radius: 6px; margin-top: 1rem;">Please fill in all fields.</p>';
      }
    });
  }
  
  // ===============================
  // DONATE FORM HANDLING
  // ===============================
  const donateForm = document.getElementById('donateForm');
  const donateFormStatus = document.getElementById('donateFormStatus');
  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('customAmount');
  
  // Handle amount button selection
  if (amountButtons.length > 0) {
    amountButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Set the custom amount input value
        const amount = this.getAttribute('data-amount');
        if (customAmountInput) {
          customAmountInput.value = amount;
        }
      });
    });
  }
  
  // Clear button selection when custom amount is entered
  if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
      amountButtons.forEach(btn => btn.classList.remove('active'));
    });
  }
  
  // Handle donate form submission
  if (donateForm && donateFormStatus) {
    donateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const amount = document.getElementById('customAmount').value;
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('donorEmail').value;
      const terms = document.getElementById('terms').checked;
      
      // Validation
      if (!amount || parseFloat(amount) <= 0) {
        donateFormStatus.innerHTML = '<p style="color: #dc3545; padding: 1rem; background: #f8d7da; border-radius: 6px; margin-top: 1rem;">Please enter a valid donation amount.</p>';
        return;
      }
      
      if (!fullName || !email) {
        donateFormStatus.innerHTML = '<p style="color: #dc3545; padding: 1rem; background: #f8d7da; border-radius: 6px; margin-top: 1rem;">Please fill in all required fields.</p>';
        return;
      }
      
      if (!terms) {
        donateFormStatus.innerHTML = '<p style="color: #dc3545; padding: 1rem; background: #f8d7da; border-radius: 6px; margin-top: 1rem;">Please agree to the terms and conditions.</p>';
        return;
      }
      
      // Show success message
      donateFormStatus.innerHTML = '<p style="color: #28a745; padding: 1rem; background: #d4edda; border-radius: 6px; margin-top: 1rem;"><strong>Thank you for your generous donation of $' + amount + '!</strong><br>Your contribution will make a real difference in the lives of students and communities. A confirmation email has been sent to ' + email + '.</p>';
      
      // Scroll to status message
      donateFormStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Reset form
      donateForm.reset();
      amountButtons.forEach(btn => btn.classList.remove('active'));
      
      // In production, you would send this data to a payment processor
      console.log('Donation submitted:', { amount, fullName, email });
    });
  }
  
  // Card number formatting
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }
  
  // Expiry date formatting
  const expiryDateInput = document.getElementById('expiryDate');
  if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // ===============================
  // FAQ PAGE FUNCTIONALITY
  // ===============================
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearch');
  const categoryButtons = document.querySelectorAll('.tab-btn');
  const noResults = document.getElementById('noResults');
  
  let currentCategory = 'all';
  
  // FAQ Accordion functionality
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function() {
          // Toggle active class
          const isActive = item.classList.contains('active');
          
          // Optional: Close other open items (uncomment for single-item accordion)
          // faqItems.forEach(otherItem => {
          //   if (otherItem !== item) {
          //     otherItem.classList.remove('active');
          //   }
          // });
          
          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
          } else {
            item.classList.add('active');
          }
        });
        
        // Keyboard accessibility
        question.addEventListener('keypress', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
          }
        });
        
        // Make question focusable and accessible
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when toggled
        const observer = new MutationObserver(function() {
          const isActive = item.classList.contains('active');
          question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
        
        observer.observe(item, { 
          attributes: true, 
          attributeFilter: ['class'] 
        });
      }
    });
  }
  
  // Category filtering
  if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get selected category
        currentCategory = button.getAttribute('data-category');
        
        // Filter items
        filterItems();
        
        // Clear search
        if (searchInput) {
          searchInput.value = '';
          clearSearchHighlights();
        }
      });
    });
  }
  
  // Filter FAQ items by category
  function filterItems() {
    let visibleCount = 0;
    
    faqItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      if (currentCategory === 'all' || itemCategory === currentCategory) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
        item.classList.remove('active'); // Close hidden items
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }
  
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Clear previous highlights
    clearSearchHighlights();
    
    if (searchTerm === '') {
      // Show all items in current category
      filterItems();
      return;
    }
    
    let visibleCount = 0;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question h3');
      const answer = item.querySelector('.faq-answer');
      const itemCategory = item.getAttribute('data-category');
      
      // Get text content
      const questionText = question ? question.textContent.toLowerCase() : '';
      const answerText = answer ? answer.textContent.toLowerCase() : '';
      
      // Check if search term exists in question or answer
      const matchesSearch = questionText.includes(searchTerm) || answerText.includes(searchTerm);
      const matchesCategory = currentCategory === 'all' || itemCategory === currentCategory;
      
      if (matchesSearch && matchesCategory) {
        item.classList.remove('hidden');
        visibleCount++;
        
        // Highlight matching text
        highlightText(item, searchTerm);
      } else {
        item.classList.add('hidden');
        item.classList.remove('active');
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }
  
  // Highlight search terms in text
  function highlightText(item, searchTerm) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.faq-answer');
    
    if (question) {
      const questionHTML = question.innerHTML;
      const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
      question.innerHTML = questionHTML.replace(regex, '<span class="highlight">$1</span>');
    }
    
    if (answer) {
      const paragraphs = answer.querySelectorAll('p');
      paragraphs.forEach(p => {
        const pHTML = p.innerHTML;
        const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
        p.innerHTML = pHTML.replace(regex, '<span class="highlight">$1</span>');
      });
    }
  }
  
  // Clear search highlights
  function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  }
  
  // Escape special regex characters
  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Debounce function for search
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // ===============================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===============================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle links that point to elements on the page
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ===============================
  // NAVIGATION HIGHLIGHT ON SCROLL
  // ===============================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  function highlightNav() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  if (sections.length > 0) {
    window.addEventListener('scroll', highlightNav);
  }
  
  // ===============================
  // MOBILE MENU TOGGLE (if needed)
  // ===============================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // ===============================
  // FORM VALIDATION
  // ===============================
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
    });
  });
  
  function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    if (input.hasAttribute('required') && value === '') {
      showError(input, 'This field is required');
      return false;
    }
    
    if (type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }
    }
    
    if (type === 'number' && value !== '') {
      if (isNaN(value) || parseFloat(value) <= 0) {
        showError(input, 'Please enter a valid number');
        return false;
      }
    }
    
    clearError(input);
    return true;
  }
  
  function showError(input, message) {
    clearError(input);
    
    input.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '-0.5rem';
    errorDiv.style.marginBottom = '0.5rem';
    errorDiv.textContent = message;
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }
  
  function clearError(input) {
    input.style.borderColor = '#ccc';
    
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
  
  // ===============================
  // SCROLL TO TOP BUTTON (Optional)
  // ===============================
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #004aad;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.background = '#003580';
    this.style.transform = 'translateY(-5px)';
  });
  
  scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.background = '#004aad';
    this.style.transform = 'translateY(0)';
  });
  
  // ===============================
  // LOADING ANIMATION (optional)
  // ===============================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // ===============================
  // CONSOLE MESSAGE
  // ===============================
  console.log('%cElevate Education Foundation', 'color: #004aad; font-size: 20px; font-weight: bold;');
  console.log('%cEmpowering learners. Shaping the future.', 'color: #666; font-size: 14px;');
  
});

// ===============================
// APPLY FORM HANDLING
// Add this to your script.js file
// ===============================

// Apply Form Submission
const applyForm = document.getElementById('applyForm');
const applyFormStatus = document.getElementById('applyFormStatus');

if (applyForm && applyFormStatus) {
  applyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const intendedField = document.getElementById('intendedField').value;
    
    // Check if all required checkboxes are checked
    const termsAccuracy = document.getElementById('termsAccuracy').checked;
    const termsCommitment = document.getElementById('termsCommitment').checked;
    const termsContact = document.getElementById('termsContact').checked;
    
    if (!termsAccuracy || !termsCommitment || !termsContact) {
      applyFormStatus.innerHTML = '<p style="color: #dc3545; padding: 1rem; background: #f8d7da; border-radius: 6px; margin-top: 1rem;">Please accept all terms and conditions to proceed.</p>';
      applyFormStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    // Validate personal statement word count
    const personalStory = document.getElementById('personalStory').value;
    const wordCount = personalStory.trim().split(/\s+/).length;
    
    if (wordCount < 100) {
      applyFormStatus.innerHTML = '<p style="color: #dc3545; padding: 1rem; background: #f8d7da; border-radius: 6px; margin-top: 1rem;">Personal statement must be at least 100 words. Current word count: ' + wordCount + '</p>';
      applyFormStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    // Show loading state
    const submitBtn = applyForm.querySelector('.submit-application-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (In production, send to server)
    setTimeout(function() {
      // Show success message
      applyFormStatus.innerHTML = `
        <div style="background: #d4edda; padding: 2rem; border-radius: 10px; margin-top: 2rem; text-align: center; border-left: 4px solid #28a745;">
          <h3 style="color: #28a745; margin-bottom: 1rem;">✅ Application Submitted Successfully!</h3>
          <p style="color: #155724; margin-bottom: 1rem;">Thank you, <strong>${firstName} ${lastName}</strong>, for applying to our Scholarship Guidance Program!</p>
          <p style="color: #155724; margin-bottom: 1rem;">We've sent a confirmation email to <strong>${email}</strong>.</p>
          <p style="color: #155724; margin-bottom: 0;">Our team will review your application and contact you within <strong>2 weeks</strong>. Please check your email (including spam folder) regularly.</p>
          <div style="margin-top: 1.5rem;">
            <a href="index.html" style="display: inline-block; background: #28a745; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Return to Home</a>
          </div>
        </div>
      `;
      
      // Scroll to status message
      applyFormStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Reset form
      applyForm.reset();
      
      // Reset button
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      
      // In production, you would send this data to a server
      console.log('Application submitted:', {
        firstName,
        lastName,
        email,
        phone,
        intendedField,
        wordCount
      });
    }, 2000);
  });
  
  // Word counter for personal statement
  const personalStoryTextarea = document.getElementById('personalStory');
  if (personalStoryTextarea) {
    // Create word counter element
    const wordCounterDiv = document.createElement('div');
    wordCounterDiv.style.cssText = 'text-align: right; color: #666; font-size: 0.9rem; margin-top: -0.5rem; margin-bottom: 1rem;';
    wordCounterDiv.id = 'wordCounter';
    personalStoryTextarea.parentNode.insertBefore(wordCounterDiv, personalStoryTextarea.nextSibling);
    
    // Update word count on input
    personalStoryTextarea.addEventListener('input', function() {
      const text = this.value.trim();
      const wordCount = text.length > 0 ? text.split(/\s+/).length : 0;
      const wordCounterDiv = document.getElementById('wordCounter');
      
      if (wordCount < 500) {
        wordCounterDiv.innerHTML = `<span style="color: #dc3545;">Word count: ${wordCount} / 500 minimum</span>`;
      } else if (wordCount >= 500 && wordCount <= 1000) {
        wordCounterDiv.innerHTML = `<span style="color: #28a745;">Word count: ${wordCount} (Good!)</span>`;
      } else {
        wordCounterDiv.innerHTML = `<span style="color: #ffc107;">Word count: ${wordCount} (Recommended maximum: 1000)</span>`;
      }
    });
    
    // Trigger initial count
    personalStoryTextarea.dispatchEvent(new Event('input'));
  }
  
  // Auto-save functionality (saves to browser's local storage)
  const formInputs = applyForm.querySelectorAll('input, select, textarea');
  
  formInputs.forEach(input => {
    // Load saved data on page load (except for checkboxes)
    if (input.type !== 'checkbox') {
      const savedValue = localStorage.getItem(`apply_${input.id}`);
      if (savedValue && input.value === '') {
        input.value = savedValue;
      }
    }
    
    // Save data on input change
    input.addEventListener('change', function() {
      if (this.type === 'checkbox') {
        localStorage.setItem(`apply_${this.id}`, this.checked);
      } else {
        localStorage.setItem(`apply_${this.id}`, this.value);
      }
    });
  });
  
  // Clear saved data after successful submission
  applyForm.addEventListener('submit', function() {
    setTimeout(function() {
      formInputs.forEach(input => {
        localStorage.removeItem(`apply_${input.id}`);
      });
    }, 2500);
  });
  
  // Show auto-save indicator
  let autoSaveTimeout;
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      clearTimeout(autoSaveTimeout);
      
      // Show saving indicator
      let saveIndicator = document.getElementById('autoSaveIndicator');
      if (!saveIndicator) {
        saveIndicator = document.createElement('div');
        saveIndicator.id = 'autoSaveIndicator';
        saveIndicator.style.cssText = 'position: fixed; top: 80px; right: 20px; background: #004aad; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.2);';
        document.body.appendChild(saveIndicator);
      }
      
      saveIndicator.textContent = '💾 Saving...';
      saveIndicator.style.display = 'block';
      
      autoSaveTimeout = setTimeout(function() {
        saveIndicator.textContent = '✅ Saved';
        setTimeout(function() {
          saveIndicator.style.display = 'none';
        }, 1500);
      }, 500);
    });
  });
}

// Phone number formatting with country code
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
  input.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Don't format if user is deleting
    if (e.inputType === 'deleteContentBackward') {
      return;
    }
    
    // Add + if not present
    if (value && !e.target.value.startsWith('+')) {
      e.target.value = '+' + value;
    }
  });
  
  input.addEventListener('blur', function(e) {
    let value = e.target.value;
    if (value && !value.startsWith('+')) {
      e.target.value = '+' + value.replace(/\D/g, '');
    }
  });
});

// Date of birth validation (must be at least 13 years old)
const dobInput = document.getElementById('dateOfBirth');
if (dobInput) {
  dobInput.addEventListener('change', function() {
    const dob = new Date(this.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    if (age < 13) {
      alert('Applicants must be at least 13 years old.');
      this.value = '';
    } else if (age > 35) {
      if (!confirm('You are over 35 years old. Our program primarily serves younger students. Do you wish to continue?')) {
        this.value = '';
      }
    }
  });
  
  // Set max date to today
  const today = new Date().toISOString().split('T')[0];
  dobInput.setAttribute('max', today);
}

// Graduation year validation
const gradYearInput = document.getElementById('graduationYear');
if (gradYearInput) {
  gradYearInput.addEventListener('change', function() {
    const currentYear = new Date().getFullYear();
    const gradYear = parseInt(this.value);
    
    if (gradYear < currentYear - 5) {
      if (!confirm('Your graduation year is more than 5 years ago. Our program primarily serves recent graduates. Do you wish to continue?')) {
        this.value = '';
      }
    } else if (gradYear > currentYear + 5) {
      alert('Please enter a valid graduation year.');
      this.value = '';
    }
  });
}

// Form section progress indicator
if (applyForm) {
  const formSections = applyForm.querySelectorAll('.form-section');
  const totalSections = formSections.length;
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'position: sticky; top: 70px; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 2rem; z-index: 100;';
  progressBar.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <span style="font-weight: 600; color: #004aad;">Application Progress</span>
      <span id="progressText" style="color: #666; font-size: 0.9rem;">0%</span>
    </div>
    <div style="background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden;">
      <div id="progressFill" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; width: 0%; transition: width 0.3s ease;"></div>
    </div>
  `;
  
  applyForm.insertBefore(progressBar, applyForm.firstChild);
  
  // Update progress on scroll
  window.addEventListener('scroll', updateProgress);
  
  function updateProgress() {
    const formTop = applyForm.offsetTop;
    const formHeight = applyForm.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    let completedSections = 0;
    formSections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPosition > sectionTop + 100) {
        completedSections++;
      }
    });
    
    const progress = Math.min((completedSections / totalSections) * 100, 100);
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '%';
  }

  // Update progress on form section change
  formSections.forEach(section => {
    section.addEventListener('change', updateProgress);
  });

  function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  }

  // Initial progress update
  updateProgress();
}

console.log('Apply form JavaScript loaded successfully');

