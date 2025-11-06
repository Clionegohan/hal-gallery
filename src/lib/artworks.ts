import type { Artwork } from "@/lib/types";
import { ARTWORKS } from "@/content/artworks";

export const getAllArtworks = (): readonly Artwork[] => ARTWORKS;
