import { GALLERY_IMAGES } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import GalleryTile from "@/components/GalleryTile";

export default function Gallery() {
  return (
    <section id="galeria" className="relative bg-ink-soft py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Portafolio"
          title="Cada trazo, una obra."
          description="Una selección de piezas realizadas en nuestro estudio. Realismo, blackwork, fine line y diseño ornamental — un solo estándar de calidad."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryTile key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
