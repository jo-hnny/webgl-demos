function computerRange(digit, min, max) {
  const base = Math.pow(2, 8 - digit);
  const range = [];

  for (let i = 0; i < max >> (8 - digit); i++) {
    range.push(min + i * base);
  }

  return range;
}

console.log(computerRange(8, 16, 16));
