import { startRepl } from "./repl.js";
import { initState } from "./state.js";

function main() {
  let state = initState();
  try {
    startRepl(state);
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error : ${error.message}`)
    }
    else {
      console.log(`Unexpected Error: ${error}`)
    }
  }

}

main();