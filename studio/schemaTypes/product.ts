import { defineField, defineType } from "sanity";

// Must match the category names the website uses (src/data/categories.ts).
const CATEGORY_OPTIONS = [
  "Bags",
  "Cosplay Costumes",
  "Thrift Store",
  "Little Somethings",
  "Clothing",
  "Hair Bows",
  "Lip Balm Holders",
  "Scrunchies",
  "Kindle Cases",
  "Home Goods",
];

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: 'Click "Generate". Do not change this after the product has been published.',
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (₹)",
      description: "Just the number, for example 849",
      type: "number",
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: "images",
      title: "Photos",
      description: "The first photo is the main one. Extra photos appear as a swipe gallery.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.required().min(1).max(8),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORY_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "outOfStock",
      title: "Sold out?",
      description: "Turn on to show an Out of Stock label and block ordering.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isNewArrival",
      title: "Show in New Arrivals on the home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFanFavourite",
      title: "Mark as Fan Favourite",
      type: "boolean",
      initialValue: false,
    }),
    // Used only to keep the original order of migrated products. Hidden from the client.
    defineField({ name: "sortOrder", title: "Sort order", type: "number", hidden: true }),
  ],
  preview: {
    select: { title: "title", price: "price", category: "category", media: "images.0" },
    prepare({ title, price, category, media }) {
      return {
        title,
        subtitle: [price ? `₹${price}` : null, category].filter(Boolean).join("  ·  "),
        media,
      };
    },
  },
});
