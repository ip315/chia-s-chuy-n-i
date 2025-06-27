// DOM elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const signupButton = document.querySelector('.login-button');

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

function showError(input, message) {
    input.classList.add('input-error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
    input.classList.remove('input-error');
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccess(message) {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Add new success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = message;
    signupForm.insertBefore(successDiv, signupForm.firstChild);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

function setLoading(isLoading) {
    if (isLoading) {
        signupButton.disabled = true;
        signupButton.classList.add('loading');
        signupButton.textContent = '';
    } else {
        signupButton.disabled = false;
        signupButton.classList.remove('loading');
        signupButton.textContent = 'SIGN UP';
    }
}

function updatePasswordStrength(password) {
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthMeter || !strengthText) return;
    
    // Reset classes
    strengthMeter.className = 'strength-meter';
    
    if (password.length === 0) {
        strengthMeter.style.width = '0';
        strengthText.textContent = '';
    } else if (password.length < 6) {
        strengthMeter.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
    } else if (password.length < 10) {
        strengthMeter.classList.add('strength-medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthMeter.classList.add('strength-strong');
        strengthText.textContent = 'Strong';
    }
}

// Real-time validation
nameInput.addEventListener('input', function() {
    clearError(this);
});

emailInput.addEventListener('input', function() {
    clearError(this);
});

passwordInput.addEventListener('input', function() {
    clearError(this);
    clearError(confirmPasswordInput);
    updatePasswordStrength(this.value);
});

confirmPasswordInput.addEventListener('input', function() {
    clearError(this);
    clearError(passwordInput);
});

emailInput.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    }
});

passwordInput.addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        showError(this, 'Password must be at least 6 characters long');
    }
});

confirmPasswordInput.addEventListener('blur', function() {
    if (this.value && !passwordsMatch(passwordInput.value, this.value)) {
        showError(this, 'Passwords do not match');
    }
});

// Form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;
    
    // Clear previous errors
    clearError(nameInput);
    clearError(emailInput);
    clearError(passwordInput);
    clearError(confirmPasswordInput);
    
    let hasErrors = false;
    
    // Validate name
    if (!name) {
        showError(nameInput, 'Full name is required');
        hasErrors = true;
    }
    
    // Validate email
    if (!email) {
        showError(emailInput, 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        hasErrors = true;
    }
    
    // Validate password
    if (!password) {
        showError(passwordInput, 'Password is required');
        hasErrors = true;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters long');
        hasErrors = true;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
        showError(confirmPasswordInput, 'Please confirm your password');
        hasErrors = true;
    } else if (!passwordsMatch(password, confirmPassword)) {
        showError(confirmPasswordInput, 'Passwords do not match');
        hasErrors = true;
    }
    
    // Validate terms
    if (!termsAccepted) {
        const termsLabel = document.querySelector('.terms-checkbox label');
        termsLabel.style.color = '#ef4444';
        termsLabel.style.fontWeight = '500';
        hasErrors = true;
    } else {
        const termsLabel = document.querySelector('.terms-checkbox label');
        termsLabel.style.color = '';
        termsLabel.style.fontWeight = '';
    }
    
    if (hasErrors) {
        return;
    }
    
    // Simulate signup process
    setLoading(true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll show success for any valid input
        console.log('Signup attempt:', { name, email, password: '***' });
        
        showSuccess('Account created successfully! Redirecting...');
        
        // Simulate redirect after success
        setTimeout(() => {
            // In a real app, you would redirect to the dashboard or login page
            console.log('Redirecting to login page...');
            // window.location.href = '/login';
        }, 1500);
        
    } catch (error) {
        console.error('Signup error:', error);
        showError(emailInput, 'Signup failed. Please try again.');
    } finally {
        setLoading(false);
    }
});

// Add password strength meter after password input
passwordInput.insertAdjacentHTML('afterend', `
    <div class="password-strength">
        <div class="strength-meter"></div>
    </div>
    <div class="strength-text"></div>
`);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form when focused on inputs
    if (e.key === 'Enter' && (e.target === nameInput || e.target === emailInput || 
        e.target === passwordInput || e.target === confirmPasswordInput)) {
        signupForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-focus name input on page load
window.addEventListener('load', function() {
    nameInput.focus();
});

// Add some interactive effects
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.style.transform = 'translateY(-2px)';
        this.parentNode.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentNode.style.transform = 'translateY(0)';
    });
});

// Add hover effects to landmark icons
const landmarkIcons = document.querySelectorAll('.landmark-icon');
landmarkIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Console welcome message
console.log('🎉 Welcome to the Sign Up Page!');
console.log('This is a demo signup form. Fill in the details to test.');