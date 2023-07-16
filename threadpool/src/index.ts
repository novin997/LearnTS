// import { runService } from "./threadpool";
import { ThreadPool } from "./threadpool";

console.log("Hello World");

const threadPool = new ThreadPool(3, "worker.ts");

(async () => {
    let result = await threadPool.run("sum", { n: 4 });
    console.log(result);
    result = await threadPool.run("sum", { n: 5 });
    console.log(result);
    result = await threadPool.run("multiply", { n: 6 });
    console.log(result);
    // const result2 = await threadPool.run2("multiply", { n: 7 });
    // console.log(result2);
})()