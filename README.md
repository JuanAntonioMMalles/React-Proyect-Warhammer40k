React Project – Warhammer 40K

Website created as a project for the Markup Language (LND) subject.
This version has been migrated to a React + Vite architecture, improving modularity, scalability, and maintainability.

The theme is based on the Warhammer 40,000 universe.

Getting Started

These instructions will help you run the project locally for development and testing.

Prerequisites

You must have:

Node.js (v18 or higher recommended)

npm (comes with Node.js)

A code editor (VS Code recommended)

Check versions:

node -v
npm -v
Installation

Clone the repository:

git clone https://github.com/JuanAntonioMMalles/OfficialProyect.git

Navigate into the project folder:

cd React-Proyect-Warhammer40k

Install dependencies:

npm install

Run the development server:

npm run dev

Open in your browser:

http://localhost:5173
Project Structure
React-Proyect-Warhammer40k/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FactionCard.jsx
│   │   ├── Gallery.jsx
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Products.jsx
│   │
│   ├── data/
│   │   └── factions.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
Features
Home Page

Responsive layout (desktop, tablet, mobile)

10 Warhammer 40K factions displayed dynamically

Faction cards rendered using reusable React components

Epic battles gallery section

Smooth navigation

Thematic design (Imperium red and gold palette)

Product Management Page

Create products

Edit products

Delete products

Product category selection

Form validation

LocalStorage persistence

Dynamic rendering using React state

Technologies Used

React 18

Vite

JavaScript (ES6+)

CSS3

LocalStorage API

Font Awesome

Google Fonts

React Architecture

Functional components

Props-based data flow

useState for state management

useEffect for lifecycle logic

Component reusability

Data-driven rendering (arrays mapped to components)

Example pattern:

{factions.map((faction) => (
  <FactionCard key={faction.id} faction={faction} />
))}
Responsive Design

Breakpoints implemented with CSS:

Desktop: > 1024px

Tablet: 768px – 1024px

Mobile: < 768px

Layout uses:

CSS Grid

Flexbox

Media queries

Data Persistence

Products are stored in LocalStorage:

{
  id: string,
  name: string,
  category: string,
  price: number,
  description: string,
  stock: number
}
Available Scripts
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
Current Version

v3.0.0 – React Migration

Changelog

Migrated from static HTML/CSS/JS to React + Vite

Converted sections into reusable components

Implemented state-based product management

Improved project structure

Enhanced scalability and maintainability

Optimized responsive layout

Authors

Juan Antonio
GitHub: https://github.com/JuanAntonioMMalles

License

This project is an unofficial fan page and is not affiliated with Games Workshop Ltd.
Warhammer 40,000 and all related trademarks belong to Games Workshop Ltd.

MIT License.

Future Improvements

Multi-language support (EN / ES)

Routing with React Router

Backend integration (Node/Express)

Authentication system

Advanced filtering and search

Dark/Light theme toggle

Image upload for products

Deployment configuration