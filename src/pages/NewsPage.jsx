import React, { useEffect, useState } from "react";

export default function NewsPage() {
    const [rssItems, setRssItems] = useState([]);

    useEffect(() => {
        fetch("/rss/rss.xml")
            .then((res) => res.text())
            .then((xmlString) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(xmlString, "text/xml");

                const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
                    title: item.querySelector("title")?.textContent || "",
                    description: item.querySelector("description")?.textContent || "",
                    link: item.querySelector("link")?.textContent || "",
                    date: item.querySelector("pubDate")?.textContent || "",
                    category: item.querySelector("category")?.textContent || ""
                }));

                setRssItems(items);
            })
            .catch((error) => console.error("Error loading RSS:", error));
    }, []);

    return (
        <main className="news-page">
            <section id="news-page-section">
                <h1 className="main-title">News</h1>

                <div className="news-page-topbar">
                    <a
                        href="/rss/rss.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rss-feed-button"
                    >
                        Feed RSS
                    </a>
                </div>

                <div className="news-page-list">
                    {rssItems.map((item, index) => (
                        <article key={index} className="news-page-card">
                            <h2 className="news-page-card-title">{item.title}</h2>

                            <p className="news-page-card-meta">
                                <span>{item.date}</span>
                                <span>{item.category}</span>
                            </p>

                            <div
                                className="news-page-card-description"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />

                            <a href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-page-card-link"
                            >
                                Read more
                            </a>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}