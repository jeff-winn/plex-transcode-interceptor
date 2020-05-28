import { Config, ConfigImpl } from "./config";

export interface ExecutionContext { 
    getConfig(): Config;
    getOutputStream(): NodeJS.WritableStream;
    getArgs(): string[];
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