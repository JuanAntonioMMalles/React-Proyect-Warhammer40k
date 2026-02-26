# React Warhammer 40K Project

A React-based web application inspired by the Warhammer 40,000 universe.
This version is a full migration from static HTML to a modern React architecture using Vite, React Router, Context API, and internationalization.

---

# Tech Stack

* **React 18**
* **Vite**
* **React Router DOM**
* **Context API**
* **i18next**
* **react-i18next**
* **i18next-browser-languagedetector**
* **i18next-http-backend**
* **LocalStorage API**
* **CSS3**

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/JuanAntonioMMalles/OfficialProyect.git
cd React-Proyect-Warhammer40k
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run development server

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

# Project Structure

```
React-Proyect-Warhammer40k/
│
├── public/
│   ├── img/                  # All project images
│   └── locales/              # Translations
│       ├── en/translation.json
│       └── es/translation.json
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── style.css
│   ├── i18n.js               # i18next configuration
│
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Notification.jsx
│   │   └── ScrollToHash.jsx
│
│   ├── sections/
│   │   ├── FactionsSection.jsx
│   │   ├── GallerySection.jsx
│   │   ├── ProductsSection.jsx
│   │   └── ContactSection.jsx
│
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductFormPage.jsx
│   │   └── NotFoundPage.jsx
│
│   ├── contexts/
│   │   └── ProductsContext.jsx
│
│   ├── hooks/
│   │   ├── useClickOutside.js
│   │   └── useLocalStorage.js
│
│   └── data/
│       ├── factions.json
│       └── gallery.json
│
└── package.json
```

---

# Core Features

## 1. Multi-language Support (EN / ES)

Implemented using:

* i18next
* react-i18next
* Browser language detection
* Translation files in `/public/locales`

Language switching is dynamic and automatic based on browser settings.

---

## 2. Routing (React Router)

Pages:

* `/` → HomePage
* `/products/new` → ProductFormPage
* `*` → NotFoundPage

Routing handled in `App.jsx`.

---

## 3. State Management (Context API)

`ProductsContext.jsx` provides:

* Product list
* Add product
* Edit product
* Delete product
* Persistent storage via LocalStorage

Custom hook `useLocalStorage.js` ensures data persistence between sessions.

---

## 4. Dynamic Sections

### FactionsSection

* Data loaded from `factions.json`
* Dynamically rendered cards
* Fully translatable content

### GallerySection

* Data-driven gallery using `gallery.json`
* Image overlays

### ProductsSection

* Displays stored products
* CRUD operations via context

### ContactSection

* Contact form
* Validation
* Notification component integration

---

## 5. Custom Hooks

### useLocalStorage

Abstracts LocalStorage logic for clean state persistence.

### useClickOutside

Detects clicks outside elements (used for UI interactions such as menus or dropdowns).

---

## 6. Reusable Components

* Header (navigation + language toggle)
* Footer
* Layout wrapper
* Notification system
* ScrollToHash (anchor navigation behavior)

---

# Internationalization Configuration

Located in:

```
src/i18n.js
```

Features:

* Language detection
* HTTP backend loading
* JSON-based translations
* Namespace support

---

# Available Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
```

---

# Data Structure (Products)

Example product object:

```javascript
{
  id: string,
  name: string,
  category: string,
  price: number,
  description: string,
  stock: number
}
```

Stored in LocalStorage via custom hook.

---

# Architecture Highlights

* Fully component-based design
* Separation of pages, sections, components
* Centralized state with Context API
* Modular translation system
* Scalable folder structure
* Data-driven rendering via JSON files
* Clean hook abstraction

---

# Current Version

**v3.1.0 – React Architecture + Internationalization + Routing**

### Improvements over previous version

* Migrated from static HTML to React
* Added multilingual system
* Introduced routing
* Implemented Context API
* Improved scalability
* Modularized sections
* Enhanced maintainability

---

# Future Improvements

* Backend integration (Node/Express)
* Authentication system
* Role-based access
* Product search and filtering
* Admin dashboard
* Form validation library integration
* Unit testing (Vitest / React Testing Library)
* Deployment configuration (Vercel / Netlify)

---

