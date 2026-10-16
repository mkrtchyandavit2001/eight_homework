"use client";

import { useState } from "react";

interface CourseImageProps {
  src: string;
  alt: string;
}

export default function CourseImage({ src, alt }: CourseImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="h-[130px] w-[180px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#FDE4D8] to-[#F15A22]/30">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
