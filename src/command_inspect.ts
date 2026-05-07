import { commandExit } from "./command_exit.js";
import { Pokemon } from "./pokeAPI.js";
import { State } from "./state.js";

export async function inspect(state: State, ...args: string[]): Promise<void> {
    if (args.length == 0 || args.length > 2) {
        commandExit(state);
    }

    const pokemon: Pokemon = await state.pokeAPI.fetchPokemonInfo(args[0]);

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);

    console.log(`Stats:`);
    console.log(`   -hp: ${pokemon.hp}`);
    console.log(`   -attack: ${pokemon.attack}`);
    console.log(`   -defense: ${pokemon.defense}`);
    console.log(`   -special-attack: ${pokemon.specialattack}`);
    console.log(`   -special-defense: ${pokemon.specialdefense}`);
    console.log(`   -speed: ${pokemon.speed}`);

    console.log(`Types:`);
    for (let i in pokemon.types) {
        console.log(`   -${pokemon.types[i]}`);
    }
}