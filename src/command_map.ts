import { ShallowLocations } from "./pokeAPI.js";
import { State } from "./state.js";

export async function map(state: State) {
    const data: ShallowLocations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    const locationList: string[] = data["locations"];
    for (var i in locationList) {
        console.log(locationList[i])
    }
    state.prevLocationsURL = state.nextLocationsURL;
    state.nextLocationsURL = data["nextLocationsURL"];
}