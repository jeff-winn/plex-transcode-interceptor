import { Program } from './program';
import { ExecutionContext, ExecutionContextImpl } from './execution-context/execution-context';

async function main(): Promise<void> {
    try {
        let context: ExecutionContext = createExecutionContext();

        let program: Program = new Program(context);            
        await program.run();
    }
    catch (error) {
        console.error(error);
    }
}

function createExecutionContext(): ExecutionContext {
    return new ExecutionContextImpl(
        process.stdout,
        process.env,
        process.argv.slice(2));
}

main();