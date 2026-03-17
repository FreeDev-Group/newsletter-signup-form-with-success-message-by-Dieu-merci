/* ============================================
   STEP 6: EMAIL VALIDATION (JavaScript)
   ============================================ */

// DOM Elements
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const signupSection = document.getElementById('signupSection');
const successSection = document.getElementById('successSection');
const userEmail = document.getElementById('userEmail');
const dismissBtn = document.getElementById('dismissBtn');

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ============================================
   VALIDATION FUNCTIONS
   ============================================ */

/**
 * Validate email format and empty state
 * @param {string} email - Email to validate
 * @returns {string|null} - Error message or null if valid
 */
function validateEmail(email) {
  const trimmedEmail = email.trim();
  
  // Check if empty
  if (trimmedEmail === '') {
    return 'Email address is required';
  }
  
  // Check if format is valid
  if (!emailRegex.test(trimmedEmail)) {
    return 'Valid email required';
  }
  
  return null;
}

/**
 * Display error message and style input
 * @param {string} message - Error message to display
 */
function showError(message) {
  emailError.textContent = message;
  emailError.classList.add('show');
  emailInput.classList.add('error');
  
  // Add error label styling
  const label = signupForm.querySelector('label');
  if (label) {
    label.classList.add('error-label');
  }
}

/**
 * Hide error message and reset input styling
 */
function hideError() {
  emailError.textContent = '';
  emailError.classList.remove('show');
  emailInput.classList.remove('error');
  emailInput.classList.remove('valid');
  
  // Remove error label styling
  const label = signupForm.querySelector('label');
  if (label) {
    label.classList.remove('error-label');
  }
}

/**
 * Show valid state on input
 */
function showValid() {
  emailInput.classList.remove('error');
  emailInput.classList.add('valid');
  hideError();
}

/* ============================================
   FORM SUBMISSION HANDLER
   ============================================ */

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  const email = emailInput.value;
  const error = validateEmail(email);
  
  // Validation failed
  if (error) {
    showError(error);
    emailInput.focus();
    return;
  }
  
  // Validation passed
  hideError();
  showValid();
  
  // Show success message
  displaySuccess(email);
}

/* ============================================
   SUCCESS MESSAGE HANDLING
   ============================================ */

/**
 * Display success message with user email
 * @param {string} email - User's email address
 * 
 * STEP 7: With animations and CSS transitions
 */
function displaySuccess(email) {
  // Set user email in success message
  userEmail.textContent = email;
  
  // Hide signup form section with fade out
  signupSection.classList.add('hidden');
  signupSection.style.display = 'none';
  
  // Show success section with fade in
  successSection.hidden = false;
  successSection.removeAttribute('hidden');
}

/**
 * Reset form and hide success message
 */
function resetForm() {
  // Hide success section
  successSection.setAttribute('hidden', '');
  successSection.hidden = true;
  
  // Show signup form section
  signupSection.classList.remove('hidden');
  signupSection.style.display = 'flex';
  
  // Reset form
  signupForm.reset();
  
  // Clear any errors
  hideError();
  
  // Focus email input
  emailInput.focus();
}

/* ============================================
   REAL-TIME VALIDATION
   ============================================ */

/**
 * Handle real-time input validation
 */
function handleEmailInput() {
  // Only validate if there's an error showing
  if (emailInput.classList.contains('error')) {
    const error = validateEmail(emailInput.value);
    
    // Clear error if email becomes valid
    if (!error) {
      showValid();
    }
  }
}

/**
 * Handle input blur event
 */
function handleEmailBlur() {
  const email = emailInput.value.trim();
  
  // If input has content and no error, show valid state
  if (email && !emailInput.classList.contains('error')) {
    showValid();
  }
}

/* ============================================
   EVENT LISTENERS
   ============================================ */

// Form submission
signupForm.addEventListener('submit', handleFormSubmit);

// Real-time email validation
emailInput.addEventListener('input', handleEmailInput);

// Blur event for visual feedback
emailInput.addEventListener('blur', handleEmailBlur);

// Focus event - clear valid state
emailInput.addEventListener('focus', function() {
  emailInput.classList.remove('valid');
});

// Dismiss button
dismissBtn.addEventListener('click', resetForm);

/* ============================================
   ACCESSIBILITY & KEYBOARD SUPPORT
   ============================================ */

// Allow Escape key to dismiss success message
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !successSection.hidden) {
    resetForm();
  }
});

// Log initial state
console.log('✓ Newsletter form validation initialized');

/* ============================================
   STEP 8: INTERACTIVE STATES & ACCESSIBILITY
   ============================================ */

/**
 * Add visual feedback for form interactions
 * Keyboard navigation support
 */

// Tab key navigation enhancement
document.addEventListener('keydown', function(e) {
  // Focus management between form and dismiss button
  if (e.key === 'Tab') {
    // If success message is visible and user tabs from dismiss button
    if (!successSection.hidden && document.activeElement === dismissBtn) {
      e.preventDefault();
      emailInput.focus();
      showSignupSection();
    }
  }
});

/**
 * Add keyboard shortcut to focus email input
 * Alt/Ctrl + E = focus email field
 */
document.addEventListener('keydown', function(e) {
  if ((e.altKey || e.ctrlKey) && e.key === 'e') {
    e.preventDefault();
    emailInput.focus();
  }
});

/**
 * Enter key support for email submission
 * Already handled by form submission handler
 */

/**
 * Visual feedback on form submission
 */
signupForm.addEventListener('submit', function(e) {
  const submitBtn = signupForm.querySelector('button');
  
  // Add loading state
  if (submitBtn) {
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
  }
  
  // Simulate validation delay
  setTimeout(function() {
    if (submitBtn) {
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    }
  }, 100);
});

/**
 * Add input animation on focus
 */
emailInput.addEventListener('focus', function() {
  const label = signupForm.querySelector('label');
  if (label) {
    label.style.transform = 'translateY(-2px)';
  }
});

emailInput.addEventListener('blur', function() {
  const label = signupForm.querySelector('label');
  if (label) {
    label.style.transform = 'translateY(0)';
  }
});

/**
 * Add smooth focus indicator support
 */
signupForm.addEventListener('focusin', function(e) {
  if (e.target === emailInput) {
    signupForm.style.outline = 'none';
  }
});

/**
 * Enhance error focus management
 */
function focusErrorField() {
  emailInput.focus();
  // Scroll error message into view
  emailError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Success message - focus management
 */
function manageFocusOnSuccess() {
  // Move focus to dismiss button in success message
  setTimeout(function() {
    dismissBtn.focus();
    dismissBtn.style.outline = '2px solid var(--primary-red)';
    dismissBtn.style.outlineOffset = '2px';
  }, 600); // Wait for animation to complete
}

/**
 * Update displaySuccess to include focus management
 */
const originalDisplaySuccess = displaySuccess;
displaySuccess = function(email) {
  originalDisplaySuccess(email);
  manageFocusOnSuccess();
};

/**
 * Add aria-live region for error announcements
 */
function announceError(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'alert');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = 'Error: ' + message;
  document.body.appendChild(announcement);
  
  setTimeout(function() {
    announcement.remove();
  }, 3000);
}

/**
 * Announce success to screen readers
 */
function announceSuccess(email) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = 'Success! Confirmation email sent to ' + email;
  document.body.appendChild(announcement);
  
  setTimeout(function() {
    announcement.remove();
  }, 5000);
}

/**
 * Hook announcements into validation
 */
const originalShowError = showError;
showError = function(message) {
  originalShowError(message);
  announceError(message);
};

const originalDisplaySuccessWithAnnounce = displaySuccess;
displaySuccess = function(email) {
  originalDisplaySuccessWithAnnounce(email);
  announceSuccess(email);
};

/**
 * Add screen reader only styles (sr-only)
 */
const style = document.createElement('style');
style.textContent = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
document.head.appendChild(style);

/**
 * Add visual focus indicator on form
 */
signupForm.addEventListener('focusin', function() {
  signupForm.style.outline = 'none';
});

/**
 * Helper function to show signup section
 */
function showSignupSection() {
  if (signupSection.classList.contains('hidden')) {
    signupSection.classList.remove('hidden');
    signupSection.style.display = 'flex';
  }
}

console.log('✓ Interactive states and accessibility enhancements loaded');
