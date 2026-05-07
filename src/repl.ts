import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { getCommands } from './command_type.js';
import { CLICommand, State } from './state.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

const commands: Record<string, CLICommand> = getCommands();

export function startRepl(state: State) {
    rl.on("line", (input: string) => {
        const cleanFunctionOutput: string[] = cleanFunction(input);
        if (cleanFunctionOutput.length === 0) {
            rl.prompt();
            return;

        }
        if (commands[cleanFunctionOutput[0]] != null) {
            // commands[cleanFunctionOutput[0]].callback(commands);
            const extraParam = cleanFunctionOutput.slice(1);
            state.commands[cleanFunctionOutput[0]].callback(state, ...extraParam );
            // rl.prompt();
            state.createInterface.prompt();
        }


    }).prompt(true);

}


export function cleanFunction(word: string): string[] {
    const output = word.split(" ");
    let answer = [];
    for (var i in output) {
        if (output[i] != '') {
            answer.push(output[i]);
        }
    }
    return answer;
}