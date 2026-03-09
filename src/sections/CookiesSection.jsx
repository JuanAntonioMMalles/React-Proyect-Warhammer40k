import React from 'react';
import { useTranslation } from "react-i18next";

export default function CookiesPage() {
    const { t } = useTranslation();

    return (
        <main className="legal-page">
            <h1>{t("legalPages.cookies.title")}</h1>
            <p>{t("legalPages.cookies.p1")}</p>
            <p>{t("legalPages.cookies.p2")}</p>
            <p>{t("legalPages.cookies.p3")}</p>
        </main>
    );
}