import { notFound } from "next/navigation";
import { getArtworkBySlug, getAllArtworks } from "@/lib/artworks";

export async function generateStaticParams() {
  const artworks = getAllArtworks();
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <img
        src={artwork.imageUrl}
        alt={artwork.name}
        className="h-full w-auto max-w-none"
      />
    </div>
  );
}
