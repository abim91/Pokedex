# Pokedex CLI

A command-line Pokedex built with TypeScript and Node.js. It runs a custom REPL that talks to the PokeAPI, letting you explore map areas, catch Pokemon, and view their stats right from your terminal.

## Getting Started

Make sure you have Node.js and npm installed before you begin.

* **Clone the repo** to your local machine.
* **Install dependencies** by running `npm install`.
* **Start the app** by running `npm run dev`. This compiles the TypeScript code and boots up the CLI automatically. 

*Optional scripts:* * `npm run build` compiles the code to the `/dist` folder.
* `npm start` runs the compiled code (requires running the build script first).
* `npm test` runs the Vitest test suite.

## Usage

Once the CLI is running, you can type `help` at any time to see the available commands. Here is a quick breakdown of what you can do:

* **Move around:** Type `map` to load the next 20 location areas, or `mapb` to go back to the previous 20.
* **Look for Pokemon:** Use `explore <area_name>` to see a list of Pokemon that spawn in a specific location.
* **Catch 'em:** Use `catch <pokemon_name>` to try and catch a Pokemon. If it works, it gets saved to your collection.
* **Check your progress:** Type `pokedex` to see a list of everything you've caught. 
* **Check stats:** Use `inspect <pokemon_name>` to view the base stats, height, weight, and types of a Pokemon you own. 
* **Filter by type:** Use `type <type_name>` to look up different elemental types and see how they relate.
* **Quit:** Type `exit` to close the application.

## Under the Hood

To avoid spamming the PokeAPI with redundant network requests, the app uses a custom local cache. It temporarily stores location and Pokemon data in memory, which keeps the CLI feeling fast and responsive when you revisit areas or inspect Pokemon.
