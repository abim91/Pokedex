import { CLICommand, State } from "./state.js";

export async function commandHelp(state:State){
    const commands: Record<string, CLICommand> = state.commands;
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for(let key in commands){
        console.log(`${commands[key].name}: ${commands[key].description}`);
    }

}