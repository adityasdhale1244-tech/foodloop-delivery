# FoodLoop

A responsive food-discovery and ordering experience built with Next.js, React, and Lucide icons.

## Live website

**[Open FoodLoop](https://foodloop-delivery.vercel.app/)**

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fadityasdhale1244-tech%2Ffoodloop-delivery)

Import this GitHub repository into Vercel and deploy it using the detected Next.js settings. The live deployment is [foodloop-delivery.vercel.app](https://foodloop-delivery.vercel.app/). Once the repository is connected, pushes to the production branch trigger deployments automatically.

## Run locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify a production build locally:

```bash
npm run build
npm start
```

## Features

- Restaurant discovery with cuisine filters and live search
- Food and restaurant photography sourced from Unsplash
- Trending-dish carousel, favourites, promo interaction, and delivery sorting
- Interactive cart with quantity controls, delivery fee calculation, discount, and checkout confirmation
- Responsive layout for mobile, tablet, and desktop

Restaurant content and checkout are currently demo data/client-side interactions; no real orders or payments are processed. Add a database and authenticated order API before accepting real customer orders. Images load from Unsplash and require an internet connection.
