"use client";
import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/types";
import { getAllArtworks } from "@/lib/artworks";

export default function HomePage() {
  const artworks: readonly Artwork[] = getAllArtworks();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork: Artwork) => (
          <Link href={`gartwork/${artwork.slug}`} key={artwork.id}>
            <div className="bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={artwork.imageUrl}
                alt={artwork.name}
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {artwork.name}
                </h2>
                <p className="text-white">{artwork.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
