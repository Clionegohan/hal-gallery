import { getAllArtworks } from "@/lib/artworks";

export default function HomePage() {
  const artworks = getAllArtworks();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Art</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {artwork.name}
              </h2>
              <p className="text-white">{artwork.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
