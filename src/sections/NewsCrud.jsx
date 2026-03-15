import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { db } from "../firebase/firebase";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

export default function NewsCRUD() {
    const [news, setNews] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("videogame");
    const formRef = useRef(null);
    const dateRef = useRef(null);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [editingId, setEditingId] = useState(null);

    const newsCollection = collection(db, "news");

    const loadNews = async () => {
        try {
            const data = await getDocs(newsCollection);
            const newsList = data.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            setNews(newsList);
        } catch (error) {
            console.error("Error loading news:", error);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const resetForm = () => {
        setTitle("");
        setContent("");
        setDate("");
        setImage("");
        setCategory("videogame");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim() || !date.trim() || !category.trim()) {
            alert("Complete the required fields.");
            return;
        }

        const newsData = {
            title: title.trim(),
            content: content.trim(),
            date: new Date().toISOString(),
            image: image.trim(),
            category: category.trim()
        };

        try {
            if (editingId) {
                await updateDoc(doc(db, "news", editingId), newsData);
            } else {
                await addDoc(newsCollection, newsData);
            }

            resetForm();
            loadNews();
        } catch (error) {
            console.error("Error saving news:", error);
        }
    };

    const handleEdit = (item) => {

        setTitle(item.title || "");
        setContent(item.content || "");
        setDate(item.date || "");
        setImage(item.image || "");
        setCategory(item.category || "videogame");
        setEditingId(item.id);

        formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "news", id));
            if (editingId === id) {
                resetForm();
            }
            loadNews();
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    const filteredNews = news.filter((item) => {
        if (selectedCategory === "all") return true;
        return item.category === selectedCategory;
    });

    return (
        <section id="news-crud">
            <h2 className="main-title">News</h2>

            <div className="news-crud-container">
                <div className="news-crud-box" ref={formRef}>                    <h3 className="news-crud-subtitle">
                    {editingId ? "Edit news" : "Create news"}
                </h3>

                    <form className="news-form" onSubmit={handleSubmit}>
                        <div className="news-form-row">
                            <div className="news-form-group">
                                <label htmlFor="news-title">Title</label>
                                <input
                                    id="news-title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                />
                            </div>

                            <div className="news-form-group">
                                <label htmlFor="news-date">Date</label>
                                <input
                                    id="news-date"
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="2026 or 2026-03-15"
                                />
                            </div>
                        </div>

                        <div className="news-form-row">
                            <div className="news-form-group">
                                <label htmlFor="news-category">Category</label>
                                <select
                                    id="news-category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="videogame">Videogame</option>
                                    <option value="update">Update</option>
                                    <option value="event">Event</option>
                                    <option value="dlc">DLC</option>
                                    <option value="community">Community</option>
                                </select>
                            </div>

                            <div className="news-form-group">
                                <label htmlFor="news-image">Image URL</label>
                                <input
                                    id="news-image"
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="/img/example.jpg or https://..."
                                />
                            </div>
                        </div>

                        <div className="news-form-group">
                            <label htmlFor="news-content">Content</label>
                            <textarea
                                id="news-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write the news content"
                            />
                        </div>

                        <div className="news-form-actions">
                            <button type="submit" className="btn-news-primary">
                                {editingId ? "Update" : "Create"}
                            </button>

                            <button
                                type="button"
                                className="btn-news-secondary"
                                onClick={resetForm}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                <div className="news-list-box">
                    <h3 className="news-crud-subtitle">News list</h3>

                    <div className="factions-filter">
                        <button onClick={() => setSelectedCategory("all")}>All</button>
                        <button onClick={() => setSelectedCategory("videogame")}>
                            Videogame
                        </button>
                        <button onClick={() => setSelectedCategory("update")}>
                            Update
                        </button>
                        <button onClick={() => setSelectedCategory("event")}>Event</button>
                        <button onClick={() => setSelectedCategory("dlc")}>DLC</button>
                        <button onClick={() => setSelectedCategory("community")}>
                            Community
                        </button>
                    </div>

                    {filteredNews.length === 0 ? (
                        <p className="news-empty">No news found in this category.</p>
                    ) : (
                        <div className="news-list">
                            {filteredNews.map((item) => (
                                <article key={item.id} className="news-card">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="news-card-image"
                                        />
                                    )}

                                    <div className="news-card-content">
                                        <div className="news-card-header">
                                            <h4 className="news-card-title">{item.title}</h4>
                                            <span className="news-card-category">
                                                {item.category}
                                            </span>
                                        </div>

                                        <p className="news-card-date">{item.date}</p>
                                        <p className="news-card-text">{item.content}</p>

                                        <div className="news-card-actions">
                                            <button
                                                className="btn-news-secondary"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn-news-delete"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}