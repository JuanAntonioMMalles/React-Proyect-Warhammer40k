# Warhammer 40k Fan Page (React)

## Project Description

This project is a single-page application (SPA) developed with React and Vite, dedicated to Warhammer 40,000 enthusiasts. The application features information about factions, an image gallery, a products section, and a contact form. It uses Firebase for the backend and i18next for internationalization, offering a dynamic and localized user experience.

## Technologies Used

The project has been built using the following key technologies:

*   **React**: A JavaScript library for building interactive user interfaces.
*   **Vite**: A next-generation web development bundler, offering fast startup and Hot Module Replacement (HMR).
*   **Firebase**: A Google application development platform that provides backend services such as authentication, databases, and hosting.
*   **i18next**: An internationalization (i18n) framework for JavaScript, used to manage and switch the user interface language.
*   **React Router DOM**: A library for declarative routing in React applications.

## Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <REPOSITORY_URL>
    cd React-Proyect-Warhammer40k
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

### Development Mode

To start the application in development mode with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or a similar port).

### Production Mode

To build the application for production:

```bash
npm run build
```

This will generate optimized static files in the `dist/` directory. You can preview the production version with:

```bash
npm run preview
```

## Project Structure

The main project structure is as follows:

```
React-Proyect-Warhammer40k/
├── public/
│   └── img/             # Static images for the project
├── src/
│   ├── components/      # Reusable React components
│   ├── contexts/        # React contexts for global state management
│   ├── data/            # Static data or mocks
│   ├── firebase/        # Firebase configuration and utilities
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Main application pages
│   ├── sections/        # Specific sections of the pages
│   ├── App.jsx          # Main application component
│   ├── i18n.js          # i18next configuration
│   ├── main.jsx         # Application entry point
│   └── style.css        # Global styles
├── dist/                # Build files for production
├── firebase.json        # Firebase Hosting configuration
├── index.html           # Main HTML file
├── package.json         # Project metadata and dependencies
├── README.md            # This file
└── vite.config.js       # Vite configuration
```

## Application Routes

The application defines the following routes:

*   `/`: Landing page including factions, gallery, products, and contact sections.
*   `/products`: Form for creating new products.
*   `/products?id=<ID>`: Form for editing an existing product, where `<ID>` is the product identifier.

## Firebase Configuration

The `firebase.json` file configures the application's hosting on Firebase. The application is served from the `dist/` directory, and all routes are rewritten to `index.html` to enable client-side routing (SPA).

## Internationalization (i18next)

The project uses `i18next` to support multiple languages. Translation files are located in `dist/locales/` (or `public/locales/` if configured to be served directly). The `i18n.js` file in `src/` contains the i18next configuration.

## Contribution

Contributions are welcome. Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Make your changes and commit (`git commit -am 'feat: Add new feature'`).
4.  Push your changes to the branch (`git push origin feature/new-feature`).
5.  Open a Pull Request.

## Feed reader

<img src="./public/img/prove1.png" alt="Feed reader">
<img src="./public/img/prove2.png" alt="Feed reader">

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

**Author:** Juan Antonio
**Date:** March 15, 2026
