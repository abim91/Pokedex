import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from 'node:process';
import { getCommands } from "./command_type.js";
import { PokeAPI } from "./pokeAPI.js";

export type CLICommand = {
    name: string;
    description: string;
    // callback: (commands: Record<string, CLICommand>) => void;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>;
    createInterface: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
}

export function initState(): State {
    return {
        commands: getCommands(),
        createInterface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        pokeAPI: new PokeAPI(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL: ""
    }
}