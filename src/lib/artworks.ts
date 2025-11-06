import type { Artwork } from "@/lib/types";
import { ARTWORKS } from "@/content/artworks";

export const getAllArtworks = (): readonly Artwork[] => ARTWORKS;

export const getArtworksBySlug = (slug: string): Artwork | undefined => {
  return ARTWORKS.find((artwork) => artwork.slug === slug);
};
