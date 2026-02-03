import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    alt: "Electronics Banner",
  },
  {
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    alt: "Fashion Banner",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="position-relative mb-4" style={{ height: "350px" }}>
      <Image
        src={images[index].url}
        alt={images[index].alt}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}