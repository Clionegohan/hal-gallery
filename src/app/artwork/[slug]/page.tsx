import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtworksBySlug, getAllArtworks } from "@/lib/artworks";

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
  const artwork = getArtworksBySlug(slug);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-zinc-900 p-8 md:p-12 rounded-lg shadow-2xl">
        <div className="relative aspect-[4/3] w-full bg-zinc-50 rounded">
          <Image
            src={artwork.imageUrl}
            alt={artwork.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="mt-8 text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-white">
          {artwork.name}
        </h1>
        <div className="h-px bg-zinc-700 w-24 mx-auto"></div>
        <p className="text-zinc-300 text-lg leading-relaxed">
          {artwork.description}
        </p>
      </div>
    </div>
  );
}
