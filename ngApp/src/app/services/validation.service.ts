export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `A little more please.  Minimum length is ${validatorValue.requiredLength}`,
      'invalidName': 'Name is like bad - service',
      'parsLenShort':  'Pars expects more than 18 values of 3, 4, or 5 separated by commas',
      'parsLenLong' : 'Pars expects less than 18 values of 3, 4, or 5 separated by commas',
      'parsValue': 'Par values should be 3, 4 or 5 separated by commas',
      'hCapsLenShort': 'Handicap expects more than 18 values between 1-18 separated by commas',
      'hCapsLenLong': 'Handicap expects less than 18 values between 1-18 separated by commas',
      'hCapsValue': 'Handicap values should be 1 - 18 separated by commas',
      'yardsLenShort': 'Yards expects more than 18 values between 90-600 separated by commas',
      'yardsLenLong': 'Yards expects less than 18 values between 90-600 separated by commas',
      'yardsValue': 'Yards values should be 90 - 600 separated by commas',
      'invalidDate': 'Use datepicker to get a valid format'
    };

    return config[validatorName];
  }

  static parsValidator(control) {
    const condition1 = control.value;
    let parEntry: Number = condition1.substring(condition1.length - 1, condition1.length)
    if (parEntry < 3 || parEntry > 5) {
      // console.log('ConditionP', condition1, 'Error', condition1.substring(condition1.length - 1, condition1.length));
      return { parsValue: true };
    }
    else if (condition1.length < 35) {
      // console.log('ConditionPL', condition1.length);
      return { parsLenShort: true }
    }
    else if (condition1.length > 36) {
      // console.log('ConditionPH', condition1.length);
      return { parsLenLong: true }
    }
    else {
      // console.log('ConditionPN', condition1, "Null", condition1.substring(condition1.length - 2, condition1.length - 1));
      return null;
    }
  }

  static hCapsValidator(control) {
    const condition1 = control.value;
    let hCapEntry: Number = condition1.substring(condition1.length - 2, condition1.length)
    if (hCapEntry < 1 || hCapEntry > 18) {
      // console.log('ConditionH', condition1, 'Error', condition1.substring(condition1.length - 2, condition1.length));
      return { hCapsValue: true };
      // TODO Check for duplicate hCaps
    }
    else if (condition1.length < 44) {
      // console.log('ConditionHL', condition1.length);
      return { hCapsLenShort: true }
    }
    else if (condition1.length > 45) {
      // console.log('ConditionHH', condition1.length);
      return { hCapsLenLong: true }
    }
    else {
      // console.log('ConditionHN', condition1, "Null", condition1.substring(condition1.length - 2, condition1.length - 1));
      return null;
    }
  }

  static yardsValidator(control) {
    const condition1 = control.value;
    let yardsEntry: Number = condition1.substring(condition1.length - 3, condition1.length)
    //TODO Wont catch 4 digit entries
    if (yardsEntry < 90 || yardsEntry > 600) {
      // console.log('ConditionY', condition1, 'Error', condition1.substring(condition1.length - 3, condition1.length));
      return { yardsValue: true};
    }
    else if (condition1.length < 70) {
      // console.log('ConditionYL', condition1.length);
      return { yardsLenShort: true }
    }
    else if (condition1.length > 72) {
      // console.log('ConditionYH', condition1.length);
      return { yardsLenLong: true }
    }
    else {
      // console.log('ConditionYN', condition1, "Null", condition1.substring(condition1.length - 2, condition1.length - 1));
      return null;
    }
  }
  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
  static nameValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidName': true };
    }
  }

  static dateValidator(control) {
    // console.log('ConditionpreCheck', control.value);
    if (control.value == !null) {
      return null;
        } else {
      console.log('ConditionInvaildDate', control.value);
      return { 'invalidDate': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
