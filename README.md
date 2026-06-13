# SwiftCart

A responsive e-commerce application built with React, TypeScript, SCSS Modules, React Router, and Context API.

## Live Demo

https://swiftcart-six-ebon.vercel.app/

## Features

- Product Listing Page
- Product Detail Page
- Variant Selection (Color & Size)
- Cart Drawer
- Checkout Page
- Responsive Design
- Cart Persistence using localStorage
- Deep-linkable product variants using URL parameters

## Tech Stack

- React
- TypeScript
- SCSS Modules
- React Router
- Context API
- Vite
- Fake Store API

## Setup

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Design Decisions

- Context API was used for cart state management because the application only requires a small amount of shared global state.
- localStorage is used to persist cart data across page refreshes.
- Product variants are stored in URL query parameters to support deep-linking.

## Known Trade-offs

- Fake Store API provides only one image per product, so thumbnail images are simulated.
- Fake Store API does not provide inventory or brand information, therefore stock levels are mocked for demonstration purposes.
