import fetch, { Request, Response } from 'node-fetch';
import { RequestBuilder, RequestBuilderImpl } from './request-builder/request-builder';
import { ExecutionContext } from './execution-context';

/** Provides the program logic for the application. */
export class Program {   
    constructor(private context: ExecutionContext) {
    }

    /** Runs the application. */
    public async run(): Promise<void> {
        let builder: RequestBuilder = this.createRequestBuilder();
        let request = builder.build();

        let response = await this.getResponse(request);
        if (response.status != 200) {
            throw 'EHTTPSTATUS [' + response.status + ']: ' + response.statusText;
        }

        response.body.pipe(this.context.getOutputStream());
    }

    protected createRequestBuilder(): RequestBuilder {
        return new RequestBuilderImpl(
            this.context.getConfig(), 
            this.context.getArgs());
    }

    protected async getResponse(request: Request): Promise<Response> {
        return await fetch(request);  
    }
};