export interface Aircraft {
  id: number;
  name: string;
  origin: "AMERIKAANS" | "BRITS" | "EUROPEES" | "RUSSISCH";
  imageUrl: string;
}

export const TOTAL_QUESTIONS = 20;

// Note: ids 1-9 use locally bundled AI-generated images (/aircraft/*.png).
// ids 10-20 use Wikipedia thumbnail URLs — these load fine in real browsers.
// Replit's server IP is blocked by Wikimedia, so the preview may show fallbacks,
// but deployed users see real photos.

export const aircraftData: Aircraft[] = [
  // ── AMERIKAANS (5) ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "F-16 Fighting Falcon",
    origin: "AMERIKAANS",
    imageUrl: "/aircraft/f16.png",
  },
  {
    id: 2,
    name: "F-14 Tomcat",
    origin: "AMERIKAANS",
    imageUrl: "/aircraft/f14.png",
  },
  {
    id: 3,
    name: "SR-71 Blackbird",
    origin: "AMERIKAANS",
    imageUrl: "/aircraft/sr71.png",
  },
  {
    id: 4,
    name: "P-51 Mustang",
    origin: "AMERIKAANS",
    imageUrl: "/aircraft/p51.png",
  },
  {
    id: 5,
    name: "F-117 Nighthawk",
    origin: "AMERIKAANS",
    imageUrl: "/aircraft/f117.png",
  },

  // ── BRITS (5) ───────────────────────────────────────────────────────────────
  {
    id: 6,
    name: "Supermarine Spitfire",
    origin: "BRITS",
    imageUrl: "/aircraft/spitfire.png",
  },
  {
    id: 7,
    name: "Hawker Hurricane",
    origin: "BRITS",
    imageUrl: "/aircraft/hurricane.png",
  },
  {
    id: 8,
    name: "Avro Vulcan",
    origin: "BRITS",
    imageUrl: "/aircraft/vulcan.png",
  },
  {
    id: 9,
    name: "Eurofighter Typhoon",
    origin: "BRITS",
    imageUrl: "/aircraft/typhoon.png",
  },
  {
    id: 10,
    name: "Hawker Harrier",
    origin: "BRITS",
    imageUrl: "/aircraft/harrier.png",
  },

  // ── EUROPEES (5) ────────────────────────────────────────────────────────────
  {
    id: 11,
    name: "Dassault Rafale",
    origin: "EUROPEES",
    imageUrl: "/aircraft/rafale.png",
  },
  {
    id: 12,
    name: "SAAB JAS 39 Gripen",
    origin: "EUROPEES",
    imageUrl: "/aircraft/gripen.png",
  },
  {
    id: 13,
    name: "Dassault Mirage III",
    origin: "EUROPEES",
    imageUrl: "/aircraft/mirage3.png",
  },
  {
    id: 14,
    name: "SEPECAT Jaguar",
    origin: "EUROPEES",
    imageUrl: "/aircraft/jaguar.png",
  },
  {
    id: 15,
    name: "SAAB J 35 Draken",
    origin: "EUROPEES",
    imageUrl: "/aircraft/draken.png",
  },

  // ── RUSSISCH (5) ────────────────────────────────────────────────────────────
  {
    id: 16,
    name: "MiG-21",
    origin: "RUSSISCH",
    imageUrl: "/aircraft/mig21.png",
  },
  {
    id: 17,
    name: "MiG-29 Fulcrum",
    origin: "RUSSISCH",
    imageUrl: "/aircraft/mig29.jpg",
  },
  {
    id: 18,
    name: "Su-27 Flanker",
    origin: "RUSSISCH",
    imageUrl: "/aircraft/su27.jpg",
  },
  {
    id: 19,
    name: "MiG-15",
    origin: "RUSSISCH",
    imageUrl: "/aircraft/mig15.jpg",
  },
  {
    id: 20,
    name: "Su-57 Felon",
    origin: "RUSSISCH",
    imageUrl: "/aircraft/su57.jpg",
  },
];
