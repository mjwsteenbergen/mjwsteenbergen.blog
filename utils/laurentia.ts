export interface Reply {
    reply: ActualReply;
    state: State;
}

export interface ActualReply {
    name:   string;
    result: Result[];
    text:   string;
}

export interface Result {
    name:      string;
    slug:      string;
    published: Date;
    html:      string;
    coverImage: string;
    shortDescription: string;
}

export interface State {
    state:      null;
    query:      null;
    id:         string;
    senderName: string;
}

// import * as exampleText from "./exampletext.json";

// Converts JSON strings to/from your types
export class Convert {
    public static toReply(json: string): Reply {
        return JSON.parse(json);
    }

    public static replyToJson(value: Reply): string {
        return JSON.stringify(value);
    }
}

export class BlogPosts {
    static result:Result[];

    static async Get():Promise<Result[]> {
        if(BlogPosts.result === undefined) 
        {
            var returnString = await (await fetch("https://zeus-laurentia.azurewebsites.net/api/run/blog2html?token=f75b831a-773c-4447-9c57-1827207e13ad")).text();
            // console.log(returnString);
            const value = Convert.toReply(returnString);

            // const value = <Reply>(<any>exampleText.default);

            BlogPosts.result = value.reply.result;
        }

        return BlogPosts.result;
    }
}