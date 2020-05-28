import { Config, ConfigImpl } from "./config";

/** Describes the application execution context. */
export interface ExecutionContext { 
    /** Gets the configuration settings for the application. */
    getConfig(): Config;

    /** Gets the output stream */
    getOutputStream(): NodeJS.WritableStream;

    /** Gets the command-line arguments used to execute the application. */
    getArgs(): string[];

    /** Gets the process environment. */
    getEnvironment(): NodeJS.ProcessEnv;
}

export class ExecutionContextImpl implements ExecutionContext {
    private readonly config: Config;

    constructor(private outputStream: NodeJS.WritableStream, private environment: NodeJS.ProcessEnv, private args: string[]) {
        this.config = new ConfigImpl(this.environment);
    }

    public getConfig(): Config {
        return this.config;
    }

    public getOutputStream(): NodeJS.WritableStream {
        return this.outputStream;
    }

    public getArgs(): string[] {
        return this.args;
    }

    public getEnvironment(): NodeJS.ProcessEnv {
        return this.environment;
    }
};