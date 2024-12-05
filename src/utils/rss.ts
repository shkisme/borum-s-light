import fs from "fs";
import RSS from "rss";
import {TPost} from "../types";

export default async function generateRssFeed(allPosts: TPost[]) {
    const site_url =
        process.env.NODE_ENV === "production"
            ? "https://shkisme.vercel.app"
            : "http://localhost:3000";

    const feedOptions = {
        title: "Blog posts | RSS Feed",
        description: "Welcome to this blog posts!",
        site_url: site_url,
        feed_url: `${site_url}/rss.xml`,
        image_url: `${site_url}/logo.jpeg`,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}`,
    };

    const feed = new RSS(feedOptions);

    // Add each individual post to the feed.
    allPosts.map((post) => {
        const isPinned = post.tags?.includes("5::🛠️ 기타::Pinned") || false;
        const description = `
        <div>
            <div class="content">${post.summary}</div>
            <div class="isPinned">${isPinned}</div>
        </div>
    `;

        feed.item({
            title: post.title,
            description: description,
            url: `${site_url}/${post.slug}`,
            date: post.date.start_date,
        });
    });

    // Write the RSS feed to a file as XML.
    fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}