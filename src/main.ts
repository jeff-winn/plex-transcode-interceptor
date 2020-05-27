import fetch from 'node-fetch';
import { RequestBuilder } from './request-builder/request-builder';

async function main(): Promise<void> {
    try {
        let builder: RequestBuilder = new RequestBuilder(process.env);
        let request = builder.build();

        let response = await fetch(request);
        response.body.pipe(process.stdout);
    }
    catch (error) {
        console.log(error);
    }
}

main();