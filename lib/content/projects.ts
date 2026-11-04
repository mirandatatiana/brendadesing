import type { Locale, Localized } from "@/lib/i18n/config";
import type { ServiceKey } from "./services";

/* ------------------------------------------------------------------ */
/* Taxonomy                                                            */
/* ------------------------------------------------------------------ */

export const rooms = {
  living: { en: "Living room", nl: "Woonkamer" },
  bedroom: { en: "Bedroom", nl: "Slaapkamer" },
  dining: { en: "Dining room", nl: "Eetkamer" },
  kitchen: { en: "Kitchen", nl: "Keuken" },
} satisfies Record<string, Localized>;

export const styles = {
  "warm-minimal": { en: "Warm minimal", nl: "Warm minimalistisch" },
  eclectic: { en: "Eclectic", nl: "Eclectisch" },
  "soft-classic": { en: "Soft classic", nl: "Zacht klassiek" },
  "vintage-modern": { en: "Vintage modern", nl: "Vintage modern" },
} satisfies Record<string, Localized>;

export type RoomKey = keyof typeof rooms;
export type StyleKey = keyof typeof styles;

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
};

/**
 * Placeholder photography from Unsplash, cropped to a fixed size so the
 * layout never shifts. To use Julieta's own photos, put them in
 * /public/projects/<slug>/ and use e.g. `src: "/projects/canal-house/01.jpg"`
 * with the real width and height. next/image handles resizing and AVIF/WebP.
 */
function unsplash(id: string, width: number, height: number, alt: Localized): Photo {
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=entropy&w=${width}&h=${height}&q=80`,
    width,
    height,
    alt,
  };
}

const L = (w = 2000, h = 1333) => [w, h] as const; // landscape 3:2
const P = (w = 1400, h = 1750) => [w, h] as const; // portrait 4:5

export const photos = {
  hero: unsplash("photo-1616046229478-9901c5536a45", ...L(2400, 1500), {
    en: "Sunlit living room with a low wooden sideboard, a round mirror and trailing plants",
    nl: "Zonnige woonkamer met een laag houten dressoir, een ronde spiegel en hangplanten",
  }),
  aboutPortrait: {
    src: "/about/julieta.jpg",
    width: 920,
    height: 920,
    alt: { en: "Portrait of Julieta", nl: "Portret van Julieta" },
  },
  aboutRoom: unsplash("photo-1631679706909-1844bbd07221", ...L(), {
    en: "Calm living room with cream walls, woven wall baskets and a linen sofa",
    nl: "Rustige woonkamer met crèmekleurige muren, gevlochten wandmanden en een linnen bank",
  }),
  serviceStyling: unsplash("photo-1567016432779-094069958ea5", ...P(), {
    en: "Rust-coloured velvet sofa with a soft pink cushion against a sage wall",
    nl: "Roestkleurige fluwelen bank met een zachtroze kussen tegen een saliegroene muur",
  }),
  serviceMoodboard: unsplash("photo-1594026112284-02bb6f3352fe", ...P(), {
    en: "Floating oak shelves styled with ceramics, books and a framed print",
    nl: "Zwevende eiken planken gestyled met keramiek, boeken en een ingelijste print",
  }),
  serviceConsultation: unsplash("photo-1586023492125-27b2c045efd7", ...P(), {
    en: "Mustard armchair beside a dark wooden cabinet in a bright room",
    nl: "Okergele fauteuil naast een donkere houten kast in een lichte kamer",
  }),
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: Localized;
  location: string;
  year: number;
  room: RoomKey;
  style: StyleKey;
  featured?: boolean;
  summary: Localized;
  description: Localized[];
  services: ServiceKey[];
  cover: Photo;
  gallery: Photo[];
  /** Optional case-study blocks. Leave out any that don't apply. */
  caseStudy?: {
    brief?: Localized;
    materials?: { name: Localized; swatch: string }[];
    clientStory?: { quote: Localized; name: string };
    beforeAfter?: { before: Photo; after: Photo };
  };
};

export const projects: Project[] = [
  {
    slug: "canal-house-amsterdam",
    title: { en: "A canal house that slows down", nl: "Een grachtenpand dat tot rust komt" },
    location: "Amsterdam",
    year: 2026,
    room: "living",
    style: "warm-minimal",
    featured: true,
    summary: {
      en: "Tall ceilings, low furniture and a palette pulled from old brick and oak floors.",
      nl: "Hoge plafonds, laag meubilair en een palet ontleend aan oude baksteen en eikenhouten vloeren.",
    },
    description: [
      {
        en: "The owners of this 18th-century canal house had the bones but not the warmth. The living room felt like a waiting room: everything along the walls, nothing to gather around.",
        nl: "De eigenaren van dit achttiende-eeuwse grachtenpand hadden de basis, maar niet de warmte. De woonkamer voelde als een wachtkamer: alles langs de muren, niets om samen omheen te zitten.",
      },
      {
        en: "We pulled the seating into the centre, layered two vintage rugs and introduced a palette of clay, oat and smoked oak. The result is quieter, softer and finally feels lived in.",
        nl: "We trokken de zithoek naar het midden, legden twee vintage vloerkleden over elkaar en introduceerden een palet van klei, haver en gerookt eiken. Het resultaat is rustiger, zachter en voelt eindelijk bewoond.",
      },
    ],
    services: ["styling", "moodboard"],
    cover: unsplash("photo-1618221195710-dd6b41faaea6", ...L(), {
      en: "Living room with a curved cream sofa, terracotta accents and wooden side tables",
      nl: "Woonkamer met een gebogen crèmekleurige bank, terracotta accenten en houten bijzettafels",
    }),
    gallery: [
      unsplash("photo-1616486338812-3dadae4b4ace", ...L(), {
        en: "Seating area with linen sofa, round coffee table and woven pouf",
        nl: "Zithoek met linnen bank, ronde salontafel en gevlochten poef",
      }),
      unsplash("photo-1567016432779-094069958ea5", ...P(), {
        en: "Detail of a rust velvet sofa with pink cushion",
        nl: "Detail van een roestkleurige fluwelen bank met roze kussen",
      }),
      unsplash("photo-1583847268964-b28dc8f51f92", ...P(), {
        en: "Light sofa corner with wooden stool and framed art",
        nl: "Lichte bankhoek met houten kruk en ingelijste kunst",
      }),
      unsplash("photo-1618221195710-dd6b41faaea6", ...L(), {
        en: "Wide view of the living room toward the tall windows",
        nl: "Overzicht van de woonkamer richting de hoge ramen",
      }),
    ],
    caseStudy: {
      brief: {
        en: "Make a formal, echoing room feel intimate without losing the sense of height. Keep the family's antique cabinet and the original floors.",
        nl: "Maak van een formele, galmende ruimte een intieme plek zonder het gevoel van hoogte te verliezen. Behoud het antieke kabinet van de familie en de originele vloeren.",
      },
      materials: [
        { name: { en: "Smoked oak", nl: "Gerookt eiken" }, swatch: "#6b4a33" },
        { name: { en: "Clay plaster", nl: "Kleistuc" }, swatch: "#c08a6a" },
        { name: { en: "Oat linen", nl: "Haverkleurig linnen" }, swatch: "#e2d5c0" },
        { name: { en: "Aged brass", nl: "Verouderd messing" }, swatch: "#a8864a" },
      ],
      clientStory: {
        quote: {
          en: "We used to sit in the kitchen all evening. Now the living room is where everyone ends up.",
          nl: "Vroeger zaten we de hele avond in de keuken. Nu belandt iedereen in de woonkamer.",
        },
        name: "Femke & Joost",
      },
      beforeAfter: {
        before: unsplash("photo-1600121848594-d8644e57abab", ...L(), {
          en: "The living room before styling: grey, sparse and cool",
          nl: "De woonkamer vóór de styling: grijs, leeg en koel",
        }),
        after: unsplash("photo-1616486338812-3dadae4b4ace", ...L(), {
          en: "The living room after styling: warm, layered and inviting",
          nl: "De woonkamer na de styling: warm, gelaagd en uitnodigend",
        }),
      },
    },
  },
  {
    slug: "family-home-utrecht",
    title: { en: "Family home with a green heart", nl: "Gezinshuis met een groen hart" },
    location: "Utrecht",
    year: 2026,
    room: "living",
    style: "eclectic",
    featured: true,
    summary: {
      en: "A deep green wall, flea-market finds and plenty of space for kids, plants and books.",
      nl: "Een diepgroene muur, rommelmarktvondsten en volop ruimte voor kinderen, planten en boeken.",
    },
    description: [
      {
        en: "A busy family of five wanted a living room that could take a beating and still feel grown-up. We started with one bold decision: a deep forest-green feature wall.",
        nl: "Een druk gezin van vijf wilde een woonkamer die tegen een stootje kan en toch volwassen voelt. We begonnen met één gedurfde keuze: een diepgroene accentmuur.",
      },
      {
        en: "Around it we layered pieces the family already owned with a handful of second-hand finds, so the room feels collected rather than bought in one go.",
        nl: "Daaromheen combineerden we stukken die het gezin al had met een handvol tweedehands vondsten, zodat de kamer verzameld aanvoelt in plaats van in één keer gekocht.",
      },
    ],
    services: ["consultation", "moodboard", "styling"],
    cover: unsplash("photo-1600494603989-9650cf6ddd3d", ...L(), {
      en: "Living room with a deep green wall, gallery of prints and leather sofa",
      nl: "Woonkamer met een diepgroene muur, een wand met prints en een leren bank",
    }),
    gallery: [
      unsplash("photo-1600210492486-724fe5c67fb0", ...L(), {
        en: "Bright corner with gallery wall, rattan chair and plants",
        nl: "Lichte hoek met fotowand, rotan stoel en planten",
      }),
      unsplash("photo-1615529182904-14819c35db37", ...P(), {
        en: "Seating area with hanging rattan lamps",
        nl: "Zithoek met hangende rotan lampen",
      }),
      unsplash("photo-1594026112284-02bb6f3352fe", ...L(), {
        en: "Floating shelves styled with ceramics and books",
        nl: "Zwevende planken gestyled met keramiek en boeken",
      }),
    ],
    caseStudy: {
      materials: [
        { name: { en: "Forest green", nl: "Bosgroen" }, swatch: "#2f4a3a" },
        { name: { en: "Cognac leather", nl: "Cognac leer" }, swatch: "#8a4b2a" },
        { name: { en: "Rattan", nl: "Rotan" }, swatch: "#c9a678" },
        { name: { en: "Chalk white", nl: "Krijtwit" }, swatch: "#efe8dc" },
      ],
      clientStory: {
        quote: {
          en: "Julieta made us brave. That green wall was the best decision we've made in this house.",
          nl: "Julieta maakte ons dapper. Die groene muur is de beste beslissing die we in dit huis hebben genomen.",
        },
        name: "Sanne",
      },
    },
  },
  {
    slug: "bedroom-retreat-haarlem",
    title: { en: "A bedroom retreat in Haarlem", nl: "Een slaapkamer als toevluchtsoord in Haarlem" },
    location: "Haarlem",
    year: 2025,
    room: "bedroom",
    style: "soft-classic",
    featured: true,
    summary: {
      en: "Upholstered headboard, washed linen and a bench at the foot of the bed for slow mornings.",
      nl: "Een gestoffeerd hoofdbord, gewassen linnen en een bankje aan het voeteneind voor trage ochtenden.",
    },
    description: [
      {
        en: "This bedroom in a 1920s townhouse had beautiful light and nothing else going for it. We kept the palette soft and let texture do the work: bouclé, washed linen, a tufted headboard.",
        nl: "Deze slaapkamer in een herenhuis uit de jaren twintig had prachtig licht, maar verder weinig. We hielden het palet zacht en lieten textuur het werk doen: bouclé, gewassen linnen, een gecapitonneerd hoofdbord.",
      },
    ],
    services: ["styling"],
    cover: unsplash("photo-1505693416388-ac5ce068fe85", ...L(), {
      en: "Bedroom with a tufted cream headboard, layered linen and a bench",
      nl: "Slaapkamer met een gecapitonneerd crème hoofdbord, gelaagd linnen en een bankje",
    }),
    gallery: [
      unsplash("photo-1615874959474-d609969a20ed", ...L(), {
        en: "Bed with layered cushions beside a large window",
        nl: "Bed met gelaagde kussens naast een groot raam",
      }),
      unsplash("photo-1534349762230-e0cadf78f5da", ...P(), {
        en: "Wall shelf with small plants and framed prints",
        nl: "Wandplank met kleine planten en ingelijste prints",
      }),
      unsplash("photo-1505693416388-ac5ce068fe85", ...P(), {
        en: "Bedside detail with soft linen",
        nl: "Detail naast het bed met zacht linnen",
      }),
    ],
  },
  {
    slug: "loft-rotterdam",
    title: { en: "Warmth in a Rotterdam loft", nl: "Warmte in een Rotterdamse loft" },
    location: "Rotterdam",
    year: 2025,
    room: "bedroom",
    style: "eclectic",
    summary: {
      en: "Bringing softness to concrete and steel with rust tones, deep blue and lots of wood.",
      nl: "Zachtheid in beton en staal, met roesttinten, diepblauw en veel hout.",
    },
    description: [
      {
        en: "An open-plan loft with great windows and very little comfort. We zoned the sleeping area with a low platform bed, a pair of leather benches and a bold piece of art.",
        nl: "Een open loft met geweldige ramen en weinig comfort. We maakten een aparte slaapzone met een laag bed, twee leren bankjes en een uitgesproken kunstwerk.",
      },
    ],
    services: ["consultation", "styling"],
    cover: unsplash("photo-1540518614846-7eded433c457", ...L(), {
      en: "Loft bedroom with a navy bed, two leather benches and orange artwork",
      nl: "Loftslaapkamer met een donkerblauw bed, twee leren bankjes en een oranje kunstwerk",
    }),
    gallery: [
      unsplash("photo-1616486338812-3dadae4b4ace", ...P(), {
        en: "Lounge corner of the loft with low seating",
        nl: "Loungehoek van de loft met lage zitjes",
      }),
      unsplash("photo-1616594039964-ae9021a400a0", ...L(), {
        en: "Dark bedroom with velvet headboard and pendant lights",
        nl: "Donkere slaapkamer met fluwelen hoofdbord en hanglampen",
      }),
      unsplash("photo-1600607687939-ce8a6c25118c", ...L(), {
        en: "Open living area with wooden wall and large windows",
        nl: "Open woonruimte met houten wand en grote ramen",
      }),
    ],
  },
  {
    slug: "dining-room-den-haag",
    title: { en: "Long dinners in Den Haag", nl: "Lange diners in Den Haag" },
    location: "Den Haag",
    year: 2025,
    room: "dining",
    style: "vintage-modern",
    featured: true,
    summary: {
      en: "Emerald velvet chairs, a long oak table and art that starts conversations.",
      nl: "Smaragdgroene fluwelen stoelen, een lange eikenhouten tafel en kunst die gesprekken op gang brengt.",
    },
    description: [
      {
        en: "Our clients love to host, but their dining room felt like an afterthought. We gave the table room to breathe, added velvet seating that invites lingering and hung art at eye level for those who stay seated.",
        nl: "Onze klanten ontvangen graag gasten, maar hun eetkamer voelde als bijzaak. We gaven de tafel ruimte, kozen fluwelen stoelen die uitnodigen om te blijven zitten en hingen de kunst op ooghoogte voor wie aan tafel zit.",
      },
    ],
    services: ["moodboard", "styling"],
    cover: unsplash("photo-1617806118233-18e1de247200", ...L(), {
      en: "Dining room with emerald velvet chairs around an oak table",
      nl: "Eetkamer met smaragdgroene fluwelen stoelen rond een eikenhouten tafel",
    }),
    gallery: [
      unsplash("photo-1538688525198-9b88f6f53126", ...L(), {
        en: "Lounge and dining area with leather chairs and brick walls",
        nl: "Lounge- en eethoek met leren stoelen en bakstenen muren",
      }),
      unsplash("photo-1586023492125-27b2c045efd7", ...P(), {
        en: "Mustard armchair beside a dark cabinet",
        nl: "Okergele fauteuil naast een donkere kast",
      }),
      unsplash("photo-1534349762230-e0cadf78f5da", ...P(), {
        en: "Wall shelf styled with plants",
        nl: "Wandplank gestyled met planten",
      }),
    ],
    caseStudy: {
      materials: [
        { name: { en: "Emerald velvet", nl: "Smaragdgroen fluweel" }, swatch: "#1f4d3f" },
        { name: { en: "Oiled oak", nl: "Geolied eiken" }, swatch: "#a77b4f" },
        { name: { en: "Oxblood", nl: "Ossenbloed" }, swatch: "#5e1d1d" },
      ],
    },
  },
  {
    slug: "apartment-leiden",
    title: { en: "An open kitchen in Leiden", nl: "Een open keuken in Leiden" },
    location: "Leiden",
    year: 2024,
    room: "kitchen",
    style: "warm-minimal",
    summary: {
      en: "A crisp new kitchen softened with wood, woven textures and a lived-in dining corner.",
      nl: "Een strakke nieuwe keuken verzacht met hout, gevlochten texturen en een bewoonde eethoek.",
    },
    description: [
      {
        en: "The renovation was finished but the apartment still felt like a showroom. Styling brought in the life: wooden stools, open shelving with everyday ceramics and a reading corner by the window.",
        nl: "De verbouwing was klaar, maar het appartement voelde nog als een showroom. Met styling kwam het leven erin: houten krukken, open planken met dagelijks keramiek en een leeshoek bij het raam.",
      },
    ],
    services: ["consultation", "styling"],
    cover: unsplash("photo-1484154218962-a197022b5858", ...L(), {
      en: "Open kitchen with white cabinets, black pendant lights and wooden stools",
      nl: "Open keuken met witte kasten, zwarte hanglampen en houten krukken",
    }),
    gallery: [
      unsplash("photo-1493809842364-78817add7ffb", ...L(), {
        en: "Living area next to the kitchen with plants and a blue sofa",
        nl: "Woongedeelte naast de keuken met planten en een blauwe bank",
      }),
      unsplash("photo-1522708323590-d24dbb6b0267", ...P(), {
        en: "Dining corner with wooden table and window light",
        nl: "Eethoek met houten tafel en daglicht",
      }),
      unsplash("photo-1524758631624-e2822e304c36", ...P(), {
        en: "Reading corner with a lounge chair and floor lamp",
        nl: "Leeshoek met een loungestoel en staande lamp",
      }),
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function t(value: Localized, locale: Locale) {
  return value[locale];
}
