const BASE_URL = "https://fakestoreapi.com";

// Shared headers to avoid 403 on Vercel
const defaultHeaders = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json",
};

export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: defaultHeaders,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data)
      ? data.map((p) => ({
          ...p,
          image: p.image?.replace("http://", "https://"),
        }))
      : [];
  } catch (err) {
    console.error("fetchProducts error:", err);
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      headers: defaultHeaders,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    const data = await res.json();

    return {
      ...data,
      image: data.image?.replace("http://", "https://"),
    };
  } catch (err) {
    console.error("fetchProductById error:", err);
    return null;
  }
}

export async function fetchCategoryPreview(category: string, limit = 4) {
  try {
    const res = await fetch(`${BASE_URL}/products/category/${category}`, {
      headers: defaultHeaders,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch category preview:", res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data)
      ? data.slice(0, limit).map((p) => ({
          ...p,
          image: p.image?.replace("http://", "https://"),
        }))
      : [];
  } catch (err) {
    console.error("fetchCategoryPreview error:", err);
    return [];
  }
}