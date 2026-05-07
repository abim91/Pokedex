import { CacheEntry, Cache } from "./pokecache.js";

var cache: Cache = new Cache(5000);

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    static pokedex: Record<string, Pokemon> = {};
    constructor() {
    };

    async fetchLocations(pageURL: string): Promise<ShallowLocations> {
        const value = cache.get(pageURL);

        if (value !== undefined) {
            const cacheValue: CacheEntry<any> = {
                createdAt: value.createdAt,
                val: value.val
            };

            return cacheValue.val;
        }
        // implement this
        try {

            const response = await fetch(pageURL, {
                method: "GET",
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await response.json();
            const nextURL = data["next"];
            const previousURL = data["previous"];
            let locations: string[] = [];
            for (var index in data["results"]) {
                let locationName = data["results"][index]["name"];
                locations.push(locationName);
            }

            const locationsNames: ShallowLocations = {
                locations: locations,
                nextLocationsURL: nextURL,
                prevLocationsURL: previousURL
            }

            const cacheValue: CacheEntry<any> = {
                val: locationsNames,
                createdAt: Date.now()
            };

            cache.add(pageURL, cacheValue);
            return locationsNames
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                // console.log(error.message);
                throw Error(error.message)
            }
            else {
                // console.log("An unknown error was thrown");
                throw "An unknown error was thrown"
            }
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const value = cache.get(locationURL);
        if (value !== undefined) {
            console.log("here");
            console.log(value);
            const cacheValue: CacheEntry<any> = {
                createdAt: value.createdAt,
                val: value.val
            };

            return cacheValue.val;
        }

        try {
            const data = await fetch(locationURL, {
                method: "GET",
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                }
            })
            let parsedData = await data.json();
            const pokemonEncountred = parsedData["pokemon_encounters"];
            const response: Location = {
                pokemonList: []
            };

            for (let i in pokemonEncountred) {
                response["pokemonList"].push(pokemonEncountred[i]["pokemon"]["name"]);
            }

            const cacheNewLocation: CacheEntry<any> = {
                createdAt: Date.now(),
                val: response
            }

            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw Error(error.message)
            }
            else {
                throw "An Unknown error was thrown"
            }
        }
    }

    async fetchPokemonInfo(pokemonName: string): Promise<Pokemon> {
        const url: string = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        let pokemoneInfo: Pokemon = {
            name: "",
            height: 0,
            weight: 0,
            hp: 0,
            attack: 0,
            defense: 0,
            specialattack: 0,
            specialdefense: 0,
            speed: 0,
            types: [],
            base_experience: 0

        };
        try {
            const data = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                }
            });

            let response = await data.json();

            pokemoneInfo.name = response["name"];
            pokemoneInfo.height = response["height"];
            pokemoneInfo.weight = response["weight"];
            const stats = response["stats"];

            let statMap: {
                name: string,
                value: number;
            }[] = [];
            for (let index in stats) {
                let current = stats[index];
                let baseStat: number = current["base_stat"] as number;
                let statName: string = current["stat"]["name"].replaceAll("-", "");//for  special-attack
                statMap.push({
                    name: statName,
                    value: baseStat
                });
            }

            for (const [k, v] of Object.entries(statMap)) {
                let varName = v.name;
                if (v.name == "hp") {
                    pokemoneInfo.hp = v.value as number;
                }
                if (v.name === "attack") {
                    pokemoneInfo.attack = v.value as number;
                }
                if (v.name === "defense") {
                    pokemoneInfo.defense = v.value as number;
                }
                if (v.name == "specialattack") {
                    pokemoneInfo.specialattack = v.value as number;
                }
                if (v.name == "specialdefense") {
                    pokemoneInfo.specialdefense = v.value as number;
                }
                if (v.name == "speed") {
                    pokemoneInfo.speed = v.value as number;
                }
                if (v.name == "base_experience") {
                    pokemoneInfo.base_experience = v.value as number;
                }

            }

            const types = response["types"];
            let typeList: string[] = [];

            for (let index in types) {
                let type: string = types[index]["type"]["name"];
                typeList.push(type);
            }

            pokemoneInfo.types = typeList;
            // console.log(pokemoneInfo);
            return pokemoneInfo

        }
        catch (error: unknown) {
            if (error instanceof Error) {
                throw Error(error.message)
            }
            else {
                throw "An Unknown error was thrown"
            }
        }

    }

    addPokemon(pokemon: Pokemon) {
        PokeAPI.pokedex[pokemon.name] = pokemon;
    }

    getPokemonList(): string[] {
        let response: string[] = []
        for (let key in PokeAPI.pokedex) {
            response.push(key);
        }
        return response
    }

}

export type ShallowLocations = {
    locations: string[]
    nextLocationsURL: string,
    prevLocationsURL: string
}

export type Location = {
    // add properties here
    pokemonList: string[]
};

export type Pokemon = {
    name: string,
    height: number,
    weight: number,
    hp: number,
    attack: number,
    defense: number,
    specialattack: number,
    specialdefense: number,
    speed: number,
    types: string[],
    base_experience: number
}

