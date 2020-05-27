import { Request } from 'node-fetch';

export class RequestBuilder {
    constructor(private environment: NodeJS.ProcessEnv) {        
    }

    public build(): Request {
        let url = this.getUrl();

        let request: Request = new Request(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
        
        return request;
    }

    private getUrl(): string {
        if (this.environment.TRANSCODER_URL != undefined) {
            let result: string = this.environment.TRANSCODER_URL;
            console.log(result);

            return result;
        }
        
        throw 'The TRANSCODER_URL environment variable must be configured.';
    }
};