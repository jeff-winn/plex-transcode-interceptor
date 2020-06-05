import { Request } from 'node-fetch';
import { ExecutionContext } from '../execution-context/execution-context';
import { SessionIdParser } from './session-id-parser';

/** Describes a builder used to create a transcode request. */
export interface RequestBuilder {
    /** Builds the request. */
    build(): Request;
};

export class RequestBuilderImpl implements RequestBuilder {
    constructor(private executionContext: ExecutionContext, private parser: SessionIdParser) {
    }

    public build(): Request {
        let url = this.getUrl();
        let idParts = this.getSessionIdParts();
        
        let request: Request = new Request(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Plex-Session-ID': idParts[0],
                'X-Request-ID': idParts[1],
                'Accept': 'text/plain',
            },
            body: JSON.stringify({ 
                cmdLineArgs: this.getCmdLineArgs()
            })
        });
        
        return request;
    }

    private getSessionIdParts(): string[] {
        let sessionId = this.parser.parse(this.executionContext);
        if (sessionId === undefined) {
            throw 'The Plex session id could not be determined';
        }

        return sessionId.split('/', 2);
    }

    private getCmdLineArgs(): string[] {
        return this.executionContext.getArgs();
    }

    private getUrl(): string {
        let url = this.executionContext.getConfig().getTranscoderUrl();
        if (url != undefined) {
            return url;
        }
        
        throw 'The TRANSCODER_URL environment variable must be configured.';
    }
};