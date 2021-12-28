function plural(number: number, first: string, second: string, third?: string) {
  third = third ?? second;
  let abs = Math.abs(number);
  abs %= 100;
  if (abs >= 5 && abs <= 20) {
    return third;
  }
  abs %= 10;
  if (abs === 1) {
    return first;
  }
  if (abs >= 2 && abs <= 4) {
    return second;
  }
  return third;
}

export default plural;
