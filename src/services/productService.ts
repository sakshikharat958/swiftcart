import type { Product } from "../types/product";

const API_URL =
  "https://fakestoreapi.com/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Unable to fetch products"
    );
  }

  return response.json();
}

export async function getProductById(
  id: string
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/${id}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to fetch product"
    );
  }

  return response.json();
}