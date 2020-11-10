export interface Reply {
    reply: ActualReply;
    state: State;
}

export interface ActualReply {
    name:   string;
    result: BlogPost[];
    text:   string;
}

export interface BlogPost {
    name:      string;
    slug:      string;
    isPublished: boolean;
    publishDate: Date;
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
    static result:BlogPost[];

    static async Get():Promise<BlogPost[]> {
        if(BlogPosts.result === undefined) 
        {
            // let base = "http://localhost:7071";
            let base = "https://zeus-laurentia.azurewebsites.net";

            var returnString = await (await fetch(base + "/api/run/blog2html?token=f75b831a-773c-4447-9c57-1827207e13ad")).text();
            // console.log(returnString);
            const value = Convert.toReply(returnString);

            // const value = <Reply>(<any>exampleText.default);

            BlogPosts.result = value.reply.result;
        }

        return BlogPosts.result;
    }
}