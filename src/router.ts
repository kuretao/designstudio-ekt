export const normalizePath = (path: string) => {
  const normalized = path.replace(/\/+$/, "");
  return normalized || "/";
};

export const getCurrentPath = () => normalizePath(window.location.pathname);
