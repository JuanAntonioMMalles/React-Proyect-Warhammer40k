import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

export default function PlanetsCRUD() {
    const [planets, setPlanets] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sector, setSector] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("imperium");

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [editingId, setEditingId] = useState(null);

    const formRef = useRef(null);

    const planetsCollection = collection(db, "planets");

    const loadPlanets = async () => {
        try {
            const data = await getDocs(planetsCollection);
            const planetsList = data.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            setPlanets(planetsList);
        } catch (error) {
            console.error("Error loading planets:", error);
        }
    };

    useEffect(() => {
        loadPlanets();
    }, []);

    const resetForm = () => {
        setName("");
        setDescription("");
        setSector("");
        setImage("");
        setCategory("imperium");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim() || !sector.trim() || !category.trim()) {
            alert("Complete the required fields.");
            return;
        }

        const planetData = {
            name: name.trim(),
            description: description.trim(),
            sector: sector.trim(),
            image: image.trim(),
            category: category.trim()
        };

        try {
            if (editingId) {
                await updateDoc(doc(db, "planets", editingId), planetData);
            } else {
                await addDoc(planetsCollection, planetData);
            }

            resetForm();
            loadPlanets();
        } catch (error) {
            console.error("Error saving planet:", error);
        }
    };

    const handleEdit = (item) => {
        setName(item.name || "");
        setDescription(item.description || "");
        setSector(item.sector || "");
        setImage(item.image || "");
        setCategory(item.category || "imperium");
        setEditingId(item.id);

        formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "planets", id));
            if (editingId === id) {
                resetForm();
            }
            loadPlanets();
        } catch (error) {
            console.error("Error deleting planet:", error);
        }
    };

    const filteredPlanets = planets.filter((item) => {
        if (selectedCategory === "all") return true;
        return item.category === selectedCategory;
    });

    return (
        <section id="planets-crud">
            <h2 className="main-title">Planets</h2>

            <div className="news-crud-container">
                <div
                    className={`news-crud-box ${editingId ? "editing" : ""}`}
                    ref={formRef}
                >
                    <h3 className="news-crud-subtitle">
                        {editingId ? "Edit planet" : "Create planet"}
                    </h3>

                    <form className="news-form" onSubmit={handleSubmit}>
                        <div className="news-form-row">
                            <div className="news-form-group">
                                <label htmlFor="planet-name">Planet name</label>
                                <input
                                    id="planet-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Cadia"
                                />
                            </div>

                            <div className="news-form-group">
                                <label htmlFor="planet-sector">Sector</label>
                                <input
                                    id="planet-sector"
                                    type="text"
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                    placeholder="Cadian Sector"
                                />
                            </div>
                        </div>

                        <div className="news-form-row">
                            <div className="news-form-group">
                                <label htmlFor="planet-category">Category</label>
                                <select
                                    id="planet-category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="imperium">Imperium</option>
                                    <option value="xenos">Xenos</option>
                                    <option value="chaos">Chaos</option>
                                    <option value="dead">Dead world</option>
                                </select>
                            </div>

                            <div className="news-form-group">
                                <label htmlFor="planet-image">Image URL</label>
                                <input
                                    id="planet-image"
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="/img/planets/cadia.jpg"
                                />
                            </div>
                        </div>

                        <div className="news-form-group">
                            <label htmlFor="planet-description">Description</label>
                            <textarea
                                id="planet-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write information about the planet"
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
                    <h3 className="news-crud-subtitle">Planets list</h3>

                    <div className="factions-filter">
                        <button onClick={() => setSelectedCategory("all")}>All</button>
                        <button onClick={() => setSelectedCategory("imperium")}>Imperium</button>
                        <button onClick={() => setSelectedCategory("xenos")}>Xenos</button>
                        <button onClick={() => setSelectedCategory("chaos")}>Chaos</button>
                        <button onClick={() => setSelectedCategory("dead")}>Dead world</button>
                    </div>

                    {filteredPlanets.length === 0 ? (
                        <p className="news-empty">No planets found in this category.</p>
                    ) : (
                        <div className="news-list">
                            {filteredPlanets.map((item) => (
                                <article key={item.id} className="news-card">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="news-card-image"
                                        />
                                    )}

                                    <div className="news-card-content">
                                        <div className="news-card-header">
                                            <h4 className="news-card-title">{item.name}</h4>
                                            <span className="news-card-category">
                                                {item.category}
                                            </span>
                                        </div>

                                        <p className="news-card-date">{item.sector}</p>
                                        <p className="news-card-text">{item.description}</p>

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