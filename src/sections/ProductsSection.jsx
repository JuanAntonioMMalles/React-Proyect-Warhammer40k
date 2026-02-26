import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext.jsx";
import { useNotification } from "../components/Notification.jsx";
import { useTranslation } from "react-i18next";

function getCategoryName(category, t) {
  return t(`products.categories.${category}`, { defaultValue: category });
}

export default function ProductsSection() {
  const { t } = useTranslation();
  const { products, remove } = useProducts();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const isEmpty = products.length === 0;

  const emptyState = useMemo(
    () => (
      <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#d4af37", fontFamily: "Arial, sans-serif" }}>
        <p style={{ fontSize: "1.2rem" }}>{t("products.emptyTitle")}</p>
        <p style={{ fontSize: "0.9rem", color: "#dee2e6" }}>{t("products.emptySubtitle")}</p>
      </div>
    ),
    [t]
  );

  function onEdit(id) {
    navigate(`/products?id=${id}`);
  }

  function onDelete(id, name) {
    const ok = window.confirm(t("products.confirmDelete", { name }));
    if (!ok) return;

    const removed = remove(id);
    if (removed) notify(t("products.deletedOk"), "success");
    else notify(t("products.deletedError"), "error");
  }

  return (
    <section id="products">
      <h2 className="main-title">{t("products.title")}</h2>

      <div className="products-actions">
        <Link to="/products" className="btn-primary">
          <i className="fa-solid fa-plus"></i> {t("products.add")}
        </Link>
      </div>

      <div id="products-list" className="products-grid">
        {isEmpty
          ? emptyState
          : products.map((p) => (
            <div className="product-card" data-id={p.id} key={p.id}>
              <div className="product-header">
                <div>
                  <h3 className="product-name">{p.name}</h3>
                  <span className="product-category">{getCategoryName(p.category, t)}</span>
                </div>
              </div>

              <p className="product-description">{p.description}</p>

              <div className="product-footer">
                <div>
                  <div className="product-price">{p.price.toFixed(2)} €</div>
                  <div className="product-stock">{t("products.stock", { count: p.stock })}</div>
                </div>
              </div>

              <div className="product-actions">
                <button className="btn-edit" type="button" onClick={() => onEdit(p.id)}>
                  <i className="fa-solid fa-edit"></i> {t("products.edit")}
                </button>
                <button className="btn-delete" type="button" onClick={() => onDelete(p.id, p.name)}>
                  <i className="fa-solid fa-trash"></i> {t("products.delete")}
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}