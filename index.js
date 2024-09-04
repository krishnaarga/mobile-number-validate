const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');

class MobileValidator {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('.mobile-validate');
      inputs.forEach(input => {
        input.addEventListener('blur', this.validate.bind(this));
      });
    });
  }

  validate(event) {
    const input = event.target;
    const number = input.value;
    const country = input.dataset.country || 'US'; // Default to US if not specified

    try {
      const phoneNumber = parsePhoneNumber(number, country);
      if (isValidPhoneNumber(number, country) && phoneNumber.getType() === 'MOBILE') {
        input.setCustomValidity('');
        input.classList.remove('invalid');
        input.classList.add('valid');
      } else {
        throw new Error('Invalid mobile number');
      }
    } catch (error) {
      input.setCustomValidity('Invalid mobile number');
      input.classList.remove('valid');
      input.classList.add('invalid');
    }
  }
}

// Export the class for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileValidator;
}

// Make the class available globally for browser environments
if (typeof window !== 'undefined') {
  window.MobileValidator = MobileValidator;
}

