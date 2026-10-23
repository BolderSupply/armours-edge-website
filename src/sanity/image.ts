import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";
import type { SanityImage } from "./queries";

const builder = createImageUrlBuilder({ projectId, dataset });

/** A cropped, optimised image URL (respects the hotspot set in the Studio). */
export function imageUrl(source: SanityImage, width: number, height?: number) {
  let b = builder.image(source).width(width).auto("format").quality(80);
  if (height) b = b.height(height).fit("crop");
  return b.url();
}

/** Natural width and height, parsed from the asset reference (image-<id>-<w>x<h>-<ext>). */
export function imageSize(source: SanityImage): { width: number; height: number } {
  const match = source.asset?._ref.match(/-(\d+)x(\d+)-/);
  if (!match) return { width: 1600, height: 1200 };
  return { width: Number(match[1]), height: Number(match[2]) };
}
