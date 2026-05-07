import { commandExit } from "./command_exit.js";
import { Location } from "./pokeAPI.js";
import { CLICommand, State } from "./state.js";

export async function explore(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0 || args.length > 2) {
        commandExit(state);
    }
    console.log(`printing argument : ${args[0]}`);

    const url = `https://pokeapi.co/api/v2/location-area/${args[0]}`;
    console.log("Exploring pastoria-city-area... \n Found Pokemon:");
    const response: Location = await state.pokeAPI.fetchLocation(args[0]);
    let pokemonList: string[] = response.pokemonList;
    for (let i in pokemonList) {
        console.log(pokemonList[i])
    }


}