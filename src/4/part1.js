const input = '138307-654504';


const passwords = findPasswordsInRange(138307, 654504);
console.log(passwords.length);


function findPasswordsInRange(low, high) {
  const passwords = [];
  for (let i = low; i <= high; i++) {
    if (isPasswordish(toDigits(i))) {
      passwords.push(i);
    }
  }
  return passwords;
}

function toDigits(num) {
  return num.toString().split('').map(c => parseInt(c, 10));
}

function isPasswordish(digits) {
  if (digits.length != 6) {
    return false;
  }

  if (!hasDoubleDigits(digits)) {
    return false;
  }

  if (!digitsIncrease(digits)) {
    return false;
  }

  return true;
}

function hasDoubleDigits(digits) {
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] == digits[i+1]) {
      return true;
    }
  }

  return false;
}

function digitsIncrease(digits) {
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i+1]) {
      return false;
    }
  }

  return true;
}