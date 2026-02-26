import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  const [values, setValues] = useState({
    name: '',
    email: '',
    faction: '',
    message: '',
    newsletter: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', faction: '', message: '' });

  const validators = useMemo(() => {
    const validateName = (name) => {
      const trimmed = name.trim();
      if (trimmed.length === 0) return t('validation.contact.name.required');
      if (trimmed.length < 2) return t('validation.contact.name.min');
      if (trimmed.length > 50) return t('validation.contact.name.max');
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!nameRegex.test(trimmed)) return t('validation.contact.name.format');
      return '';
    };

    const validateEmail = (email) => {
      const trimmed = email.trim();
      if (trimmed.length === 0) return t('validation.contact.email.required');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return t('validation.contact.email.format');
      if (trimmed.length > 100) return t('validation.contact.email.max');
      return '';
    };

    const validateFaction = (faction) => {
      if (!faction) return t('validation.contact.faction.required');
      const valid = ['space-marines', 'chaos', 'orks', 'eldar', 'necron', 'tau', 'tyranids'];
      if (!valid.includes(faction)) return t('validation.contact.faction.invalid');
      return '';
    };

    const validateMessage = (message) => {
      const trimmed = message.trim();
      if (trimmed.length === 0) return t('validation.contact.message.required');
      if (trimmed.length < 10) return t('validation.contact.message.min');
      if (trimmed.length > 1000) return t('validation.contact.message.max');
      return '';
    };

    return { name: validateName, email: validateEmail, faction: validateFaction, message: validateMessage };
  }, [t]);

  function setField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validateAll(nextValues) {
    const nextErrors = {
      name: validators.name(nextValues.name),
      email: validators.email(nextValues.email),
      faction: validators.faction(nextValues.faction),
      message: validators.message(nextValues.message),
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  }

  function onBlur(field) {
    setErrors((e) => ({ ...e, [field]: validators[field](values[field]) }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validateAll(values)) return;

    const contacts = JSON.parse(localStorage.getItem('warhammer_contacts') || '[]');
    contacts.push({ ...values, date: new Date().toISOString() });
    localStorage.setItem('warhammer_contacts', JSON.stringify(contacts));

    setSubmitted(true);
    setValues({ name: '', email: '', faction: '', message: '', newsletter: false });
    window.setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="contact">
      <h2 className="main-title">{t('contact.title')}</h2>

      <div className="contact-container">
        {!submitted ? (
          <form id="contact-form" className="contact-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.nameLabel')}</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t('contact.namePlaceholder')}
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                onBlur={() => onBlur('name')}
                style={{ borderColor: errors.name ? '#ff6b6b' : undefined }}
              />
              <span className="error-message" id="name-error">{errors.name}</span>
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.emailLabel')}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t('contact.emailPlaceholder')}
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => onBlur('email')}
                style={{ borderColor: errors.email ? '#ff6b6b' : undefined }}
              />
              <span className="error-message" id="email-error">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="faction">{t('contact.factionLabel')}</label>
              <select
                id="faction"
                name="faction"
                value={values.faction}
                onChange={(e) => setField('faction', e.target.value)}
                onBlur={() => onBlur('faction')}
                style={{ borderColor: errors.faction ? '#ff6b6b' : undefined }}
              >
                <option value="">{t('contact.factionPlaceholder')}</option>
                <option value="space-marines">{t('factions.spaceMarines')}</option>
                <option value="chaos">{t('factions.chaos')}</option>
                <option value="orks">{t('factions.orks')}</option>
                <option value="eldar">{t('factions.aeldari')}</option>
                <option value="necron">{t('factions.necrons')}</option>
                <option value="tau">{t('factions.tau')}</option>
                <option value="tyranids">{t('factions.tyranids')}</option>
              </select>
              <span className="error-message" id="faction-error">{errors.faction}</span>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.messageLabel')}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
                onBlur={() => onBlur('message')}
                style={{ borderColor: errors.message ? '#ff6b6b' : undefined }}
              />
              <span className="error-message" id="message-error">{errors.message}</span>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={values.newsletter}
                  onChange={(e) => setField('newsletter', e.target.checked)}
                />
                {t('contact.newsletter')}
              </label>
            </div>

            <button type="submit" className="btn-submit">
              <i className="fa-solid fa-paper-plane"></i> {t('contact.submit')}
            </button>
          </form>
        ) : (
          <div id="form-success" className="success-message">
            <i className="fa-solid fa-check-circle"></i>
            <p>{t('contact.success')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
