/** Plain, already-resolved data the project page components render. */
export type Img = {
  /** Display URL (may be cropped to the layout). */
  src: string;
  /** Large, uncropped URL for the full-screen viewer. */
  full: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type StageView = { title: string; description?: string; photos: Img[] };
export type TransformationView = { label?: string; before: Img; after: Img };

export type ProjectView = {
  title: string;
  summary: string;
  town: string;
  serviceTitle?: string;
  completed?: string;
  cover?: Img;
  highlights: { label: string; value: string }[];
  stats: { label: string; value: string }[];
  brief?: import("next-sanity").PortableTextBlock[];
  solution?: import("next-sanity").PortableTextBlock[];
  materials: string[];
  clientQuote?: string;
  transformations: TransformationView[];
  stages: StageView[];
  gallery: Img[];
};
