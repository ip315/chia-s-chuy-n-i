// DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login-button');

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
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
    loginForm.insertBefore(successDiv, loginForm.firstChild);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

function setLoading(isLoading) {
    if (isLoading) {
        loginButton.disabled = true;
        loginButton.classList.add('loading');
        loginButton.textContent = '';
    } else {
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
        loginButton.textContent = 'LOGIN';
    }
}

// Real-time validation
emailInput.addEventListener('input', function() {
    clearError(this);
});

passwordInput.addEventListener('input', function() {
    clearError(this);
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

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Clear previous errors
    clearError(emailInput);
    clearError(passwordInput);
    
    let hasErrors = false;
    
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
    
    if (hasErrors) {
        return;
    }
    
    // Simulate login process
    setLoading(true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll show success for any valid input
        // In a real application, you would make an actual API call here
        console.log('Login attempt:', { email, password: '***' });
        
        showSuccess('Login successful! Redirecting...');
        
        // Simulate redirect after success
        setTimeout(() => {
            // In a real app, you would redirect to the dashboard
            console.log('Redirecting to dashboard...');
            // window.location.href = '/dashboard';
        }, 1500);
        
    } catch (error) {
        console.error('Login error:', error);
        showError(emailInput, 'Login failed. Please check your credentials.');
    } finally {
        setLoading(false);
    }
});

// Forgot password functionality
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showError(emailInput, 'Please enter your email address first');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    // Simulate password reset
    showSuccess(`Password reset link sent to ${email}`);
    console.log('Password reset requested for:', email);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form when focused on inputs
    if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-focus email input on page load
window.addEventListener('load', function() {
    emailInput.focus();
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
console.log('🎉 Welcome to the Login Page!');
console.log('This is a demo login form. Use any valid email and password (6+ characters) to test.');
