# Personal Care Store with Sales Assistant (frontend)

## The store

An online store for personal care products (face, body, hair, sun care, fragrance, oral care and more) built with Next.js. Customers can browse categories and campaigns, search with filters, open product pages, use a cart that works for guests and signed-in users, and place orders. Products, carts and customers live in **commercetools**, page content and translations are managed in **Sanity CMS**, sign-in is handled with **Better Auth**, and the interface is multilingual (next-intl).

## Sales Assistant

On top of the store sits **Sales Assistant**, an AI chat assistant for store employees. An employee describes a customer's need by voice or text, and the assistant shows matching products from the catalog, so they can recommend a wider range and know the assortment better. It is the main focus of this repository.

This is the frontend of an internal training project built as a team at Columbus. The AI/RAG part and the product API live in separate backend services; this repository contains only the web application.

> **Important:** the main part of this project, the Sales Assistant feature, only works with special requirements: access to the separate backend services (the AI assistant and product search APIs) and the related credentials, which are not part of this repository. You can browse and read the code, but running the feature yourself is not possible without them. The screenshots and the demo video below show how it works.
>
> The live demo depends on the same backend services and may be switched off at some point. If it no longer responds, see the screenshots and the demo video.

<!-- TODO: add screenshots and demo video here -->

## What it does

- **Voice and text input** for describing what a customer is looking for (Web Speech API, multiple languages, microphone permission handling, unsupported-browser fallback)
- **Chat interface** that shows each request, the recognized keywords as tags, and the matching products in a grid
- **Chat session history** restored when returning from a product page, together with the scroll position
- **Chat behavior details**: auto-scroll to the latest request, scroll-to-bottom button, loading and error states
- Responsive UI

## Tech stack

Next.js (App Router), React 19, TypeScript, Chakra UI, next-intl, Sanity CMS, commercetools, Web Speech API, react-hook-form + Zod, Cypress, Biome

## Getting started

### 1. Environment

Copy `.env.local.template` to `.env.local` and fill in the values. By default `SANITY_SOURCE="local"` is set, so page content is read from the bundled JSON files in `src/sanity/backup` and no Sanity account is needed. To use your own Sanity project, remove that line and provide the Sanity variables.

The chat itself needs the Sales Assistant API URLs (`SALES_ASSISTANT_*`) and commercetools credentials, which are not included in this repository.

### 2. Install and run

```bash
yarn install
yarn dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### 3. Build

```bash
yarn build
```

## Commit convention

Commits follow [conventional commits](https://www.conventionalcommits.org/) and are enforced with commitlint and a husky pre-commit hook (`<type>[scope]: <description>`).
