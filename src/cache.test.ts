import { Cache, CacheEntry } from "./pokecache.js";
import { test, expect } from "vitest";
/**
 *  locations: string[]
    nextLocationsURL: string,
    prevLocationsURL: string
 */
var val1: CacheEntry<any> = {
    createdAt: Date.now(),
    val: {
        locations: [
            "canalave-city-area",
            "eterna-city-area",
            "pastoria-city-area",
            "sunyshore-city-area",
            "sinnoh-pokemon-league-area",
            "oreburgh-mine-1f",
            "oreburgh-mine-b1f",
            "valley-windworks-area",
            "eterna-forest-area",
            "fuego-ironworks-area",
            "mt-coronet-1f-route-207",
            "mt-coronet-2f",
            "mt-coronet-3f",
            "mt-coronet-exterior-snowfall",
            "mt-coronet-exterior-blizzard",
            "mt-coronet-4f",
            "mt-coronet-4f-small-room",
            "mt-coronet-5f",
            "mt-coronet-6f",
            "mt-coronet-1f-from-exterior"
        ],
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area?offset=20&limit=20",
        prevLocationsURL: null
    }
};

var val2: CacheEntry<any> = {
    createdAt: Date.now(),
    val: {
        locations: [
            "mt-coronet-1f-route-216",
            "mt-coronet-1f-route-211",
            "mt-coronet-b1f",
            "great-marsh-area-1",
            "great-marsh-area-2",
            "great-marsh-area-3",
            "great-marsh-area-4",
            "great-marsh-area-5",
            "great-marsh-area-6",
            "solaceon-ruins-2f",
            "solaceon-ruins-1f",
            "solaceon-ruins-b1f-a",
            "solaceon-ruins-b1f-b",
            "solaceon-ruins-b1f-c",
            "solaceon-ruins-b2f-a",
            "solaceon-ruins-b2f-b",
            "solaceon-ruins-b2f-c",
            "solaceon-ruins-b3f-a",
            "solaceon-ruins-b3f-b",
            "solaceon-ruins-b3f-c"
        ],
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area?offset=40&limit=20",
        prevLocationsURL: "https://pokeapi.co/api/v2/location-area?offset=0&limit=20"
    }
};
test.concurrent.each([
    {
        key: "https://pokeapi.co/api/v2/location-area",
        val: val1,
        interval: 500, // 1/2 second
    },
    {
        key: "https://pokeapi.co/api/v2/location-area?offset=20&limit=20",
        val: val2,
        interval: 1000, // 1 second
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    // await new Promise((resolve) => setTimeout(resolve, interval * 2));
    // const reaped = cache.get(key);
    // expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});