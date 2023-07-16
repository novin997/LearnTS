// import { runService } from "./threadpool";

import { ThreadPool } from "./threadpool";

console.log("Hello World");

let func = (n: number) => {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        sum += i;
    }
    // console.log(sum);
    return sum;
}

const functions: Record<string, Function> = {
    sum: func
}

const threadPool = new ThreadPool(3, functions);

(async () => {
    let result = await threadPool.run("sum", { n: 4 });
    console.log(result);
    result = await threadPool.run("sum", { n: 5 });
    console.log(result);
    result = await threadPool.run("sum", { n: 6 });
    console.log(result);
    const result2 = await threadPool.run2("sum", { n: 7 });
    console.log(result2);
})()