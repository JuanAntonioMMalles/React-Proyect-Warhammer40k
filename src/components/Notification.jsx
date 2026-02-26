import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [items, setItems] = useState([]);

  const notify = useCallback((message, type = 'success') => {
    const id = crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
    const item = { id, message, type };
    setItems((prev) => [...prev, item]);

    window.setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true">
        {items.map((n) => (
          <div
            key={n.id}
            className={`toast ${n.type === 'success' ? 'toast-success' : 'toast-error'}`}
            role="status"
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
