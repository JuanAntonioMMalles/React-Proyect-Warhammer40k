import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
    getPlanets,
    addPlanet,
    updatePlanet,
    deletePlanet,
    importPlanets
} from "../services/planetsService";



function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function exportJSON(planets) {
    const clean = planets.map(({ id, ...rest }) => rest);
    downloadFile(JSON.stringify(clean, null, 2), "data.json", "application/json");
}

function exportCSV(planets) {
    const headers = ["name", "sector", "category", "description", "image"];
    const rows = planets.map((p) =>
        headers.map((h) => `"${(p[h] || "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    downloadFile(csv, "data.csv", "text/csv");
}

function escapeXml(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function exportXML(planets) {
    const indent = "    ";
    const items = planets
        .map((p) =>
            `${indent}<planet>\n` +
            `${indent}${indent}<name>${escapeXml(p.name)}</name>\n` +
            `${indent}${indent}<sector>${escapeXml(p.sector)}</sector>\n` +
            `${indent}${indent}<category>${escapeXml(p.category)}</category>\n` +
            `${indent}${indent}<description>${escapeXml(p.description)}</description>\n` +
            `${indent}${indent}<image>${escapeXml(p.image)}</image>\n` +
            `${indent}</planet>`
        )
        .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<planets>\n${items}\n</planets>`;
    downloadFile(xml, "datos.xml", "application/xml");
}

function exportXLSX(planets) {
    const HEADERS = ["name", "sector", "category", "description", "image"];
    const rows = [HEADERS, ...planets.map((p) => HEADERS.map((h) => p[h] || ""))];
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet["!cols"] = [
        { wch: 20 }, { wch: 22 }, { wch: 12 }, { wch: 55 }, { wch: 40 }
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Planets");
    XLSX.writeFile(workbook, "datos.xlsx");
}

function parseXLSX(buffer) {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // Convert to array-of-objects using first row as header
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    return rows.map(sanitize);
}

const VALID_CATEGORIES = ["imperium", "xenos", "chaos", "dead"];

function sanitize(obj) {
    return {
        name: String(obj.name || "").trim(),
        sector: String(obj.sector || "").trim(),
        category: VALID_CATEGORIES.includes(obj.category) ? obj.category : "imperium",
        description: String(obj.description || "").trim(),
        image: String(obj.image || "").trim()
    };
}

function parseJSON(text) {
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : [data];
    return arr.map(sanitize);
}

function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1).map((line) => {
        const values = line.match(/("(?:[^"]|"")*"|[^,]*)/g).map((v) =>
            v.trim().replace(/^"|"$/g, "").replace(/""/g, '"')
        );
        const obj = {};
        headers.forEach((h, i) => (obj[h] = values[i] || ""));
        return sanitize(obj);
    });
}

function parseXML(text) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    return Array.from(xml.querySelectorAll("planet")).map((el) => {
        const get = (tag) => el.querySelector(tag)?.textContent || "";
        return sanitize({
            name: get("name"),
            sector: get("sector"),
            category: get("category"),
            description: get("description"),
            image: get("image")
        });
    });
}



export default function PlanetsCRUD() {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [importStatus, setImportStatus] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sector, setSector] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("imperium");

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [editingId, setEditingId] = useState(null);

    const formRef = useRef(null);
    const fileInputRef = useRef(null);

    const loadPlanets = async () => {
        try {
            const list = await getPlanets();
            setPlanets(list);
        } catch (error) {
            console.error("Error loading planets:", error);
        }
    };

    useEffect(() => { loadPlanets(); }, []);

    const resetForm = () => {
        setName(""); setDescription(""); setSector("");
        setImage(""); setCategory("imperium"); setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim() || !sector.trim()) {
            alert("Complete the required fields.");
            return;
        }
        const planetData = {
            name: name.trim(), description: description.trim(),
            sector: sector.trim(), image: image.trim(), category: category.trim()
        };
        try {
            if (editingId) {
                await updatePlanet(editingId, planetData);
            } else {
                await addPlanet(planetData);
            }
            resetForm();
            loadPlanets();
        } catch (error) {
            console.error("Error saving planet:", error);
        }
    };

    const handleEdit = (item) => {
        setName(item.name || ""); setDescription(item.description || "");
        setSector(item.sector || ""); setImage(item.image || "");
        setCategory(item.category || "imperium"); setEditingId(item.id);
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleDelete = async (id) => {
        try {
            await deletePlanet(id);
            if (editingId === id) resetForm();
            loadPlanets();
        } catch (error) {
            console.error("Error deleting planet:", error);
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImportStatus("Reading file…");
        setLoading(true);

        try {
            let parsed = [];

            if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
                // SheetJS needs an ArrayBuffer, not a text string
                const buffer = await file.arrayBuffer();
                parsed = parseXLSX(new Uint8Array(buffer));
            } else {
                const text = await file.text();
                if (file.name.endsWith(".json")) {
                    parsed = parseJSON(text);
                } else if (file.name.endsWith(".csv")) {
                    parsed = parseCSV(text);
                } else if (file.name.endsWith(".xml")) {
                    parsed = parseXML(text);
                } else {
                    throw new Error("Unsupported format. Use .json, .csv, .xml or .xlsx");
                }
            }

            if (parsed.length === 0) throw new Error("No valid planets found in file.");

            await importPlanets(parsed);
            setImportStatus(`✅ ${parsed.length} planet(s) imported successfully.`);
            loadPlanets();
        } catch (err) {
            console.error("Import error:", err);
            setImportStatus(`❌ Import failed: ${err.message}`);
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const filteredPlanets = planets.filter(
        (item) => selectedCategory === "all" || item.category === selectedCategory
    );

    return (
        <section id="planets-crud">
            <h2 className="main-title">Planets</h2>

            <div className="import-export-toolbar">
                <div className="import-group">
                    <span className="toolbar-label">Import:</span>
                    <label className="btn-import" title="Import planets from a file">
                        📂 Choose file (.json / .csv / .xml / .xlsx)
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json,.csv,.xml,.xlsx,.xls"
                            style={{ display: "none" }}
                            onChange={handleImport}
                            disabled={loading}
                        />
                    </label>
                    {importStatus && <span className="import-status">{importStatus}</span>}
                </div>

                <div className="export-group">
                    <span className="toolbar-label">Export ({planets.length} planets):</span>
                    <button className="btn-export" onClick={() => exportJSON(planets)} disabled={planets.length === 0}>⬇ JSON</button>
                    <button className="btn-export" onClick={() => exportCSV(planets)} disabled={planets.length === 0}>⬇ CSV</button>
                    <button className="btn-export" onClick={() => exportXML(planets)} disabled={planets.length === 0}>⬇ XML</button>
                    <button className="btn-export" onClick={() => exportXLSX(planets)} disabled={planets.length === 0}>⬇ XLSX</button>
                </div>
            </div>

            <div className="news-crud-container">
                <div className={`news-crud-box ${editingId ? "editing" : ""}`} ref={formRef}>
                    <h3 className="news-crud-subtitle">{editingId ? "Edit planet" : "Create planet"}</h3>

                    <form className="news-form" onSubmit={handleSubmit}>
                        <div className="news-form-row">
                            <div className="news-form-group">
                                <label htmlFor="planet-name">Planet name</label>
                                <input id="planet-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Cadia" />
                            </div>
                            <div className="news-form-group">
                                <label htmlFor="planet-sector">Sector</label>
                                <input id="planet-sector" type="text" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Cadian Sector" />
                            </div>
                        </div>

                        <div className="news-form-row">
                            <div className="news-form-group">
                                <label htmlFor="planet-category">Category</label>
                                <select id="planet-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="imperium">Imperium</option>
                                    <option value="xenos">Xenos</option>
                                    <option value="chaos">Chaos</option>
                                    <option value="dead">Dead world</option>
                                </select>
                            </div>
                            <div className="news-form-group">
                                <label htmlFor="planet-image">Image URL</label>
                                <input id="planet-image" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/img/planets/cadia.jpg" />
                            </div>
                        </div>

                        <div className="news-form-group">
                            <label htmlFor="planet-description">Description</label>
                            <textarea id="planet-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write information about the planet" />
                        </div>

                        <div className="news-form-actions">
                            <button type="submit" className="btn-news-primary">{editingId ? "Update" : "Create"}</button>
                            <button type="button" className="btn-news-secondary" onClick={resetForm}>Clear</button>
                        </div>
                    </form>
                </div>

                <div className="news-list-box">
                    <h3 className="news-crud-subtitle">Planets list</h3>

                    <div className="factions-filter">
                        {["all", "imperium", "xenos", "chaos", "dead"].map((cat) => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)}>
                                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {filteredPlanets.length === 0 ? (
                        <p className="news-empty">No planets found in this category.</p>
                    ) : (
                        <div className="news-list">
                            {filteredPlanets.map((item) => (
                                <article key={item.id} className="news-card">
                                    {item.image && <img src={item.image} alt={item.name} className="news-card-image" />}
                                    <div className="news-card-content">
                                        <div className="news-card-header">
                                            <h4 className="news-card-title">{item.name}</h4>
                                            <span className="news-card-category">{item.category}</span>
                                        </div>
                                        <p className="news-card-date">{item.sector}</p>
                                        <p className="news-card-text">{item.description}</p>
                                        <div className="news-card-actions">
                                            <button className="btn-news-secondary" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn-news-delete" onClick={() => handleDelete(item.id)}>Delete</button>
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
