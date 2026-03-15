import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../contexts/ProductsContext.jsx';
import { NotificationProvider, useNotification } from '../components/Notification.jsx';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductFormInner() {
    const { t } = useTranslation();
    const query = useQuery();
    const navigate = useNavigate();
    const { notify } = useNotification();
    const { getById, add, update } = useProducts();

    const editId = query.get('id');
    const isEditing = Boolean(editId);

    const [values, setValues] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        description: '',
        stock: '',
    });

    const [errors, setErrors] = useState({ name: '', category: '', price: '', description: '', stock: '' });

    const validators = useMemo(() => {
        const validateName = (name) => {
            const trimmed = name.trim();
            if (trimmed.length === 0) return t('validation.product.name.required');
            if (trimmed.length < 3) return t('validation.product.name.min');
            if (trimmed.length > 100) return t('validation.product.name.max');
            return '';
        };

        const validateCategory = (category) => {
            if (!category) return t('validation.product.category.required');
            const valid = ['miniaturas', 'libros', 'videojuegos', 'accesorios', 'pinturas'];
            if (!valid.includes(category)) return t('validation.product.category.invalid');
            return '';
        };

        const validatePrice = (price) => {
            const priceValue = Number(price);
            if (Number.isNaN(priceValue)) return t('validation.product.price.nan');
            if (priceValue < 0) return t('validation.product.price.negative');
            if (priceValue === 0) return t('validation.product.price.zero');
            if (priceValue > 999999) return t('validation.product.price.max');
            return '';
        };

        const validateDescription = (description) => {
            const trimmed = description.trim();
            if (trimmed.length === 0) return t('validation.product.description.required');
            if (trimmed.length < 10) return t('validation.product.description.min');
            if (trimmed.length > 500) return t('validation.product.description.max');
            return '';
        };

        const validateStock = (stock) => {
            const stockValue = Number(stock);
            if (Number.isNaN(stockValue)) return t('validation.product.stock.nan');
            if (stockValue < 0) return t('validation.product.stock.negative');
            if (stockValue > 999999) return t('validation.product.stock.max');
            return '';
        };

        return { name: validateName, category: validateCategory, price: validatePrice, description: validateDescription, stock: validateStock };
    }, [t]);

    useEffect(() => {
        if (!isEditing) return;

        const product = getById(editId);
        if (!product) {
            window.alert(t('productForm.notFound'));
            navigate('/products', { replace: true });
            return;
        }

        setValues({
            id: String(product.id),
            name: product.name,
            category: product.category,
            price: String(product.price),
            description: product.description,
            stock: String(product.stock),
        });
    }, [isEditing, editId, getById, navigate, t]);

    const title = isEditing ? t('productForm.titleEdit') : t('productForm.titleAdd');
    const submitText = isEditing ? t('productForm.submitUpdate') : t('productForm.submitCreate');

    function setField(field, value) {
        setValues((v) => ({ ...v, [field]: value }));
    }

    function validateAll(nextValues) {
        const nextErrors = {
            name: validators.name(nextValues.name),
            category: validators.category(nextValues.category),
            price: validators.price(nextValues.price),
            description: validators.description(nextValues.description),
            stock: validators.stock(nextValues.stock),
        };
        setErrors(nextErrors);
        return !Object.values(nextErrors).some(Boolean);
    }

    function onBlur(field) {
        setErrors((e) => ({ ...e, [field]: validators[field](values[field]) }));
    }

    function onSubmit(e) {
        e.preventDefault();

        if (!validateAll(values)) {
            notify(t('productForm.fixErrors'), 'error');
            return;
        }

        const payload = {
            name: values.name.trim(),
            category: values.category,
            price: Number(values.price),
            description: values.description.trim(),
            stock: Number(values.stock),
        };

        if (isEditing) {
            update(editId, payload);
            notify(t('productForm.updatedOk'), 'success');
        } else {
            add(payload);
            notify(t('productForm.createdOk'), 'success');
        }

        window.setTimeout(() => {
            navigate('/products', { replace: true });
        }, 1200);
    }

    return (
        <section id="product-form-section">
            <h2 className="main-title" id="form-title">{title}</h2>

            <div className="product-form-container">
                <form id="product-form" className="product-form" onSubmit={onSubmit}>
                    <input type="hidden" id="product-id" name="product-id" value={values.id} readOnly />

                    <div className="form-group">
                        <label htmlFor="product-name">{t('productForm.fields.name.label')}</label>
                        <input
                            type="text"
                            id="product-name"
                            name="product-name"
                            placeholder={t('productForm.fields.name.placeholder')}
                            value={values.name}
                            onChange={(e) => setField('name', e.target.value)}
                            onBlur={() => onBlur('name')}
                            style={{ borderColor: errors.name ? '#ff6b6b' : undefined }}
                        />
                        <span className="error-message" id="product-name-error">{errors.name}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-category">{t('productForm.fields.category.label')}</label>
                        <select
                            id="product-category"
                            name="product-category"
                            value={values.category}
                            onChange={(e) => setField('category', e.target.value)}
                            onBlur={() => onBlur('category')}
                            style={{ borderColor: errors.category ? '#ff6b6b' : undefined }}
                        >
                            <option value="">{t('productForm.fields.category.placeholder')}</option>
                            <option value="miniaturas">{t('products.categories.miniaturas')}</option>
                            <option value="libros">{t('products.categories.libros')}</option>
                            <option value="videojuegos">{t('products.categories.videojuegos')}</option>
                            <option value="accesorios">{t('products.categories.accesorios')}</option>
                            <option value="pinturas">{t('products.categories.pinturas')}</option>
                        </select>
                        <span className="error-message" id="product-category-error">{errors.category}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-price">{t('productForm.fields.price.label')}</label>
                        <input
                            type="number"
                            id="product-price"
                            name="product-price"
                            step="0.01"
                            min="0"
                            placeholder={t('productForm.fields.price.placeholder')}
                            value={values.price}
                            onChange={(e) => setField('price', e.target.value)}
                            onBlur={() => onBlur('price')}
                            style={{ borderColor: errors.price ? '#ff6b6b' : undefined }}
                        />
                        <span className="error-message" id="product-price-error">{errors.price}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-description">{t('productForm.fields.description.label')}</label>
                        <textarea
                            id="product-description"
                            name="product-description"
                            rows={4}
                            placeholder={t('productForm.fields.description.placeholder')}
                            value={values.description}
                            onChange={(e) => setField('description', e.target.value)}
                            onBlur={() => onBlur('description')}
                            style={{ borderColor: errors.description ? '#ff6b6b' : undefined }}
                        />
                        <span className="error-message" id="product-description-error">{errors.description}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-stock">{t('productForm.fields.stock.label')}</label>
                        <input
                            type="number"
                            id="product-stock"
                            name="product-stock"
                            min="0"
                            placeholder={t('productForm.fields.stock.placeholder')}
                            value={values.stock}
                            onChange={(e) => setField('stock', e.target.value)}
                            onBlur={() => onBlur('stock')}
                            style={{ borderColor: errors.stock ? '#ff6b6b' : undefined }}
                        />
                        <span className="error-message" id="product-stock-error">{errors.stock}</span>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            <i className="fa-solid fa-save"></i> <span id="submit-text">{submitText}</span>
                        </button>
                        <Link to="/products" className="btn-cancel">
                            <i className="fa-solid fa-times"></i> {t('productForm.cancel')}
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default function ProductFormPage() {
    return (
        <NotificationProvider>
            <ProductFormInner />
        </NotificationProvider>
    );
}
