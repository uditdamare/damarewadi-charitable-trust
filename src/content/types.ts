// Shared shapes for local placeholder content.
// These mirror the Supabase table shapes in docs/04-database-schema.md so swapping
// these hardcoded arrays for real Supabase queries later is a drop-in replacement,
// not a redesign.

export type PositionKey =
  | "adhyaksh"
  | "upadhyaksh"
  | "sachiv"
  | "up_sachiv"
  | "khajindaar"
  | "up_khajindaar"
  | "sadasya";

export type CommitteeMember = {
  id: string;
  fullName: string | null; // Devanagari name; null = not supplied yet, render a placeholder
  fullNameEn?: string; // transliterated name, shown on the /en locale
  positionKey: PositionKey;
  photoPath: string | null;
  displayOrder: number;
};

export type InitiativeImage = {
  path: string;
  caption?: string;
};

export type Initiative = {
  slug: string;
  messageKey: string; // key under the "initiatives" namespace in messages/*.json
  coverImagePath: string;
  images: InitiativeImage[];
  initiativeStatus: "ongoing" | "completed";
};

export type TrustSettings = {
  contactEmail: string;
  contactPhone: string;
  registrationNumber: string | null;
  panNumber: string | null;
  foundedYear: number | null;
  registeredAddress: string | null;
  mapLatitude: number | null;
  mapLongitude: number | null;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
};
