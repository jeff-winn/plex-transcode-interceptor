export interface Config { 
    getTranscoderUrl(): string | undefined;
};

export class ConfigImpl implements Config {
    constructor(private environment: NodeJS.ProcessEnv) {
    }

    public getTranscoderUrl(): string | undefined {
        return this.environment.TRANSCODER_URL;
    }
}