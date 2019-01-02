
/**
 * print if index in an array is a prime number
 *
 * @param n number to print primes to
 */
export default function printPrimes (n: number) {
  let primes: boolean[] = [false, false]; // 0 and 1 are not prime by definition
  let i;

  for (i = 2; i <= n; i++) {
    primes[i] = true; // assume all are prime by default
  }

  let divisor: number;
  for (divisor = 2; divisor * divisor <= n; divisor++) {
    if (primes[divisor]) {
      for (i = 2 * divisor; i <= n; i += divisor) {
        primes[i] = false;
      }
    }
  }

  for (i = 0; i < primes.length; i++) {
    console.log(`is ${i} prime? ${primes[i]}`);
  }
}
