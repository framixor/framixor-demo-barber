export type Language = "en" | "pt";

interface ServiceItem {
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface TeamMemberContact {
  phoneDisplay?: string; // ex: "203-417-3905"
  phoneE164?: string; // ex: "+12034173905"
  whatsappE164?: string; // ex: "+12034173905"
  instagramUrl?: string; // ex: "https://instagram.com/marriel_barber"
}

interface TeamMember {
  name: string;
  role: string;
  description: string;

  // Optional extras (demo-friendly, não quebra nada)
  contact?: TeamMemberContact;
  badges?: string[];

  // Keeps images stable even if array order changes
  imageKey?: "marriel" | "barber2";
}

export interface Translations {
  nav: {
    services: string;
    portfolio: string;
    team: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    title: string;
    titleAccent: string;
    titleEnd: string;
    subtitle: string;
    bookAppointment: string;
    viewServices: string;
    hours: string;
  };
  services: {
    title: string;
    titleAccent: string;
    subtitle: string;
    items: ServiceItem[];
    bookNow: string;
  };
  portfolio: {
    title: string;
    titleAccent: string;
    subtitle: string;
  };
  team: {
    title: string;
    titleAccent: string;
    subtitle: string;
    members: TeamMember[];
  };
  visit: {
    title: string;
    titleAccent: string;
    subtitle: string;
    ourLocation: string;
    openingHours: string;
    getDirections: string;
    days: {
      monThu: string;
      fri: string;
      sat: string;
      sun: string;
    };
  };
  footer: {
    rights: string;
  };
}

export const translations = {
  en: {
    // Header
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      team: "Team",
      contact: "Contact",
      bookNow: "Book Now",
    },
    // Hero
    hero: {
      title: "Marriel",
      titleAccent: "Barber",
      titleEnd: "Shop",
      subtitle:
        "Where tradition meets modern craftsmanship. Experience the art of premium grooming in an atmosphere of refined elegance.",
      bookAppointment: "Book Appointment",
      viewServices: "View Services",
      hours: "Mon-Sat: 9am - 8pm",
    },
    // Services
    services: {
      title: "Our",
      titleAccent: "Services",
      subtitle: "Premium grooming services crafted with precision and care",
      items: [
        {
          name: "Classic Haircut",
          description: "Precision cut tailored to your style",
          duration: "45 min",
          price: "$35",
        },
        {
          name: "Beard Grooming",
          description: "Expert shaping and conditioning",
          duration: "30 min",
          price: "$25",
        },
        {
          name: "Hot Towel Shave",
          description: "Traditional straight razor experience",
          duration: "45 min",
          price: "$40",
        },
        {
          name: "Hair & Beard Combo",
          description: "Complete grooming package",
          duration: "75 min",
          price: "$55",
        },
        {
          name: "Kids Haircut",
          description: "Gentle care for young gentlemen",
          duration: "30 min",
          price: "$25",
        },
        {
          name: "Grey Blending",
          description: "Natural color enhancement",
          duration: "45 min",
          price: "$45",
        },
      ],
      bookNow: "Book Now",
    },
    // Portfolio
    portfolio: {
      title: "Our",
      titleAccent: "Work",
      subtitle: "A showcase of our finest cuts and styles",
    },
    // Team
    team: {
      title: "Meet the",
      titleAccent: "Team",
      subtitle: "Expert craftsmen dedicated to your perfect look",
      members: [
        {
          name: "Marriel",
          role: "Master Barber / Founder",
          description:
            "Specialized in modern cuts — fades, taper fades, and clean finishing. Serving mostly Brazilian clients with premium attention to detail.",
          badges: ["Skin Fade", "Taper Fade", "Line-up", "Beard"],
          imageKey: "marriel",
          contact: {
            phoneDisplay: "203-417-3905",
            phoneE164: "+12034173905",
            whatsappE164: "+12034173905",
            instagramUrl: "https://instagram.com/marriel_barber",
          },
        },
        {
          name: "Barber #2",
          role: "Senior Barber (Demo)",
          description:
            "Precision fades and textured modern styles — clean blends, sharp edges, and consistent results.",
          badges: ["Skin Fade", "Textured Crop", "Beard"],
          imageKey: "barber2",
        },
      ],
    },

    // Visit / Contact
    visit: {
      title: "Visit",
      titleAccent: "Us",
      subtitle: "We look forward to welcoming you",
      ourLocation: "Our Location",
      openingHours: "Opening Hours",
      getDirections: "Get Directions",
      days: {
        monThu: "Mon–Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
      },
    },
    // Footer
    footer: {
      rights: "© Marriel Barber Shop. All rights reserved.",
    },
  },
  pt: {
    // Header
    nav: {
      services: "Serviços",
      portfolio: "Portfólio",
      team: "Equipe",
      contact: "Contato",
      bookNow: "Agendar",
    },
    // Hero
    hero: {
      title: "Barbearia",
      titleAccent: "Marriel",
      titleEnd: "",
      subtitle:
        "Onde a tradição encontra a arte moderna. Experimente o cuidado premium em um ambiente de elegância refinada.",
      bookAppointment: "Agendar Horário",
      viewServices: "Ver Serviços",
      hours: "Seg-Sáb: 9h - 20h",
    },
    // Services
    services: {
      title: "Nossos",
      titleAccent: "Serviços",
      subtitle: "Serviços de barbearia premium com precisão e cuidado",
      items: [
        {
          name: "Corte Clássico",
          description: "Corte de precisão adaptado ao seu estilo",
          duration: "45 min",
          price: "$35",
        },
        {
          name: "Barba",
          description: "Modelagem e hidratação profissional",
          duration: "30 min",
          price: "$25",
        },
        {
          name: "Barbear com Toalha Quente",
          description: "Experiência tradicional com navalha",
          duration: "45 min",
          price: "$40",
        },
        {
          name: "Corte + Barba",
          description: "Pacote completo de cuidados",
          duration: "75 min",
          price: "$55",
        },
        {
          name: "Corte Infantil",
          description: "Cuidado especial para os pequenos",
          duration: "30 min",
          price: "$25",
        },
        {
          name: "Disfarce de Grisalhos",
          description: "Coloração natural e discreta",
          duration: "45 min",
          price: "$45",
        },
      ],
      bookNow: "Agendar",
    },
    // Portfolio
    portfolio: {
      title: "Nosso",
      titleAccent: "Trabalho",
      subtitle: "Uma vitrine dos nossos melhores cortes e estilos",
    },
    // Team
    team: {
      title: "Conheça a",
      titleAccent: "Equipe",
      subtitle: "Profissionais dedicados ao seu visual perfeito",
      members: [
        {
          name: "Marriel",
          role: "Barbeiro Mestre / Fundador",
          description:
            "Especializado em cortes modernos — degradê, taper fade e acabamento limpo. Atende majoritariamente brasileiros com atenção premium aos detalhes.",
          badges: ["Degradê", "Taper Fade", "Pezinho", "Barba"],
          imageKey: "marriel",
          contact: {
            phoneDisplay: "203-417-3905",
            phoneE164: "+12034173905",
            whatsappE164: "+12034173905",
            instagramUrl: "https://instagram.com/marriel_barber",
          },
        },
        {
          name: "Barbeiro #2",
          role: "Barbeiro Sênior (Demo)",
          description:
            "Degradês precisos e estilos modernos texturizados — transição limpa, linhas bem marcadas e consistência no resultado.",
          badges: ["Degradê", "Corte Texturizado", "Barba"],
          imageKey: "barber2",
        },
      ],
    },
    // Visit / Contact
    visit: {
      title: "Visite",
      titleAccent: "-nos",
      subtitle: "Esperamos recebê-lo em breve",
      ourLocation: "Nossa Localização",
      openingHours: "Horário de Funcionamento",
      getDirections: "Como Chegar",
      days: {
        monThu: "Seg–Qui",
        fri: "Sex",
        sat: "Sáb",
        sun: "Dom",
      },
    },
    // Footer
    footer: {
      rights: "© Marriel Barber Shop. All rights reserved.",
    },
  },
} as const satisfies Record<Language, Translations>;
