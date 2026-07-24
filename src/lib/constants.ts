export const SITE_NAME = "NARTATTOO";

export const SITE_URL = "https://nartattoo.vercel.app";

export const WHATSAPP_NUMBER = "573128474225";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola NARTATTOO, quiero cotizar un tatuaje.";

export const WHATSAPP_DEFAULT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/nartattoo4",
  facebook: "https://facebook.com/nartattoo4",
  tiktok: "https://tiktok.com/nartattoo4",
  whatsapp: WHATSAPP_DEFAULT_URL,
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Galería", href: "#galeria" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** Controls masonry row-span sizing */
  size: "sm" | "md" | "lg";
};

/**
 * Placeholder gallery set. Replace the files in /public/gallery with real
 * session/work photography (see README "Cómo cambiar las imágenes").
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "01", src: "/gallery/placeholder-01.svg", alt: "Tatuaje realista de manga completa", size: "lg" },
  { id: "02", src: "/gallery/placeholder-02.svg", alt: "Diseño blackwork geométrico", size: "sm" },
  { id: "03", src: "/gallery/placeholder-03.svg", alt: "Tatuaje fine line minimalista", size: "md" },
  { id: "04", src: "/gallery/placeholder-04.svg", alt: "Retrato realista en antebrazo", size: "sm" },
  { id: "05", src: "/gallery/placeholder-05.svg", alt: "Diseño de espalda completa", size: "lg" },
  { id: "06", src: "/gallery/placeholder-06.svg", alt: "Tatuaje ornamental en pierna", size: "md" },
  { id: "07", src: "/gallery/placeholder-07.svg", alt: "Diseño de neotradicional a color", size: "sm" },
  { id: "08", src: "/gallery/placeholder-08.svg", alt: "Tatuaje japonés en costilla", size: "md" },
];

export const TATTOO_SIZES = [
  { value: "pequeno", label: "Pequeño (hasta 10 cm)" },
  { value: "mediano", label: "Mediano (10 - 20 cm)" },
  { value: "grande", label: "Grande (20 cm o más)" },
  { value: "pieza-completa", label: "Pieza completa / manga" },
] as const;

export const BODY_LOCATIONS = [
  { value: "brazo", label: "Brazo" },
  { value: "antebrazo", label: "Antebrazo" },
  { value: "pierna", label: "Pierna" },
  { value: "espalda", label: "Espalda" },
  { value: "pecho", label: "Pecho" },
  { value: "costilla", label: "Costillas" },
  { value: "mano", label: "Mano" },
  { value: "cuello", label: "Cuello" },
  { value: "otro", label: "Otra zona" },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Cuéntanos tu idea",
    description:
      "Comparte tu concepto, referencias e inspiración. Escuchamos cada detalle de tu historia.",
  },
  {
    number: "02",
    title: "Diseñamos tu tatuaje",
    description:
      "Nuestro equipo crea una propuesta exclusiva, pensada a la medida de tu piel y tu estilo.",
  },
  {
    number: "03",
    title: "Agendamos tu cita",
    description:
      "Coordinamos fecha, artista y estudio para que vivas una experiencia cómoda y profesional.",
  },
  {
    number: "04",
    title: "Lo hacemos realidad",
    description:
      "Convertimos el diseño en una obra de arte permanente, con la máxima calidad y cuidado.",
  },
] as const;

export const WHY_US = [
  {
    title: "Diseños exclusivos",
    description:
      "Cada tatuaje es una pieza original, creada desde cero para representar tu historia única.",
  },
  {
    title: "Materiales de alta calidad",
    description:
      "Trabajamos con tintas, agujas y equipos certificados para tu seguridad y el mejor resultado.",
  },
  {
    title: "Atención personalizada",
    description:
      "Acompañamiento cercano en cada etapa, desde la idea inicial hasta el cuidado posterior.",
  },
] as const;
