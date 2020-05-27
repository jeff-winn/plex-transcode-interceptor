import { Request } from 'node-fetch';

export class RequestBuilder {
    constructor(private process: NodeJS.Process) {
    }

    public build(): Request {
        let url = this.getUrl();

        let request: Request = new Request(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/octet-stream',
            },
            body: JSON.stringify(process.argv)
        });
        
        return request;
    }

    private getUrl(): string {
        if (this.process.env.TRANSCODER_URL != undefined) {
            let result: string = this.process.env.TRANSCODER_URL;
            return result;
        }
        
        throw 'The TRANSCODER_URL environment variable must be configured.';
    }
};