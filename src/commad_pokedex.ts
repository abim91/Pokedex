import { State } from "./state.js";

export async function pokedex(state: State) {
    console.log("Your Pokedex:")
    const pokemonList: string[] = state.pokeAPI.getPokemonList()
    for (let pokemon of pokemonList) {
        console.log(`   - ${pokemon}`);
    }
}