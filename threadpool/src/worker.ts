export const sum = (n: number) => {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        sum += i;
    }
    // console.log(sum);
    return sum;
}

export const multiply = (n: number) => {
    let total = 1;
    for (let i = 1; i < n; i++) {
        total *= i;
    }
    // console.log(sum);
    return total;
}

