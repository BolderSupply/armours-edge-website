import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "photos", title: "Home page photos", default: true },
    { name: "contact", title: "Contact details" },
  ],
  fields: [
    defineField({
      name: "heroImage",
      title: "Home page hero photo",
      type: "image",
      group: "photos",
      description:
        "Big photo behind the home page headline. Use a wide, bright photo of your best finished work (at least 2400 px wide).",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
    }),
    defineField({
      name: "bannerImage",
      title: "Banner photo",
      type: "image",
      group: "photos",
      description: 'Photo behind the "Picture it. We\'ll build it to last." banner on the home page.',
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      group: "contact",
      description: "Shown in the top bar and footer. Leave empty to hide.",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "contact",
      description: "Defaults to info@armoursedge.ca if left empty.",
    }),
    defineField({
      name: "address",
      title: "Business address (optional)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "serviceArea",
      title: "Areas you serve",
      type: "string",
      group: "contact",
      description: 'For example "Kitchener, Waterloo, Cambridge and area". Shown in the footer.',
    }),
    defineField({ name: "instagram", title: "Instagram link", type: "url", group: "contact" }),
    defineField({ name: "facebook", title: "Facebook link", type: "url", group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
