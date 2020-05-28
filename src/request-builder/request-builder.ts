import { Request } from 'node-fetch';
import { Config } from '../config';

/** Describes a builder used to create a transcode request. */
export interface RequestBuilder {
    /** Builds the request. */
    build(): Request;
};

export class RequestBuilderImpl implements RequestBuilder {
    constructor(private config: Config, private args: string[]) {
    }

    public build(): Request {
        let url = this.getUrl();

        let request: Request = new Request(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/octet-stream',
            },
            body: JSON.stringify(this.args)
        });
        
        return request;
    }

    private getUrl(): string {
        let url = this.config.getTranscoderUrl();
        if (url != undefined) {
            return url;
        }
        
        throw 'The TRANSCODER_URL environment variable must be configured.';
    }
};