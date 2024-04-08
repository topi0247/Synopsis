export const setSession = (key: string, value: string) => {
  if(!value) return;
  localStorage.setItem(key, value);
};

export const getSession = (key: string) => {
  return localStorage.getItem(key);
};

export const removeSession = (key: string) => {
  localStorage.removeItem(key);
};

export const clearSession = () => {
  localStorage.clear();
};
