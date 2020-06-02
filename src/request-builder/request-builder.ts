import { Request } from 'node-fetch';
import { ExecutionContext } from '../execution-context/execution-context';

/** Describes a builder used to create a transcode request. */
export interface RequestBuilder {
    /** Builds the request. */
    build(): Request;
};

export class RequestBuilderImpl implements RequestBuilder {
    constructor(private executionContext: ExecutionContext) {
    }

    public build(): Request {
        let url = this.getUrl();

        let request: Request = new Request(url, {
            method: 'post',
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'text/plain',
            },
            body: 'hello world!'
        });
        
        return request;
    }

    private getUrl(): string {
        let url = this.executionContext.getConfig().getTranscoderUrl();
        if (url != undefined) {
            return url;
        }
        
        throw 'The TRANSCODER_URL environment variable must be configured.';
    }
};