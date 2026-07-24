# NARTATTOO — Landing Page

Landing page premium para el estudio de tatuajes **NARTATTOO**. Construida con Next.js 15 (App Router), TypeScript, Tailwind CSS v4 y Framer Motion, con inspiración visual en Apple, Tesla y Nothing.tech.

Incluye PWA instalable y un formulario de cotización que envía los datos directamente a WhatsApp.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (configuración vía `@theme` en `globals.css`, sin `tailwind.config.js`)
- **Framer Motion** — animaciones (fade up, fade in, scale, parallax, scroll reveal)
- **Lucide Icons** — iconografía
- **next/image** y `next/og` — optimización de imágenes e iconos generados por código
- PWA nativa (manifest + service worker, sin dependencias externas)

## Estructura del proyecto

```
src/
  app/            → rutas, layout raíz, metadata, manifest, iconos, OG image, robots, sitemap
  components/     → componentes reutilizables (Header, Footer, botones, formulario, modal, etc.)
  sections/       → secciones de la landing (Hero, Manifesto, Gallery, Process, WhyUs, CTA)
  lib/            → constantes, helpers (WhatsApp, animaciones, metadata, utils)
  hooks/          → hooks (scroll progress, quote modal, lock body scroll, reduced motion)
public/
  gallery/        → imágenes de la galería (placeholders SVG — reemplazar por fotos reales)
  logo/           → logo del estudio (placeholder — reemplazar por el logo real)
  sw.js           → service worker de la PWA
  offline.html    → página de respaldo sin conexión
```

## Instalación

Requisitos: Node.js 20 o superior.

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm start
```

## Cómo cambiar las imágenes

### Logo

El proyecto usa un logo placeholder (monograma "NT" en diamante) en:

- `public/logo/nartattoo-mark.svg` — ícono/mark usado en el header, footer y hero.

Para usar el logo real de NARTATTOO:

1. Reemplaza `public/logo/nartattoo-mark.svg` por tu archivo (idealmente SVG o PNG con fondo transparente).
2. Si usas PNG, actualiza la referencia en `src/components/Logo.tsx` y `src/sections/Hero.tsx` (cambia `.svg` por `.png` y ajusta `width`/`height`).
3. Actualiza también los íconos de la PWA y el favicon (ver sección "Iconos y PWA" abajo).

### Fondo del Hero

El Hero usa actualmente un fondo generado con CSS (gradientes oscuros + grid sutil) en lugar de una fotografía, ya que no se incluye ningún banco de imágenes por defecto. Para usar una foto o video oscuro de una sesión de tatuaje:

1. Coloca el archivo en `public/hero/` (por ejemplo `public/hero/session.jpg` o `session.mp4`).
2. En `src/sections/Hero.tsx`, dentro del primer `motion.div` (comentado como "Placeholder atmospheric backdrop"), agrega un `<Image>` de `next/image` (para foto) o un `<video>` con `autoPlay muted loop playsInline` (para video), posicionado con `absolute inset-0 object-cover -z-10`, debajo del overlay oscuro ya existente.

### Galería

Las imágenes de la galería están en `public/gallery/` (actualmente placeholders SVG abstractos) y se listan en `src/lib/constants.ts` dentro del array `GALLERY_IMAGES`.

Para usar fotos reales:

1. Agrega tus fotos a `public/gallery/` (formatos recomendados: `.webp` o `.jpg`, comprimidas).
2. Edita `GALLERY_IMAGES` en `src/lib/constants.ts`, actualizando `src`, `alt` (descriptivo, importante para SEO/accesibilidad) y `id` según corresponda. Puedes agregar o quitar elementos del array libremente — la galería es tipo masonry y se adapta automáticamente.

### Iconos y PWA

Los íconos de la app (favicon, apple-touch-icon, íconos del manifest 192/512/maskable) y la imagen de Open Graph se generan por código con `next/og` en:

- `src/app/icon.svg` — favicon (SVG estático).
- `src/app/apple-icon.tsx` — ícono para iOS.
- `src/app/icons/icon-192/route.tsx`, `icon-512/route.tsx`, `icon-maskable-512/route.tsx` — íconos del manifest PWA.
- `src/app/opengraph-image.tsx` — imagen para compartir en redes sociales.
- `src/lib/appIcon.tsx` — diseño base reutilizado por los íconos anteriores.

Para usar el logo real en todos estos lugares, edita `src/lib/appIcon.tsx` (y el diseño de `opengraph-image.tsx`) reemplazando el bloque `NT` por tu logo (puedes usar una imagen embebida en base64 dentro del JSX que usa `ImageResponse`, ya que estas rutas no pueden usar `next/image`).

## Cómo modificar textos

Casi todo el copy editable vive en un solo archivo: **`src/lib/constants.ts`**:

- `NAV_LINKS` — enlaces del menú.
- `PROCESS_STEPS` — los 4 pasos del proceso.
- `WHY_US` — las 3 tarjetas de "Por qué elegirnos".
- `TATTOO_SIZES` / `BODY_LOCATIONS` — opciones del formulario de cotización.
- `WHATSAPP_NUMBER` / `WHATSAPP_DEFAULT_MESSAGE` — número y mensaje predeterminado de WhatsApp.
- `SOCIAL_LINKS` — Instagram, Facebook, TikTok, WhatsApp.

Los títulos y textos específicos de cada sección (Hero, Manifesto, CTA) están directamente en sus archivos dentro de `src/sections/`.

## Formulario de cotización → WhatsApp

El botón **"Cotizar"** (header, hero y CTA final) abre un modal (`src/components/QuoteModal.tsx`) con un formulario (`src/components/QuoteForm.tsx`) que pide: nombre, teléfono, idea del tatuaje, tamaño, ubicación en el cuerpo e, opcionalmente, una imagen de referencia.

Al enviar:

1. Se construye un mensaje de texto formateado con todos los datos (`src/lib/whatsapp.ts`).
2. Si el dispositivo soporta la **Web Share API con archivos** (la mayoría de móviles Android/iOS), se abre el panel nativo de compartir con la imagen y el texto juntos, listo para elegir WhatsApp.
3. Si no hay imagen o el navegador no soporta compartir archivos (la mayoría de navegadores de escritorio), se abre directamente `https://wa.me/...` con el mensaje precargado. Esta es una limitación técnica de WhatsApp: su enlace `wa.me` solo acepta texto, nunca archivos adjuntos por URL — por eso el formulario avisa al usuario que, en ese caso, deberá adjuntar la imagen manualmente dentro del chat ya abierto.

El botón flotante de WhatsApp (esquina inferior) siempre enlaza directo al chat con el mensaje por defecto, para contacto inmediato sin pasar por el formulario.

## PWA (Progressive Web App)

El sitio es instalable:

- `src/app/manifest.ts` genera el `manifest.webmanifest` (nombre, colores, íconos, `display: standalone`).
- `public/sw.js` es el service worker: cachea assets estáticos (cache-first) y sirve una página offline (`public/offline.html`) cuando no hay red durante la navegación.
- `src/components/ServiceWorkerRegister.tsx` registra el service worker (solo en producción).
- `src/components/PwaInstallPrompt.tsx` muestra un banner discreto "Instalar NARTATTOO" cuando el navegador dispara el evento `beforeinstallprompt`.

El service worker solo se registra en `NODE_ENV=production`, así que para probarlo localmente usa `npm run build && npm start` (no `npm run dev`).

## SEO

Configurado en `src/lib/metadata.ts` y `src/app/layout.tsx`:

- Metadata completa (title, description, keywords, canonical).
- Open Graph y Twitter Cards con imagen generada dinámicamente.
- JSON-LD (`schema.org/TattooParlor`) con datos del negocio.
- `src/app/robots.ts` y `src/app/sitemap.ts` generan `robots.txt` y `sitemap.xml` automáticamente.

Antes de desplegar, actualiza `SITE_URL` en `src/lib/constants.ts` con el dominio real (por ejemplo `https://nartattoo.com`).

## Desplegar en Vercel

1. Sube este repositorio a GitHub (o el proveedor que uses).
2. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. Vercel detecta Next.js automáticamente — no se requiere configuración adicional.
4. Antes del primer deploy (o después), actualiza `SITE_URL` en `src/lib/constants.ts` con el dominio final asignado por Vercel o tu dominio propio.
5. Click en **Deploy**.

También puedes desplegar desde la CLI:

```bash
npm i -g vercel
vercel
```

## Notas de rendimiento

- Todas las imágenes usan `next/image` con lazy loading automático.
- Las fuentes (Bebas Neue, Inter) se cargan con `next/font/google` (self-hosted, sin bloqueo de render).
- Los íconos y la imagen OG se generan como PNG en el edge, sin assets pesados en el repositorio.
- Animaciones respetan `prefers-reduced-motion`.
