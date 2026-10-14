/**
 * Spanish (default) UI strings. Every key here must also exist in `en.js`
 * — `i18n.test.js` enforces that both locales stay in sync.
 * Use `{{variable}}` for interpolated values.
 */
const es = {
  meta: {
    title: "Juana Valentina Torres | Portafolio",
    description:
      "Portafolio de Juana Valentina Torres, Desarrolladora Web Full Stack.",
  },
  a11y: {
    skipLink: "Saltar al contenido principal",
  },
  nav: {
    home: "Inicio",
    about: "Sobre Mí",
    skills: "Habilidades",
    projects: "Proyectos",
    experience: "Experiencia",
    education: "Formación",
    contact: "Contacto",
    mainNav: "Navegación principal",
    openMenu: "Abrir menú de navegación",
    closeMenu: "Cerrar menú de navegación",
  },
  theme: {
    toLight: "Cambiar a modo claro",
    toDark: "Cambiar a modo oscuro",
    lightTitle: "Modo claro",
    darkTitle: "Modo oscuro",
  },
  language: {
    switch: "Cambiar idioma a inglés",
    code: "EN",
  },
  hero: {
    greeting: "Hola, mi nombre es",
    role: "Desarrolladora Web Full Stack",
    tagline:
      "Construyo interfaces claras y servicios confiables, convirtiendo problemas reales en soluciones digitales eficientes.",
    photoAlt: "Foto de Juana Valentina Torres Parrado",
    windowUrl: "juana-torres · portafolio",
    emailAria: "Escribir un correo a {{email}}",
    ctaContact: "Contacto",
    ctaCv: "Descargar CV",
    cv: "/cv/CV_Juana_Torres_ES.pdf",
    ctaProjects: "Ver proyectos",
  },
  about: {
    eyebrow: "Sobre mí",
    heading: "Cómo trabajo",
    wheelLabel: "Tecnologías que manejo",
    text: "Me apasiona resolver problemas a través del código: entender lo que una persona o un negocio realmente necesita y traducirlo en una solución que funcione bien y sea fácil de mantener. Escribo código limpio y legible porque sé que otras personas (incluida mi versión futura) van a tener que leerlo, y me tomo en serio aprender constantemente, ya sea un framework nuevo, una mejor práctica o una forma distinta de resolver el mismo problema.",
  },
  skills: {
    eyebrow: "Habilidades",
    heading: "Tech stack",
  },
  projects: {
    eyebrow: "Proyectos",
    heading: "Trabajo reciente",
    preview: "Vista previa de {{title}}",
    demo: "Ver Demo en Vivo",
    code: "Código en GitHub",
  },
  experience: {
    eyebrow: "Experiencia",
    heading: "Dónde he trabajado",
    current: "Actual",
    techLabel: "Tecnologías utilizadas",
  },
  education: {
    eyebrow: "Formación",
    heading: "Educación y certificaciones",
    academic: "Formación académica",
    certifications: "Certificaciones y formación complementaria",
    inProgress: "En curso",
    hours: "{{hours}} horas",
  },
  contact: {
    eyebrow: "Contacto",
    heading: "Hablemos",
    intro:
      "¿Tienes un proyecto en mente o una oportunidad para conversar? Escríbeme y te respondo pronto.",
    socialLabel: "Redes profesionales",
    githubAria: "Perfil de GitHub",
    linkedinAria: "Perfil de LinkedIn",
    emailLink: "Correo",
    emailAria: "Enviar correo electrónico",
    fields: {
      name: "Nombre",
      email: "Correo Electrónico",
      message: "Mensaje",
      honeypot: "No completes este campo",
    },
    submit: "Enviar mensaje",
    sending: "Enviando…",
    status: {
      success: "¡Gracias! Tu mensaje fue enviado. Te responderé pronto.",
      invalid: "Revisa los campos marcados antes de continuar.",
      sendError:
        "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.",
      cooldown:
        "Ya enviaste un mensaje hace poco. Espera {{seconds}} segundos para enviar otro.",
    },
    errors: {
      nameRequired: "Por favor ingresa tu nombre.",
      nameTooLong: "El nombre no puede superar {{max}} caracteres.",
      emailRequired: "Por favor ingresa tu correo electrónico.",
      emailInvalid: "Ingresa un correo electrónico válido.",
      emailTooLong: "El correo no puede superar {{max}} caracteres.",
      messageRequired: "Por favor escribe un mensaje.",
      messageTooLong: "El mensaje no puede superar {{max}} caracteres.",
    },
  },
  footer: {
    rights: "© {{year}} Juana Valentina Torres. Todos los derechos reservados.",
  },
};

export default es;
