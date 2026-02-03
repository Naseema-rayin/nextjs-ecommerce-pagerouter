const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchProducts error:", err);
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("fetchProductById error:", err);
    return null;
  }
}

export async function fetchCategoryPreview(category: string, limit = 4) {
  try {
    const res = await fetch(
      `${BASE_URL}/products/category/${category}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch category preview:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, limit) : [];
  } catch (err) {
    console.error("fetchCategoryPreview error:", err);
    return [];
  }
}