// /lib/productsService.ts

const BASE_URL = "https://dummyjson.com";

// Shared headers to avoid 403 on Vercel
const defaultHeaders = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json",
};

// Safe fetch wrapper
async function safeFetch(url: string) {
  try {
    const res = await fetch(url, {
      headers: defaultHeaders,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API returned non-OK:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    return null;
  }
}

// All categories we want to merge
const ALL_CATEGORIES = [
  "smartphones",
  "laptops",
  "fragrances",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "bottoms",
  "shoes",
];

// Normalize image fields
function normalizeProduct(p: any) {
  return {
    ...p,
    image:
      p.thumbnail ||
      p.images?.[0] ||
      p.productImages?.[0] ||
      p.productImage ||
      p.image ||
      "/placeholder.png",
  };
}

// Fetch products (with optional category)
export async function fetchProducts(category?: string) {
  if (category) {
    const decoded = decodeURIComponent(category);
    const data = await safeFetch(`${BASE_URL}/products/category/${decoded}`);
    if (!data) return [];
    return data.products.map(normalizeProduct);
  }

  // Fetch ALL categories and merge
  const results = await Promise.all(
    ALL_CATEGORIES.map((cat) =>
      safeFetch(`${BASE_URL}/products/category/${cat}`)
    )
  );

  const merged = results.flatMap((d) => d?.products || []);
  return merged.map(normalizeProduct);
}

// Fetch single product
export async function fetchProductById(id: string) {
  const data = await safeFetch(`${BASE_URL}/products/${id}`);
  if (!data) return null;
  return normalizeProduct(data);
}

// Fetch preview for homepage
export async function fetchCategoryPreview(category: string, limit = 4) {
  const decoded = decodeURIComponent(category);
  const data = await safeFetch(`${BASE_URL}/products/category/${decoded}`);
  if (!data) return [];
  return data.products.slice(0, limit).map(normalizeProduct);
}