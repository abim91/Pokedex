import { commandExit } from "./command_exit.js";
import { Pokemon } from "./pokeAPI.js";
import { State } from "./state.js";

export async function catchPokemon(state: State, ...args: string[]): Promise<void> {
    if (args.length == 0 || args.length > 2) {
        commandExit(state);
    }
    console.log(`Throwing a Pokeball at ${args[0]}...`);

    const pokemon: Pokemon = await state.pokeAPI.fetchPokemonInfo(args[0]);
    const base_experience = pokemon["base_experience"];

    const MAX_EXP = 300;
    const powerLevel = Math.min(base_experience / MAX_EXP, 1);
    const upperBound = 100 - (powerLevel * 100);
    const minCatchRate = 5;
    let catchPercentage = Math.floor(Math.random() * upperBound) + minCatchRate;

    console.log(catchPercentage);

    if (catchPercentage >= 50) {
        console.log(`${args[0]} was caught!`);
    } else {
        console.log(`${args[0]} escaped!`);
        state.pokeAPI.addPokemon(pokemon);
    }
}