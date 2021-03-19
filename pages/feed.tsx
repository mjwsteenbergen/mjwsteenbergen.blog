import { BlogPost, BlogPosts } from '../utils/laurentia'
import React from 'react'
import { NextPageContext } from "next";

export default class RssPage extends React.Component {
    static async getInitialProps({ res }: NextPageContext) {
        if (!res) {
            return;
        }

        const items = (await BlogPosts.Get()).filter(i => i.isPublished).sort((i, j) => i.publishDate.valueOf() - j.publishDate.valueOf());

        res.setHeader("Content-Type", "text/xml");
        res.write(this.getFeed(items));
        res.end();
    }
    
    static getFeed(items: BlogPost[]): string {
        return `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
    <title>NNTN Blog</title>
    <updated>2021-03-19T15:05:33-04:00</updated>
    <id>https://blog.nntn.nl/feed/</id>
    <link type="text/html" href="https://blog.nntn.nl/" rel="alternate"/>
    ${items.map(i => this.getEntry(i))}
</feed>`
    }

    static getEntry(i: BlogPost): any {
        return `    <entry>
        <published>${i.publishDate}</published>
        <updated>${i.publishDate}</updated>
        <title>${i.name}</title>
        <link rel="alternate" type="text/html" href="${"https://blog.nntn.nl/" + i.slug}"/>
        <id>${"https://blog.nntn.nl/" + i.slug}</id>
        <author>
            <name>Martijn Steenbergen</name>
        </author>
    </entry>`
    }
}
