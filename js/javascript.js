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
 */
function displaySuccess(email) {
  // Set user email in success message
  userEmail.textContent = email;
  
  // Hide signup form section
  signupSection.style.display = 'none';
  
  // Show success section
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
