const AUTH_STORAGE_KEY = 'nails_service_auth';

export const readStoredSession = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!parsed?.token || !parsed?.user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const storeSession = (session) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const buildMockSession = (user) => ({
  token: `mock-token-${user.id}-${Date.now()}`,
  expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  user
});
