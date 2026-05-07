export type CacheEntry<T> = {
    createdAt: number,
    val: T
}
export class Cache {
    constructor(interval: number ){
        this.#interval = interval;
        this.#startReapLoop();
    }

    #cache = new Map<String, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number ;
    add<t>(key: string, entry: CacheEntry<any>) {
        this.#cache.set(key, entry);
    }

    get<t>(key: string) {
        return this.#cache.get(key) || undefined;
    }

    #reap() {
        for (let key in this.#cache) {

            const entry = this.#cache.get(key);

            if (!entry) {
                throw new Error(`Key ${key} not found in cache`);
            }

            const limit = Date.now() - this.#interval;
            if (entry.createdAt < limit) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(){
       this.#reapIntervalId =  setInterval(()=>{
        this.#reap();
       }, this.#interval);

    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;


    }
}