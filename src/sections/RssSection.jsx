import React, { useEffect, useState } from "react";

export default function RssSection() {

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
            .catch((err) => console.error("RSS load error:", err));

    }, []);

    return (

        <section id="rss-section">

            <h2 className="main-title">RSS News</h2>

            <div className="rss-list">

                {rssItems.map((item, index) => (

                    <article key={index} className="rss-card">

                        <h3 className="rss-title">{item.title}</h3>

                        <p className="rss-date">{item.date}</p>

                        <p className="rss-category">{item.category}</p>

                        <p className="rss-description">{item.description}</p>

                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rss-link"
                        >
                            Read more
                        </a>

                    </article>

                ))}

            </div>

        </section>

    );

}