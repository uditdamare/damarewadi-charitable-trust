import type { Initiative } from "./types";

const BASE = "/images/initiatives/temple-rebuild";

export const initiatives: Initiative[] = [
  {
    slug: "temple-rebuild",
    messageKey: "templeRebuild",
    coverImagePath: `${BASE}/photo-01.jpeg`,
    initiativeStatus: "ongoing",
    images: Array.from({ length: 15 }, (_, i) => ({
      path: `${BASE}/photo-${String(i + 1).padStart(2, "0")}.jpeg`,
    })),
  },
];
