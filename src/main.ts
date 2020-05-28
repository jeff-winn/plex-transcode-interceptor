import { Program } from './program';
import { ExecutionContext, ExecutionContextImpl } from './execution-context';

async function main(): Promise<void> {
    try {
        let context = createExecutionContext();

        let program = new Program(context);            
        await program.run();
    }
    catch (error) {
        console.log(error);
    }
}

function createExecutionContext(): ExecutionContext {
    return new ExecutionContextImpl(
        process.stdout,
        process.env,
        process.argv);
}

main();