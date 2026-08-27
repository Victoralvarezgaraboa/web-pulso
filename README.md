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
  data/pulso.ts        ← email y teléfono. EMPIEZA POR AQUÍ.
  data/herramientas.ts ← las herramientas y las demos del muro.
  data/legal.ts        ← titular, NIF y domicilio. TIENE HUECOS SIN RELLENAR.
  styles/marca.css     ← colores y tipografías de marca. No inventar colores aquí.
  layouts/Base.astro   ← <head>, tipografías y todas las animaciones GSAP
  components/          ← Nav, Footer, Hero y una sección por página
  pages/               ← cuatro páginas, una por destino de la nav:
                          index.astro        /              (solo el Hero)
                          que-hacemos.astro  /que-hacemos
                          herramientas.astro /herramientas  (herramientas + demos)
                          contacto.astro     /contacto
                          aviso-legal.astro  /aviso-legal
                          privacidad.astro   /privacidad
public/                ← favicon, tipografías y archivos que se sirven tal cual
  fuentes/             ← las 3 familias de marca. NO cargar de Google: manda
                         la IP del visitante a un tercero sin su consentimiento
diseno/                ← archivos fuente del diseño en canvas (no afectan a la web)
```

## Desplegar en Render

El repositorio incluye `render.yaml`, así que Render lo configura solo:

1. En Render: **New → Blueprint** y elegir este repositorio.
2. Render lee `render.yaml`, ejecuta `npm ci && npm run build` y publica `dist/`.
3. Cada push a `main` vuelve a desplegar.

Es un sitio estático: sin servidor ni base de datos, entra en el plan gratuito. El sitio se sirve en `https://pulsogestiona.es`, declarado en `render.yaml` y en el campo
`site` de `astro.config.mjs`, que es de donde salen los enlaces canónicos. El subdominio
`web-pulso.onrender.com` sigue activo como red de seguridad y conviene apagarlo cuando el
dominio propio lleve unos días sin sobresaltos.

## Antes de publicar

Todo lo que aparece **entre corchetes** en la web es un hueco pendiente, a propósito, para que no
se cuele sin rellenar:

- [x] `src/data/pulso.ts`: email y WhatsApp
- [x] Aviso legal y política de privacidad, en `/aviso-legal` y `/privacidad`
- [x] `src/data/legal.ts`: titular, NIF y domicilio
- [ ] Que un profesional de protección de datos revise los dos textos
- [ ] Imagen de Open Graph en `src/layouts/Base.astro` (lo que se ve al pegar el enlace)

**Casos y precio están retirados de la web**, no borrados de los datos: el precio de lanzamiento
sigue en `src/data/pulso.ts` esperando a que se decida cómo se cuenta. Mientras no haya página que
lo publique, nadie ve una cifra a medio explicar.

Las demos del muro llevan datos inventados y así se dice. Si alguna se cambia por datos reales de
un cliente, hay que pedirle permiso antes.

## Accesibilidad

Las animaciones se desactivan solas si el sistema tiene activado «reducir movimiento».
Si tocas `Base.astro`, mantén esa rama.
