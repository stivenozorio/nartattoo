import { WHATSAPP_NUMBER } from "@/lib/constants";

export type QuoteFormData = {
  nombre: string;
  telefono: string;
  idea: string;
  tamano: string;
  ubicacion: string;
};

const TAMANO_LABELS: Record<string, string> = {
  pequeno: "Pequeño (hasta 10 cm)",
  mediano: "Mediano (10 - 20 cm)",
  grande: "Grande (20 cm o más)",
  "pieza-completa": "Pieza completa / manga",
};

const UBICACION_LABELS: Record<string, string> = {
  brazo: "Brazo",
  antebrazo: "Antebrazo",
  pierna: "Pierna",
  espalda: "Espalda",
  pecho: "Pecho",
  costilla: "Costillas",
  mano: "Mano",
  cuello: "Cuello",
  otro: "Otra zona",
};

/** Builds the human-readable message sent to WhatsApp from the quote form fields. */
export function buildQuoteMessage(data: QuoteFormData, hasReference: boolean): string {
  const lines = [
    "Hola NARTATTOO, quiero cotizar un tatuaje.",
    "",
    `*Nombre:* ${data.nombre}`,
    `*Teléfono:* ${data.telefono}`,
    `*Idea del tatuaje:* ${data.idea}`,
    `*Tamaño aproximado:* ${TAMANO_LABELS[data.tamano] ?? data.tamano}`,
    `*Ubicación en el cuerpo:* ${UBICACION_LABELS[data.ubicacion] ?? data.ubicacion}`,
  ];

  if (hasReference) {
    lines.push("", "Adjunto una imagen de referencia en este chat.");
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
