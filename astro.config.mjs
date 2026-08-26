// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /**
   * URL pública del sitio. De aquí salen los enlaces canónicos y las etiquetas
   * Open Graph, o sea lo que se ve al pegar el enlace en WhatsApp.
   *
   * El servicio sigue siendo accesible en web-pulso.onrender.com, pero esa no
   * es la dirección buena: si figurase aquí, los buscadores indexarían esa y
   * el dominio propio quedaría como una copia.
   */
  site: 'https://pulsogestiona.es',
});
