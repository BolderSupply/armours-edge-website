import { defineArrayMember, defineField, defineType } from "sanity";
import { services } from "../../lib/services";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "story", title: "The story" },
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
      name: "brief",
      title: "The brief: what the client wanted",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] })],
    }),
    defineField({
      name: "solution",
      title: "The solution: what we built",
      type: "array",
      group: "story",
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
      title: "Gallery photos",
      type: "array",
      group: "photos",
      description: "Add 5 to 10 photos. Include before photos if you have them.",
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
