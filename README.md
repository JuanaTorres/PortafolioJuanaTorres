# Portafolio — Juana Valentina Torres

Portafolio profesional construido con **React + Vite**. Diseño minimalista,
completamente responsivo, con modo oscuro nativo y persistente.

## Stack técnico

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) como bundler y servidor de desarrollo
- CSS puro con variables (design tokens) para el tema claro/oscuro — sin librerías de UI
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) para pruebas unitarias

## Estructura del proyecto

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # Punto de entrada de React
│   ├── App.jsx                # Ensambla todas las secciones
│   ├── index.css              # Design tokens + estilos base globales
│   ├── setupTests.js          # Configuración de Vitest (jest-dom)
│   ├── context/
│   │   ├── ThemeContext.jsx   # Estado global de modo claro/oscuro
│   │   └── LanguageContext.jsx # Idioma actual + función t()
│   ├── i18n/
│   │   ├── translate.js        # Búsqueda de claves, interpolación, fallback
│   │   └── locales/es.js, en.js # Textos de la interfaz
│   ├── services/
│   │   └── email.js            # Envío del formulario con EmailJS
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── ThemeToggle.jsx / .css
│   │   ├── LanguageToggle.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Skills.jsx / .css
│   │   ├── Projects.jsx / .css
│   │   ├── ProjectCard.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── data/
│   │   ├── skills.js           # Lista de tecnologías (editar aquí)
│   │   └── projects.js         # Lista de proyectos (editar aquí)
│   ├── utils/
│   │   └── contact.js          # Validación, limpieza y cooldown del formulario
│   └── __tests__/
│       ├── contact.utils.test.js
│       ├── Navbar.test.jsx
│       ├── ThemeToggle.test.jsx
│       ├── Contact.test.jsx
│       └── ProjectCard.test.jsx
```

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abre la URL que Vite imprime en la terminal (por defecto `http://localhost:5173`).

## Scripts disponibles

| Comando              | Qué hace                                    |
|-----------------------|----------------------------------------------|
| `npm run dev`         | Servidor de desarrollo con hot reload        |
| `npm run build`       | Genera la versión de producción en `dist/`   |
| `npm run preview`     | Sirve la carpeta `dist/` para probarla       |
| `npm run test`        | Corre toda la suite de pruebas una vez       |
| `npm run test:watch`  | Corre las pruebas en modo watch              |
| `npm run lint`        | Corre el linter (oxlint)                     |

## Cómo personalizar el contenido

- **Foto del Hero:** `src/components/Foto/ME.webp` (versión optimizada de `ME.png`,
  64 KB en lugar de 1,8 MB). Si cambias la foto, genera de nuevo el `.webp`.
- **CV:** coloca el PDF en `public/cv/CV-Juana-Torres.pdf` (ruta definida en
  `CV_URL` dentro de `src/components/Hero.jsx`).
- **Nombre del Hero:** `PROFILE_NAME` en `src/components/Hero.jsx`. Rol, eslogan y
  demás textos: `src/i18n/locales/es.js` y `en.js`.
- **Tecnologías del stack:** edita el arreglo en `src/data/skills.js`.
- **Proyectos:** edita el arreglo en `src/data/projects.js`. Cada proyecto acepta
  `title`, `description`, `image` (imagen fija), `gif` (animación que se
  reproduce al pasar el cursor; solo se descarga en ese momento), `tags`,
  `demoUrl` y `codeUrl`. Guarda las imágenes y GIFs en `public/projects/`.
- **Redes sociales:** actualiza las URLs de GitHub y LinkedIn en
  `src/components/Contact.jsx` y `src/components/Footer.jsx`.

## Colores y modo oscuro

Modo claro en **lila y hueso**, modo oscuro en **morado**. Los colores están en
`src/index.css` (variables `--color-*`) y cumplen contraste WCAG AA (≥ 4.5:1).

El tema se controla con el atributo `data-theme="light" | "dark"` en `<html>`,
definido por `ThemeContext`. La preferencia del usuario se guarda en
`localStorage` bajo la clave `portfolio-theme`, y si no hay ninguna guardada
se respeta la preferencia del sistema operativo (`prefers-color-scheme`).

## Idiomas (español / inglés)

El sitio está disponible en español (por defecto) e inglés. El botón **EN/ES**
de la barra de navegación cambia el idioma de toda la página.

- Los textos viven en `src/i18n/locales/es.js` y `src/i18n/locales/en.js`.
  Ningún componente tiene texto escrito a mano: todos usan `t("clave")` del
  hook `useTranslation()` (`src/context/LanguageContext.jsx`).
- Para agregar un texto, crea la misma clave en **ambos** archivos. La prueba
  `i18n.test.jsx` falla si los dos idiomas no tienen exactamente las mismas claves.
- Los proyectos (`src/data/projects.js`) aceptan `title`/`description` como
  texto plano o como objeto `{ es: "...", en: "..." }`.
- La preferencia se guarda en `localStorage` (`portfolio-language`); si no hay
  ninguna, se usa el idioma del navegador. Solo se aceptan valores de la lista
  blanca (`es`, `en`).
- Al cambiar de idioma se actualizan `<html lang>`, el `<title>` y la meta
  descripción (accesibilidad y SEO).

## Formulario de contacto (envío directo con EmailJS)

El formulario envía el mensaje **directamente** al correo de Juana usando
[EmailJS](https://www.emailjs.com/): el visitante no necesita abrir su cliente
de correo. Lógica en `src/services/email.js` (`sendContactForm`, basado en `emailjs.sendForm` del SDK `@emailjs/browser`, con `blockHeadless` contra bots).

### Configuración

1. Crea una cuenta en EmailJS y conecta tu Gmail en **Email Services**.
2. Crea un **Email Template**. El formulario usa `emailjs.sendForm`, que envía los
   campos por su atributo `name`, así que la plantilla debe usar estas variables:
   - **To Email:** `juanavtp0216@gmail.com` (el destino se define aquí, no en el código)
   - **Reply To:** `{{user_email}}`
   - **Subject:** `Nuevo mensaje del portafolio de {{user_name}}`
   - **Content:** `{{user_name}} ({{user_email}}) escribió en [{{language}}]: {{message}}`
   - Usa siempre llaves dobles `{{ }}` (escapan HTML), nunca triples `{{{ }}}`.
3. Copia `.env.example` a `.env.local` y completa los tres valores.
4. Reinicia `npm run dev`. En producción (Vercel, Netlify, etc.) define las
   mismas variables en el panel del hosting.

### Seguridad

- **Allowed origins:** en EmailJS → Account → Security, permite solo tu dominio
  (y `localhost` mientras desarrollas). Así nadie puede usar tu clave pública
  desde otro sitio. Activa también el límite de envíos (rate limit).
- **Nunca** pongas la *private key* de EmailJS en una variable `VITE_`: todo lo
  que empieza con `VITE_` queda visible en el JavaScript publicado.
- `.env.local` y demás `.env*` están en `.gitignore`; solo se versiona `.env.example`.
- Campo **honeypot** oculto contra bots, **cooldown** de 60 s entre envíos,
  límites de longitud y limpieza de caracteres de control (evita inyección de
  cabeceras de correo).
- Timeout de 10 s y mensajes de error genéricos (no se exponen detalles técnicos).
- El build de producción incluye una **Content-Security-Policy** (`vite.config.js`)
  que solo permite conexiones a `api.emailjs.com` y Google Fonts.
- Opcional: añade reCAPTCHA v3 desde la configuración del template en EmailJS.

## Pruebas unitarias

La suite cubre:

- Validación, limpieza de datos y cooldown del formulario (`contact.utils.test.js`)
- Cliente de EmailJS: configuración, petición y manejo de errores (`email.service.test.js`)
- Paridad de claves entre idiomas y cambio de idioma completo (`i18n.test.jsx`)
- Renderizado de los enlaces de navegación y comportamiento del menú móvil (`Navbar.test.jsx`)
- Cambio y persistencia del modo claro/oscuro (`ThemeToggle.test.jsx`)
- Envío directo, errores, honeypot y cooldown del formulario (`Contact.test.jsx`)
- Renderizado de datos y enlaces en las tarjetas de proyecto (`ProjectCard.test.jsx`)

Ejecuta `npm run test` para correrlas todas (requiere Node ≥ 22.19, exigido por jsdom).

## Accesibilidad

- Enlace "Saltar al contenido principal" para navegación por teclado
- `aria-label`, `aria-expanded`, `aria-invalid` y `aria-describedby` en los
  controles interactivos (menú móvil, toggle de tema, campos de formulario)
- Estados de foco visibles (`:focus-visible`)
- Respeta `prefers-reduced-motion`: si el sistema tiene las animaciones
  desactivadas, la burbuja del Hero y los GIF de proyectos no se reproducen
#   P o r t a f o l i o J u a n a T o r r e s  
 