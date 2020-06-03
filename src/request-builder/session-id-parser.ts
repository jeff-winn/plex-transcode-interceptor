import { ExecutionContext } from "../execution-context/execution-context";

/** Describes a mechanism which can parse the Plex Session Id from the command line arguments. */
export interface SessionIdParser {
    parse(executionContext: ExecutionContext): string | undefined;
};

export class SessionIdParserImpl implements SessionIdParser {
    private regex: RegExp = /^http\:\/\/127.0.0.1:32400\/video\/:\/transcode\/session\/(.*)\/progress$/;

    public parse(executionContext: ExecutionContext): string | undefined {
        let sessions = executionContext.getArgs().filter(e => (this.regex.test(e))).map(e => {
            let matches = e.match(this.regex);
            if (matches !== null && matches.length == 2) {
                return matches[1];
            }

            return undefined;
        });

        if (sessions !== undefined && sessions.length == 1) {
            return sessions[0];
        }

        return undefined;
    }
};