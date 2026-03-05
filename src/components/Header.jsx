import React, { useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useClickOutside } from "../hooks/useClickOutside.js";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();

  useClickOutside(containerRef, () => setOpen(false), open);

  const isHome = location.pathname === "/home";

  const navItems = useMemo(() => {
    if (isHome) {
      return [
        { to: "/factions", label: t("nav.factions"), icon: "fa-users" },
        { to: "/products", label: t("nav.products"), icon: "fa-box" },
        { to: "/home#contact", label: t("nav.contact"), icon: "fa-envelope" }
      ];
    }

    return [
      { to: "/home", label: t("nav.home"), icon: "fa-home" },
      { to: "/factions", label: t("nav.factions"), icon: "fa-users" },
      { to: "/home#gallery", label: t("nav.gallery"), icon: "fa-images" },
      { to: "/products", label: t("nav.products"), icon: "fa-box" },
      { to: "/home#contact", label: t("nav.contact"), icon: "fa-envelope" }
    ];
  }, [isHome, t]);

  function onChangeLang(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <header id="header" ref={containerRef}>
      <div id="header-image">
        <img
          src="/img/aquila-imperialis.png"
          alt={t("header.logoAlt")}
          style={{ paddingTop: "45px" }}
        />
      </div>

      <div id="header-title">{t("app.title")}</div>

      <div className="lang-switcher">
        <label htmlFor="lang">{t("header.language")}:</label>
        <select id="lang" value={i18n.language} onChange={onChangeLang}>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>

      <button
        id="menu-hamburguer"
        type="button"
        aria-label={t("header.openMenu")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ≡
      </button>

      <div id="header-buttons" className={open ? "active" : ""}>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li className="header-icon" key={item.to + item.label}>
                <NavLink to={item.to} onClick={() => setOpen(false)}>
                  {item.label} <i className={`fa-solid ${item.icon}`}></i>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}