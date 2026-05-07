import { commandExit } from "./command_exit.js";
import { explore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { map } from "./command_map.js";
import { mapb } from "./command_mapb.js";
import { CLICommand } from "./state.js";
import {catchPokemon} from "./command_catch.js";
import { inspect } from "./command_inspect.js";
import { pokedex } from "./commad_pokedex.js";



export function getCommands(): Record<string, CLICommand>{
    return{
        exit: {
            name: "exit",
            description : "Exits the pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        map: {
            name: "map",
            description: "Displays the next 20 locations",
            callback: map
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: mapb
        },
        explore: {
            name: "explore",
            description: "Displays all the Pokemons in a location",
            callback: explore
        },
        catch: {
            name: "catch",
            description: "Allows user to attempt to catch a Pokemon",
            callback: catchPokemon
        },
        inspect:{
            name: "inspect",
            description: "Displays Pokemon Information",
            callback: inspect
        },
        pokedex:{
            name: "pokedex",
            description: "Displays all the pokemon caught",
            callback: pokedex
        }
    }
}


