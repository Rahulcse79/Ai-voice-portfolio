import Image from "next/image";

type PhotoItem = {
  name: string;
  src: string;
  alt?: string;
};

const PHOTOS: PhotoItem[] = [
  { name: "GitHub", src: "/assets/images/photos/github.png" },
  { name: "LeetCode", src: "/assets/images/photos/leetcode.png" },
  { name: "LinkedIn", src: "/assets/images/photos/linkedin.png" },
];

function toAltText(photo: PhotoItem) {
  return photo.alt ?? `${photo.name} image`;
}

export default function Photos() {
  return (
    <section className="py-10 mt-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={photo.src}
                  alt={toAltText(photo)}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>

              <figcaption className="flex items-center justify-between gap-3 p-4">
                <div>
                  <div className="font-medium">{photo.name}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
