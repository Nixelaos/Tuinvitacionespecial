/**
 * URL y configuración de la API del Backend (Lista de Regalos de los Novios).
 * - En producción (Vercel): usa la variable de entorno PUBLIC_API_URL si está definida.
 * - Si no está definida en producción, devuelve null para operar fluidamente en modo interactivo con localStorage sin errores de conexión.
 * - En desarrollo local (dev): conecta a http://localhost:4000/api/gifts.
 */
export const getBackendGiftsUrl = (): string | null => {
  const envUrl = (import.meta.env.PUBLIC_API_URL || '').trim();

  if (envUrl) {
    return envUrl.endsWith('/api/gifts') ? envUrl : `${envUrl.replace(/\/$/, '')}/api/gifts`;
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:4000/api/gifts';
  }

  return null;
};

export const BACKEND_URL = getBackendGiftsUrl();
