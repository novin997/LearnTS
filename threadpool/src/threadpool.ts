
import { Worker, isMainThread, parentPort, MessageChannel } from "worker_threads";


let functionList: Record<string, Function> = {};

export class ThreadPool {
    #threadCount: number;
    // worker: Worker;
    // worker2: Worker;

    constructor(size: number, functions: Record<string, Function>) {
        this.#threadCount = size;
        functionList = functions;
    }

    async run(name: string, data: {}) {
        return new Promise((resolve, reject) => {
            // console.log(this.worker);
            const worker = new Worker(new URL(import.meta.url), {});
            worker.postMessage({ data });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`stopped with  ${code} exit code`));
            })
        })
    }

    async run2(name: string, data: {}) {
        return new Promise((resolve, reject) => {
            const worker2 = new Worker(new URL(import.meta.url), {});
            worker2.postMessage({ data });
            worker2.on('message', resolve);
            worker2.on('error', reject);
            worker2.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`stopped with  ${code} exit code`));
            })
        })
    }
}

if (!isMainThread) {
    console.log("call isMainThread")
    parentPort?.on('message', ({ data }) => {
        console.log(functionList);
        // console.log(data.n);
        parentPort?.postMessage(data.n);
    });
}



// export let runService: Function;

// if (isMainThread) {
//     runService = async (data: {}) => {
//         return new Promise((resolve, reject) => {

//             // import workerExample.js script..

//             const worker = new Worker(new URL(import.meta.url), { workerData: data });
//             worker.on('message', resolve);
//             worker.on('error', reject);
//             worker.on('exit', (code) => {
//                 if (code !== 0)
//                     reject(new Error(`stopped with  ${code} exit code`));
//             })
//         })
//     }
// } else {
//     console.log(workerData);
//     console.log("run worker thread");
//     parentPort?.postMessage(3);
// }

