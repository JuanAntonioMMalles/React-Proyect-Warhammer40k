import React from "react";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
    const { t } = useTranslation();

    return (
        <main className="legal-page">
            <h1>{t("legalPages.terms.title")}</h1>
            <p>{t("legalPages.terms.p1")}</p>
            <p>{t("legalPages.terms.p2")}</p>
            <p>{t("legalPages.terms.p3")}</p>
        </main>
    );
}