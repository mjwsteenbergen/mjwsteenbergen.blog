import { BlogPosts } from '../utils/laurentia'
import { Feed } from "feed";
const fs = require("fs").promises;

export default async function generateRssFeed() {
    const posts = (await BlogPosts.Get()).filter(i => i.isPublished).sort((i, j) => i.publishDate?.valueOf() ?? 0 - j.publishDate?.valueOf() ?? 0);
    const siteURL = "https://blog.nntn.nl/";
    const date = new Date();
    const author = {
        name: "Martijn Steenbergen ",
        link: "https://nntn.nl",
    };
    const feed = new Feed({
        title: "NNTN Blog",
        description: "",
        id: siteURL,
        link: siteURL,
        image: `${siteURL}/logo.svg`,
        favicon: `${siteURL}/favicon.png`,
        copyright: `All rights reserved ${date.getFullYear()}, Martijn Steenbergen`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteURL}/rss/feed.xml`,
            json: `${siteURL}/rss/feed.json`,
            atom: `${siteURL}/rss/atom.xml`,
        },
        author,
    });
    posts.forEach((post) => {
        const url = `${siteURL + post.slug}`;
        feed.addItem({
            title: post.name,
            id: url,
            link: url,
            description: post.shortDescription,
            content: post.shortDescription,
            author: [author],
            contributor: [author],
            date: new Date(post.publishDate),
        });
    });

    await fs.mkdir("./public/rss", { recursive: true });
    await fs.writeFile("./public/rss/feed.xml", feed.rss2());
    await fs.writeFile("./public/rss/atom.xml", feed.atom1());
    await fs.writeFile("./public/rss/feed.json", feed.json1());
};