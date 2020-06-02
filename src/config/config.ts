/** Describes the application configuration settings. */
export interface Config { 
    /** Gets the transcoder url. */
    getTranscoderUrl(): string | undefined;

    /** Gets a value identifying whether the instance is running in a production configuration. */
    isProduction(): boolean;
};

export class ConfigImpl implements Config {
    constructor(private environment: NodeJS.ProcessEnv) {
    }

    public getTranscoderUrl(): string | undefined {
        if (!this.isProduction()) {
            return "http://localhost:34800/api/transcode";            
        }

        return this.environment.TRANSCODER_URL;
    }

    public isProduction(): boolean {
        return false;
    }
}