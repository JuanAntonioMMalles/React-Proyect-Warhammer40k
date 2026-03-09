import React from "react";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
    const { t } = useTranslation();

    return (
        <main className="legal-page">
            <h1>{t("legalPages.privacy.title")}</h1>
            <p>{t("legalPages.privacy.p1")}</p>
            <p>{t("legalPages.privacy.p2")}</p>
            <p>{t("legalPages.privacy.p3")}</p>
        </main>
    );
}