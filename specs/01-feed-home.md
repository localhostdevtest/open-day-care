# SPEC 01 — Feed de la guardería como home

> **Status:** Aprobado
> **Depends on:** —
> **Date:** 2026-10-16
> **Objective:** Implementar la plantilla `referencias/pantallas/feed.dc.html` como página home (`/`) con estilo idéntico, contenido mock y sin autenticación ni base de datos.

## Scope

**In:**

- Reescribir `/` (`app/page.tsx`) replicando el layout de `feed.dc.html`: sidebar fijo de 248px + área de contenido centrada en máx. 760px.
- Sidebar con logo `OpenDayCare · Sala Soles`, botón "Nueva publicación", nav (Feed, Niños, Avisos, Mi cuenta) y footer de usuario (Caro Giménez) con botón de logout.
- Encabezado del feed (`GUARDERÍA · SALA SOLES`, "Buenas, Caro", "12 niños · martes 17 jun") y barra "Compartí un momento…".
- Divider `PUBLICADO HOY` y 3 publicaciones mock renderizadas con `.map` desde un array tipado: tipo `logro`, `actividad` (con placeholder de foto) y `anuncio`.
- Portar los estilos del template como objetos `style={{ ... }}` inline en JSX para garantizar fidelidad pixel-perfect.
- Cargar las fuentes Fredoka + Nunito con `next/font/google` y ajustar `globals.css` (fondo `#F6ECDF`, texto `#3F362E`, scrollbar), eliminando el override de dark mode que rompería el diseño.
- Solo `/` es navegable; el resto de los links apuntan a `#`.

**Out of scope (for future specs):**

- Autenticación y cualquier lógica de sesión.
- Base de datos, API, persistencia o estado real de posts/likes/comentarios.
- Pantallas destino: Niños, Avisos, Mi cuenta, Crear/Detalle de publicación, Login, Foto, etc.
- Interactividad (dar like, comentar, editar, cerrar sesión).
- Responsive / versión móvil.

## Data model

No hay persistencia. Se introduce un tipo de solo lectura para las publicaciones en `lib/posts.ts`:

```ts
export type PostType = "logro" | "actividad" | "anuncio";

export interface FeedPost {
  id: string;
  type: PostType;
  authorName: string;      // "Mateo" | "Anuncio general"
  authorInitial: string;   // "M" (vacío para anuncio, usa ícono)
  time: string;            // "14:20"
  audience: string;        // "familia de Mateo" | "toda la sala"
  body: string;
  hasPhoto: boolean;
  photoLabel?: string;     // "Foto · pintando con témperas"
  reactions: number;
  comments: number;
}

export const posts: FeedPost[] = [ /* 3 publicaciones del template */ ];
```

Convenciones:

- `TAG_STYLES` (map por `type`) define `{ bg, color }` de la píldora y el avatar: logro `#CFEBD8`/`#3E9B6C`, actividad `#C7E7F1`/`#2E89A6`, anuncio `#CCD8F4`/`#4E72C8`.
- El avatar de `logro`/`actividad` muestra la inicial; `anuncio` muestra el ícono de megáfono.
- El autor siempre se muestra como "publicado por vos" (mock, sin auth).

## Implementation plan

1. Editar `app/layout.tsx`: reemplazar Geist por `Fredoka` y `Nunito` en `next/font/google`, aplicando sus variables CSS en `<html>`; actualizar `metadata.title` a "OpenDayCare". Sistema queda funcional.
2. Editar `app/globals.css`: setear `body` con `background:#F6ECDF`, `color:#3F362E`, `font-family` Nunito, reglas de scrollbar del template; eliminar el bloque `prefers-color-scheme: dark` y tokens no usados.
3. Crear `components/Sidebar.tsx`: sidebar con logo, botón "Nueva publicación", nav (`Feed` activo con `#FBE3D8`/`#D9583C`), footer de usuario y logout; links a `#`.
4. Crear `lib/posts.ts`: tipos, maps de estilos y array mock con las 3 publicaciones del template.
5. Reescribir `app/page.tsx`: contenedor flex `Sidebar` + `main`, encabezado, tarjeta "Compartí un momento…", divider "PUBLICADO HOY" y `.map` de `posts` a tarjetas con píldora de tipo, audiencia, cuerpo, foto opcional, reacciones y "Editar".
6. Verificar visualmente con Playwright contra `referencias/screenshots/feed.png` y `.playwright-mcp/`.

## Acceptance criteria

- [ ] `npm run build` termina sin errores.
- [ ] `npm run lint` pasa sin errores.
- [ ] `/` renderiza el layout de dos columnas: sidebar `#FFFDF9` de 248px y contenido centrado en 760px sobre fondo `#F6ECDF`.
- [ ] Las fuentes Fredoka (títulos/logo) y Nunito (cuerpo) se aplican correctamente.
- [ ] El nav marca "Feed" como activo y los demás items no tienen destino a otra ruta.
- [ ] Se renderizan exactamente 3 publicaciones desde `posts` (logro, actividad, anuncio).
- [ ] Cada publicación muestra píldora con color y etiqueta correcta según `type`.
- [ ] La publicación de tipo `actividad` muestra el placeholder de foto con borde punteado y su leyenda.
- [ ] Los contadores de reacciones/comentarios coinciden con el template (3/1, 5/2, 8/0).
- [ ] Con el sistema operativo en dark mode, la página no cambia de fondo ni de colores.
- [ ] La captura de `/` coincide visualmente con `referencias/screenshots/feed.png`.

## Decisions

- **Sí:** estilos inline copiados del template. Es la única forma de garantizar fidelidad idéntica sin introducir drift.
- **No:** migrar a Tailwind. Aunque el repo ya usa Tailwind v4, traducir cada estilo arriesga diferencias visuales.
- **Sí:** array mock tipado en `lib/posts.ts`. Deja el código listo para reemplazar por datos reales en un futuro spec.
- **Sí:** `next/font/google` para Fredoka + Nunito. Evita FOUC y sigue la convención de `next/font`.
- **Sí:** eliminar el dark mode de `globals.css`. El override actual rompería el fondo crema.
- **Sí:** extraer el sidebar a `components/Sidebar.tsx`. Se reutilizará en las demás pantallas del staff.
- **No:** responsive. El template es de escritorio fijo; se difiere a otro spec.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| `height:100vh` + scroll interno puede desbordar en pantallas chicas. | Se acepta comportamiento de escritorio idéntico al template; responsive fuera de alcance. |
| La regla de scrollbar es solo `-webkit-` (Chrome/Edge/Safari). | Suficiente para la verificación; Firefox usa su scrollbar por defecto. |
| Los links a `#` pueden dar sensación de "rotos". | Confirmado como esperado: solo `/` navega en este spec. |

## What is **not** in this spec

- Autenticación e inicio/cierre de sesión real.
- Base de datos o cualquier persistencia.
- Las demás pantallas (Niños, Avisos, Mi cuenta, Crear/Detalle publicación, etc.).
- Interactividad de likes, comentarios o edición.
- Responsive móvil.

Cada uno de esos, si llega, va en su propio spec.
