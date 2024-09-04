const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');

class MobileValidator {
  constructor() {
    this.init();
  }

  init() {
    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        const inputs = document.querySelectorAll('.mobile-validate');
        inputs.forEach(input => {
          input.addEventListener('blur', this.validate.bind(this));
        });
      });
    }
  }

  validate(event) {
    const input = event.target;
    const number = input.value;
    const country = 'IN'; // Set default country to India

    try {
      const phoneNumber = parsePhoneNumber(number, country);
      if (isValidPhoneNumber(number, country) && phoneNumber.getType() === 'MOBILE' && this.isIndianMobileNumber(number)) {
        input.setCustomValidity('');
        input.classList.remove('invalid');
        input.classList.add('valid');
      } else {
        throw new Error('Invalid Indian mobile number');
      }
    } catch (error) {
      input.setCustomValidity('Invalid Indian mobile number');
      input.classList.remove('valid');
      input.classList.add('invalid');
    }
  }

  isIndianMobileNumber(number) {
    // Indian mobile numbers typically start with 6, 7, 8, or 9 and have 10 digits
    const indianMobileRegex = /^[6-9]\d{9}$/;
    return indianMobileRegex.test(number.replace(/\D/g, ''));
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileValidator;
}

if (typeof window !== 'undefined') {
  window.MobileValidator = MobileValidator;
}
