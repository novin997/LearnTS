
import { Worker, isMainThread, parentPort } from "worker_threads";

/**
 * ThreadPool Typescript
 */
export class ThreadPool {
    #threadCount: number;
    worker: Worker;
    // worker2: Worker;
    path: string;


    constructor(size: number, workerFile: string) {
        this.#threadCount = size;
        // this.worker = new Worker(new URL(workerFile, import.meta.url), {});
        this.worker = new Worker(new URL(import.meta.url), {});
        this.path = new URL(workerFile, import.meta.url).href;
    }

    async run(name: string, data: {}) {
        return new Promise((resolve, reject) => {
            // console.log(this.worker);
            this.worker.postMessage({ name, data, path: this.path });
            this.worker.on('message', resolve);
            this.worker.on('error', reject);
            this.worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`stopped with  ${code} exit code`));
            })
        })
    }

    async run2(name: string, data: {}) {
        return new Promise((resolve, reject) => {
            const worker2 = new Worker(new URL(import.meta.url), {});
            worker2.postMessage({ name, data });
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
    parentPort?.on('message', ({ name, data, path }) => {
        // console.log(functions);
        console.log(data.n);
        (async () => {
            const workers = await import(path);
            // console.log(workers);
            parentPort?.postMessage(workers[name](data.n));
        })()
    });
}
