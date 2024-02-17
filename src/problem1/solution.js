var sum_to_n_a = function(n) {
    // your code here
    let sum = 0;
    for (let num  = 1; num <= n; num++){
        sum+=num;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // your code here
    if(n == 0){
        return n;
    }
    return n + sum_to_n_b(n-1);
};

var sum_to_n_c = function(n) {
    // your code here
    return (n*(n+1))/2;
};

console.log(sum_to_n_a(100) == 5050);
console.log(sum_to_n_b(100) == 5050);
console.log(sum_to_n_c(100) == 5050);