import { defineArrayMember, defineField, defineType } from "sanity";
import { services } from "../../lib/services";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "story", title: "The story" },
    { name: "process", title: "Before & after, process" },
    { name: "photos", title: "Photos" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      group: "overview",
      description: 'A short, descriptive name, e.g. "Natural stone patio and retaining wall".',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Web address (slug)",
      type: "slug",
      group: "overview",
      description: 'Click "Generate". This becomes the page address.',
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceType",
      title: "Service type",
      type: "string",
      group: "overview",
      description: "Used to filter the project gallery.",
      options: {
        list: services.map((s) => ({ title: s.title, value: s.slug })),
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "town",
      title: "Town / city",
      type: "string",
      group: "overview",
      description: "Town or city only. Do not enter street addresses.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completedOn",
      title: "Completed",
      type: "date",
      group: "overview",
      description: "Month and year is fine, pick any day in that month.",
      options: { dateFormat: "MMMM YYYY" },
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      group: "overview",
      description: "Feature up to three of your best projects on the home page.",
      initialValue: false,
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 3,
      group: "overview",
      description: "One or two sentences shown on project cards and in search results.",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "highlights",
      title: "At a glance (optional)",
      type: "array",
      group: "overview",
      description: 'Up to 3 quick facts shown in a strip under the cover photo, e.g. "Size: 1,200 sq ft" or "Time on site: 5 weeks".',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(24) }),
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required().max(32) }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "brief",
      title: "The ask: what the client wanted",
      type: "array",
      group: "story",
      description: "One or two short paragraphs. This goes in this box only. What you built goes in the next box.",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] })],
    }),
    defineField({
      name: "solution",
      title: "What we built",
      type: "array",
      group: "story",
      description: "Keep it to two or three short paragraphs. The photos and process steps tell the rest of the story.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
        }),
      ],
    }),
    defineField({
      name: "materials",
      title: "Materials used",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "clientQuote",
      title: "Client quote (optional)",
      type: "text",
      rows: 3,
      group: "story",
      description: "Only add this with the client's permission.",
    }),
    defineField({
      name: "transformations",
      title: "Before and after",
      type: "array",
      group: "process",
      description:
        "Visitors drag a slider to compare. Use a before and an after photo taken from the same spot and angle.",
      of: [
        defineArrayMember({
          type: "object",
          name: "transformation",
          fields: [
            defineField({ name: "label", title: "Label (optional)", type: "string", description: 'e.g. "Back patio"' }),
            defineField({
              name: "before",
              title: "Before photo",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "after",
              title: "After photo",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", media: "after" }, prepare: ({ title, media }) => ({ title: title || "Before and after", media }) },
        }),
      ],
    }),
    defineField({
      name: "stages",
      title: "Build stages",
      type: "array",
      group: "process",
      description:
        'The steps of the build in order, each with a few photos. Example: "The starting point", "Design and layout", "Excavation and base", "Walls and steps", "Laying the pavers", "Finishing touches". This is what shows clients the effort behind the work.',
      of: [
        defineArrayMember({
          type: "object",
          name: "stage",
          fields: [
            defineField({ name: "title", title: "Stage name", type: "string", validation: (rule) => rule.required().max(60) }),
            defineField({
              name: "description",
              title: "What happened (one or two sentences)",
              type: "text",
              rows: 3,
              validation: (rule) => rule.max(260),
            }),
            defineField({
              name: "photos",
              title: "Photos (1 to 4)",
              type: "array",
              validation: (rule) => rule.min(1).max(4),
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
                }),
              ],
              options: { layout: "grid" },
            }),
          ],
          preview: {
            select: { title: "title", media: "photos.0" },
            prepare: ({ title, media }) => ({ title, media }),
          },
        }),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "image",
      group: "photos",
      description: "The best photo of the finished project. Shown on cards and at the top of the page.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          type: "string",
          description: 'Short description for accessibility and search, e.g. "Curved stone patio with fire pit".',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      group: "photos",
      title: "More photos",
      description: "Extra finished-project photos. They show as a photo wall that opens full screen. Before photos and build steps go in the other tab.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Describe the photo", type: "string" }),
            defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
          ],
        }),
      ],
      options: { layout: "grid" },
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "completedDesc",
      by: [{ field: "completedOn", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "town", media: "coverImage" },
  },
});
