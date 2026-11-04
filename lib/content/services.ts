import type { Localized } from "@/lib/i18n/config";

export type ServiceKey = "consultation" | "moodboard" | "styling";

export type Service = {
  key: ServiceKey;
  name: Localized;
  short: Localized;
  description: Localized;
  /** Price in euros incl. VAT, shown as "from €…". Null means "on request". */
  priceFrom: number | null;
  unit?: Localized;
  includes: Localized[];
};

/**
 * Prices are sensible defaults for the Dutch market and can be changed here.
 */
export const services: Service[] = [
  {
    key: "consultation",
    name: { en: "Consultation", nl: "Adviesgesprek" },
    short: {
      en: "A two-hour visit at your home with honest, practical advice you can act on right away.",
      nl: "Een bezoek van twee uur bij jou thuis, met eerlijk en praktisch advies waar je direct mee aan de slag kunt.",
    },
    description: {
      en: "We walk through your home together, talk about how you live and what isn't working, and I give you clear advice on layout, colour, lighting and what to keep. Afterwards you receive a short written summary with my recommendations.",
      nl: "We lopen samen door je huis, praten over hoe je woont en wat nog niet werkt, en ik geef je helder advies over indeling, kleur, verlichting en wat je kunt houden. Na afloop ontvang je een korte schriftelijke samenvatting met mijn aanbevelingen.",
    },
    priceFrom: 175,
    unit: { en: "per visit", nl: "per bezoek" },
    includes: [
      { en: "Two hours at your home", nl: "Twee uur bij jou thuis" },
      { en: "Advice on layout, colour and light", nl: "Advies over indeling, kleur en licht" },
      { en: "Written summary within a week", nl: "Schriftelijke samenvatting binnen een week" },
    ],
  },
  {
    key: "moodboard",
    name: { en: "Mood board & design plan", nl: "Moodboard & stylingplan" },
    short: {
      en: "A complete visual plan for one room: palette, materials and a shoppable list.",
      nl: "Een compleet visueel plan voor één ruimte: kleurenpalet, materialen en een shoplijst.",
    },
    description: {
      en: "Based on a home visit and your wishes, I create a mood board with colour palette, material samples, furniture and accessories, plus a floor plan and a shopping list with links. You can carry it out yourself, at your own pace.",
      nl: "Op basis van een huisbezoek en jouw wensen maak ik een moodboard met kleurenpalet, materiaalstalen, meubels en accessoires, plus een plattegrond en een shoplijst met links. Zo kun je het zelf uitvoeren, in je eigen tempo.",
    },
    priceFrom: 495,
    unit: { en: "per room", nl: "per ruimte" },
    includes: [
      { en: "Home visit and intake", nl: "Huisbezoek en intake" },
      { en: "Mood board, palette and material samples", nl: "Moodboard, kleurenpalet en materiaalstalen" },
      { en: "Floor plan and shopping list", nl: "Plattegrond en shoplijst" },
      { en: "One round of revisions", nl: "Eén feedbackronde" },
    ],
  },
  {
    key: "styling",
    name: { en: "Full styling", nl: "Volledige styling" },
    short: {
      en: "From plan to final cushion: I source, coordinate and style the room for you.",
      nl: "Van plan tot laatste kussen: ik zoek, regel en style de ruimte voor je.",
    },
    description: {
      en: "The full service. I design the plan, source furniture, vintage pieces and accessories, coordinate deliveries and tradespeople, and style everything on installation day. You come home to a finished room.",
      nl: "De complete service. Ik maak het plan, zoek meubels, vintage stukken en accessoires, coördineer leveringen en vakmensen en style alles op de inrichtingsdag. Jij komt thuis in een afgeronde ruimte.",
    },
    priceFrom: null,
    includes: [
      { en: "Everything in the design plan", nl: "Alles uit het stylingplan" },
      { en: "Sourcing, ordering and coordination", nl: "Inkoop, bestellingen en coördinatie" },
      { en: "Styling day and final reveal", nl: "Stylingdag en oplevering" },
    ],
  },
];

export const process: { title: Localized; text: Localized }[] = [
  {
    title: { en: "Get to know", nl: "Kennismaken" },
    text: {
      en: "A short call or message to understand your home, your plans and your budget.",
      nl: "Een kort gesprek of bericht om je huis, je plannen en je budget te begrijpen.",
    },
  },
  {
    title: { en: "Visit", nl: "Bezoek" },
    text: {
      en: "I come to your home to see the light, the space and the things you love.",
      nl: "Ik kom bij je thuis om het licht, de ruimte en de dingen waar je van houdt te zien.",
    },
  },
  {
    title: { en: "Plan", nl: "Plan" },
    text: {
      en: "A mood board and design plan that pulls it all together.",
      nl: "Een moodboard en stylingplan dat alles samenbrengt.",
    },
  },
  {
    title: { en: "Style", nl: "Stylen" },
    text: {
      en: "Do it yourself with the plan, or let me source and style it for you.",
      nl: "Zelf aan de slag met het plan, of laat mij het voor je inkopen en stylen.",
    },
  },
];

export function formatPrice(amount: number, locale: "en" | "nl") {
  return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
