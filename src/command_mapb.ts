import { ShallowLocations } from "./pokeAPI.js";
import { State } from "./state.js";

export async function mapb(state: State){
const data: ShallowLocations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    const locationList: string[] = data["locations"];
    for (var i in locationList) {
        console.log(locationList[i])
    }
}