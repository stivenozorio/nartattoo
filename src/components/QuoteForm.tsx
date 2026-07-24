"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Loader2, Send, X as XIcon } from "lucide-react";
import { BODY_LOCATIONS, TATTOO_SIZES } from "@/lib/constants";
import { buildQuoteMessage, buildWhatsAppUrl, type QuoteFormData } from "@/lib/whatsapp";
import Button from "@/components/Button";

const MAX_IMAGE_MB = 8;

type Status = "idle" | "sharing" | "error";

const fieldClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-silver/40 outline-none transition-colors duration-300 focus:border-electric/70 focus:bg-white/[0.06]";

const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-silver";

export default function QuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState<QuoteFormData>({
    nombre: "",
    telefono: "",
    idea: "",
    tamano: "",
    ubicacion: "",
  });

  function updateField<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleImageChange(file: File | null) {
    setErrorMsg(null);
    if (!file) {
      setImage(null);
      setImagePreview(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Solo se permiten archivos de imagen.");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setErrorMsg(`La imagen debe pesar menos de ${MAX_IMAGE_MB} MB.`);
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg(null);

    const formEl = event.currentTarget;
    if (!formEl.reportValidity()) return;

    const message = buildQuoteMessage(form, Boolean(image));
    const whatsappUrl = buildWhatsAppUrl(message);

    const canShareFile =
      image &&
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      navigator.canShare?.({ files: [image] });

    if (canShareFile && image) {
      setStatus("sharing");
      try {
        await navigator.share({
          files: [image],
          title: "Cotización NARTATTOO",
          text: message,
        });
        onSuccess?.();
      } catch {
        // User cancelled the native share sheet, or the browser rejected it —
        // fall back to the plain WhatsApp deep link so the request still goes through.
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        onSuccess?.();
      } finally {
        setStatus("idle");
      }
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="telefono" className={labelClass}>
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+57 300 000 0000"
            value={form.telefono}
            onChange={(e) => updateField("telefono", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="idea" className={labelClass}>
          Idea del tatuaje
        </label>
        <textarea
          id="idea"
          name="idea"
          required
          rows={4}
          placeholder="Cuéntanos tu concepto, estilo e inspiración…"
          value={form.idea}
          onChange={(e) => updateField("idea", e.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tamano" className={labelClass}>
            Tamaño aproximado
          </label>
          <select
            id="tamano"
            name="tamano"
            required
            value={form.tamano}
            onChange={(e) => updateField("tamano", e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled>
              Selecciona un tamaño
            </option>
            {TATTOO_SIZES.map((s) => (
              <option key={s.value} value={s.value} className="bg-ink-soft">
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ubicacion" className={labelClass}>
            Ubicación en el cuerpo
          </label>
          <select
            id="ubicacion"
            name="ubicacion"
            required
            value={form.ubicacion}
            onChange={(e) => updateField("ubicacion", e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled>
              Selecciona una zona
            </option>
            {BODY_LOCATIONS.map((b) => (
              <option key={b.value} value={b.value} className="bg-ink-soft">
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className={labelClass}>Imagen de referencia (opcional)</span>
        {!imagePreview ? (
          <button
            type="button"
            data-cursor-hover
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-6 text-sm text-silver transition-colors duration-300 hover:border-electric/60 hover:text-electric"
          >
            <ImagePlus size={18} strokeWidth={1.75} />
            Adjuntar imagen
          </button>
        ) : (
          <div className="relative w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Referencia adjunta"
              className="h-24 w-24 rounded-xl border border-white/12 object-cover"
            />
            <button
              type="button"
              aria-label="Quitar imagen"
              data-cursor-hover
              onClick={removeImage}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white shadow-lg ring-1 ring-white/20 transition-colors hover:bg-electric hover:text-ink"
            >
              <XIcon size={14} />
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
        />
        <p className="mt-2 text-xs leading-relaxed text-silver/60">
          Si tu dispositivo lo permite, la imagen se compartirá automáticamente en el chat de
          WhatsApp junto con tus datos. Si no, abriremos el chat y podrás adjuntarla manualmente.
        </p>
      </div>

      {errorMsg && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {errorMsg}
        </motion.p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "sharing"}>
        {status === "sharing" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Abriendo WhatsApp…
          </>
        ) : (
          <>
            <Send size={18} strokeWidth={1.75} />
            Enviar cotización por WhatsApp
          </>
        )}
      </Button>
    </form>
  );
}
