# Web de Pulso

Landing del servicio Pulso: control y análisis de gestión para negocios pequeños.

Hecha con [Astro](https://astro.build) (sitio estático) y [GSAP](https://gsap.com) para las
animaciones. Sigue el manual de marca de Pulso: fondo casi negro verdoso, verde señal como único
acento, Fraunces + Hanken Grotesk + JetBrains Mono.

## Poner en marcha

```bash
npm install      # solo la primera vez
npm run dev      # http://localhost:4321
npm run build    # genera dist/ listo para subir
npm run preview  # ver el resultado de build antes de publicar
```

## Dónde está cada cosa

```
src/
  data/pulso.ts        ← precio, email y teléfono. EMPIEZA POR AQUÍ.
  styles/marca.css     ← colores y tipografías de marca. No inventar colores aquí.
  layouts/Base.astro   ← <head>, tipografías y todas las animaciones GSAP
  components/          ← una sección de la landing por archivo
  pages/index.astro    ← monta las secciones en orden
public/                ← favicon y archivos que se sirven tal cual
diseno/                ← archivos fuente del diseño en canvas (no afectan a la web)
```

## Antes de publicar

Todo lo que aparece **entre corchetes** en la web es un hueco pendiente, a propósito, para que no
se cuele sin rellenar:

- [ ] `src/data/pulso.ts`: precio, condiciones de la prueba, email y WhatsApp
- [ ] Nombres reales de los casos en `src/components/Casos.astro` (ahora van anónimos)
- [ ] Aviso legal y política de privacidad en `src/components/Footer.astro`
- [ ] Imagen de Open Graph en `src/layouts/Base.astro` (lo que se ve al pegar el enlace)

Los números del panel de ejemplo son inventados y la propia sección lo dice. Si se cambian por
datos reales de un cliente, hay que pedirle permiso antes.

## Accesibilidad

Las animaciones se desactivan solas si el sistema tiene activado «reducir movimiento».
Si tocas `Base.astro`, mantén esa rama.
