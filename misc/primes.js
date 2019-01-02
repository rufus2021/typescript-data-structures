"use strict";
exports.__esModule = true;
/**
 * print if index in an array is a prime number
 *
 * @param n number to print primes to
 */
function printPrimes(n) {
    var primes = [false, false]; // 0 and 1 are not prime by definition
    var i;
    for (i = 2; i <= n; i++) {
        primes[i] = true; // assume all are prime by default
    }
    var divisor;
    for (divisor = 2; divisor * divisor <= n; divisor++) {
        if (primes[divisor]) {
            console.log("divisor is " + divisor);
            for (i = 2 * divisor; i <= n; i += divisor) {
                console.log("i is " + i);
                primes[i] = false;
            }
        }
    }
    for (i = 0; i < primes.length; i++) {
        console.log("is " + i + " prime? " + primes[i]);
    }
}
exports["default"] = printPrimes;
