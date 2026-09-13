/* eslint-disable @next/next/no-img-element -- upload/demo-paden; optimalisatie niet nodig. */
"use client";

import { useState } from "react";
import { parseImages } from "@/lib/occasion";

export function Gallery({ images }: { images: string }) {
  const all = parseImages(images);
  const items = all.length > 0 ? all : ["/images/showroom.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded-xl bg-sand shadow-1 sm:h-96">
        <img
          src={items[active]}
          alt={`Foto ${active + 1} van ${items.length}`}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-md bg-brand-dark/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {active + 1} / {items.length}
        </span>
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {items.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Afbeelding ${index + 1} tonen`}
              aria-current={index === active}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-sand transition duration-fast sm:w-24 ${
                index === active ? "border-accent" : "border-transparent hover:border-brand/40"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}