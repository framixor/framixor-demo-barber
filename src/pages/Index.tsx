import { useBusiness } from "@/contracts/useBusiness";
import { useLanguage } from "@/hooks/useLanguage";
import { Clock, Instagram, MapPin, Phone, Scissors, Star } from "lucide-react";

// Image imports
import heroBg from "@/assets/hero-barbershop.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import team1 from "@/assets/team-1.png";
import team2 from "@/assets/team-2.jpg";

const portfolioImages = [
  portfolio1,
  portfolio2,
  portfolio3,
  portfolio4,
  portfolio5,
  portfolio6,
];

const teamImages = [team1, team2];

const teamImageByKey = {
  marriel: teamImages[0],
  barber2: teamImages[1],
} as const;

type TeamImageKey = keyof typeof teamImageByKey;

function getTeamImageSrc(imageKey: unknown, index: number) {
  if (typeof imageKey === "string") {
    const key = imageKey as TeamImageKey;
    return teamImageByKey[key] ?? teamImages[index];
  }
  return teamImages[index];
}

const Index = () => {
  const { language, setLanguage, t } = useLanguage();

  // Hooks must be inside component
  const contract = useBusiness();
  const business = contract.business;

  // --- View model (contract-driven) ---
  // Keep layout unchanged; only values come from business contract with safe fallbacks.
  const brandName =
    business.displayName || business.legalName || "Marriel Barber";

  const address = business.address;

  const addressText =
    address?.city && address?.region
      ? [
          address?.line1,
          address?.line2,
          `${address.city}, ${address.region}${
            address.postalCode ? ` ${address.postalCode}` : ""
          }`,
          address.country,
        ]
          .filter(Boolean)
          .join(", ")
      : "36 Federal Rd, Danbury, CT 06810";

  const mapsUrl =
    business.links?.maps ||
    `https://maps.google.com/?q=${encodeURIComponent(addressText)}`;

  const phoneDisplay = business.contact?.phone || "(203) 417-3905";
  const phoneDigits = phoneDisplay.replace(/\D/g, "");
  const phoneHref = phoneDigits ? `tel:+${phoneDigits}` : "tel:+12034173905";

  const igRaw = business.contact?.instagram || "marriel_barber";
  const igUrl = igRaw.includes("instagram.com")
    ? igRaw
    : `https://instagram.com/${igRaw.replace(/^@/, "")}`;
  const igHandle = igRaw.includes("instagram.com")
    ? `@${igRaw.split("instagram.com/")[1]?.replace(/\/.*/, "") ?? "instagram"}`
    : igRaw.startsWith("@")
      ? igRaw
      : `@${igRaw}`;

  const waRaw =
    business.contact?.whatsapp || business.contact?.phone || "12034173905";
  const waDigits = waRaw.replace(/\D/g, "");
  const waMessage = `Hello, I'd like to book an appointment at ${brandName}.`;
  const waHref = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(waMessage)}`
    : `https://wa.me/12034173905?text=${encodeURIComponent(
        "Hello, I'd like to book an appointment at Marriel Barber.",
      )}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-semibold text-foreground">
              {brandName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t.nav.services}
            </a>
            <a
              href="#portfolio"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t.nav.portfolio}
            </a>
            <a
              href="#team"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t.nav.team}
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  language === "en"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage("pt")}
                className={`px-2 py-1 rounded transition-colors ${
                  language === "pt"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PT
              </button>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="fx-btn-primary px-5 py-2.5 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              {t.nav.bookNow}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-primary/60" />
            <Scissors className="w-5 h-5 text-primary rotate-90" />
            <div className="w-16 h-px bg-primary/60" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            {t.hero.title}{" "}
            <span className="gold-text-gradient">{t.hero.titleAccent}</span>{" "}
            {t.hero.titleEnd}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient text-primary-foreground px-8 py-4 rounded-md text-base font-medium shadow-lg hover:shadow-xl transition-all"
            >
              {t.hero.bookAppointment}
            </a>
            <a
              href="#services"
              className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-md text-base font-medium transition-all"
            >
              {t.hero.viewServices}
            </a>
          </div>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{t.hero.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{addressText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {t.services.title}{" "}
              <span className="text-primary">{t.services.titleAccent}</span>
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((service, index) => (
              <div
                key={index}
                className="glass-card rounded-lg p-6 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground text-sm">
                    {service.duration}
                  </span>
                  <span className="text-primary font-semibold text-lg">
                    {service.price}
                  </span>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground py-2.5 rounded-md text-sm font-medium transition-all block text-center"
                >
                  {t.services.bookNow}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {t.portfolio.title}{" "}
              <span className="text-primary">{t.portfolio.titleAccent}</span>
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.portfolio.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] rounded-lg overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {t.team.title}{" "}
              <span className="text-primary">{t.team.titleAccent}</span>
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.team.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.team.members.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getTeamImageSrc(member.imageKey, index)}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>

                  {member.badges?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {member.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-foreground/80 ring-1 ring-white/10"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {member.contact ? (
                    <div className="mt-4 flex items-center gap-3">
                      {member.contact.phoneE164 ? (
                        <a
                          href={`tel:${member.contact.phoneE164}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 transition hover:bg-white/15"
                          aria-label={`Call ${member.name}`}
                          title={member.contact.phoneDisplay ?? "Call"}
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </a>
                      ) : null}

                      {member.contact.whatsappE164 ? (
                        <a
                          href={`https://wa.me/${member.contact.whatsappE164.replace(
                            /\D/g,
                            "",
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 transition hover:bg-white/15"
                          aria-label={`WhatsApp ${member.name}`}
                          title="WhatsApp"
                        >
                          <WhatsAppIcon className="h-5 w-5" />
                        </a>
                      ) : null}

                      {member.contact.instagramUrl ? (
                        <a
                          href={member.contact.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 transition hover:bg-white/15"
                          aria-label={`Instagram ${member.name}`}
                          title="Instagram"
                        >
                          <InstagramIcon className="h-5 w-5" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {t.visit.title}
              <span className="text-primary">{t.visit.titleAccent}</span>
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.visit.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Business Info Card */}
            <div className="glass-card rounded-lg p-6 lg:p-8">
              {/* Business Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {brandName}
                  </h3>
                  <p className="text-muted-foreground text-sm">Barbershop</p>
                </div>
              </div>

              {/* Address */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 mb-6 group"
              >
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {addressText}
                </span>
              </a>

              {/* Hours */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    {t.visit.openingHours}
                  </span>
                </div>
                <div className="ml-8 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.visit.days.monThu}
                    </span>
                    <span className="text-foreground">10:00 AM – 8:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.visit.days.fri}
                    </span>
                    <span className="text-foreground">9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.visit.days.sat}
                    </span>
                    <span className="text-foreground">8:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.visit.days.sun}
                    </span>
                    <span className="text-foreground">9:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <a
                href={phoneHref}
                className="flex items-center gap-3 mb-6 group"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {phoneDisplay}
                </span>
              </a>

              {/* Instagram */}
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-8 group"
              >
                <Instagram className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {igHandle}
                </span>
              </a>

              {/* Get Directions Button */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full gold-gradient text-primary-foreground px-6 py-3.5 rounded-md text-base font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                {t.visit.getDirections}
              </a>
            </div>

            {/* Right Column - Google Maps Embed */}
            <div className="glass-card rounded-lg overflow-hidden min-h-[400px] lg:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.8088848097166!2d-73.45598548457441!3d41.39452997926054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7f92a1234567%3A0x1234567890abcdef!2s36%20Federal%20Rd%2C%20Danbury%2C%20CT%2006810!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${brandName} Location`}
                className="w-full h-full min-h-[400px] lg:min-h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-foreground">
                {brandName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">{t.footer.rights}</p>
          </div>
          <p className="text-muted-foreground/60 text-xs">
            Created and designed by{" "}
            <a
              href="https://loiolapropertygroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              Loiola Property Group
            </a>{" "}
            · A Framixor product
          </p>
        </div>
      </footer>
    </div>
  );
};

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 1a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.03 0C5.4 0 .02 5.38.02 12c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.6a11.95 11.95 0 0 0 5.83 1.49h.01c6.63 0 12.01-5.38 12.01-12 0-3.2-1.25-6.2-3.53-8.41zM12.04 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.68.95.98-3.59-.24-.37A9.8 9.8 0 0 1 2.2 12c0-5.43 4.41-9.84 9.84-9.84 2.63 0 5.1 1.02 6.96 2.88A9.79 9.79 0 0 1 21.88 12c0 5.43-4.41 9.8-9.84 9.8zm5.7-7.78c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.21.31-.8 1-.98 1.2-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.7-1.7-.96-2.33-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.54.08-.83.39-.29.31-1.09 1.06-1.09 2.58s1.12 2.99 1.28 3.2c.16.21 2.2 3.36 5.34 4.71.75.32 1.33.52 1.79.66.75.24 1.43.21 1.97.13.6-.09 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.12-.28-.2-.6-.36z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 0 12 14.8zM17.6 6.9a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
    </svg>
  );
}

export default Index;
