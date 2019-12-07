const input = '138307-654504';


const passwords = findPasswordsInRange(138307, 654504);
console.log(passwords.length);

// test(112233);
// test(123444);
// test(111122);
// test(124444);
// test(113444);
// test(788999);
// test(122345);
// test(122234);

function test(num) {
  console.log(`isPasswordish(${num}): ${isPasswordish(toDigits(num))}`)
}


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

  if (!hasIsolatedDoubleDigits(digits)) {
    return false;
  }


  if (!digitsIncrease(digits)) {
    return false;
  }

  return true;
}

function hasIsolatedDoubleDigits(digits) {
  for (let i = 0; i < digits.length - 1; i++) {
    const isStart = i == 0;
    const isEnd = i + 2 == digits.length;
    const isDouble = digits[i] == digits[i+1];
    const isNotTripleToLeft = isStart || digits[i] != digits[i-1];
    const isNotTripleToRight = isEnd || digits[i+1] != digits[i+2];

    if (isDouble && isNotTripleToLeft && isNotTripleToRight) {
      return true;
    }
  }

  return false;
}

function digitsIncrease(digits) {
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) {
      return false;
    }
  }

  return true;
}