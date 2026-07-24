import { MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/Logo";
import InstagramIcon from "@/components/icons/InstagramIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TikTokIcon from "@/components/icons/TikTokIcon";

const SOCIALS = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
  { label: "WhatsApp", href: SOCIAL_LINKS.whatsapp, Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink-soft">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 lg:flex-row lg:justify-between lg:px-10">
        <Logo />

        <ul className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor-hover
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-silver transition-all duration-300 hover:-translate-y-1 hover:border-electric/60 hover:text-electric hover:shadow-[0_0_20px_rgba(0,174,239,0.35)]"
              >
                <Icon size={18} strokeWidth={1.75} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/5 px-6 py-6 text-center text-xs tracking-wide text-silver/60 lg:px-10">
        © {new Date().getFullYear()} NARTATTOO. Todos los derechos reservados.
      </div>
    </footer>
  );
}
