// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /**
   * URL pública del sitio. Se usa para los enlaces canónicos y las etiquetas
   * Open Graph. Al desplegar en Render, el primer dominio es
   * https://<nombre-del-servicio>.onrender.com — cámbialo aquí en cuanto
   * conectes un dominio propio.
   */
  site: 'https://web-pulso.onrender.com',
});
