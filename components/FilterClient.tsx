import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function FilterClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const category = router.query.category as string | undefined;

  const [filtered, setFiltered] = useState<Product[]>(products);

  useEffect(() => {
    if (!category) {
      setFiltered(products);
      return;
    }

    const decoded = decodeURIComponent(category).toLowerCase().trim();

    setFiltered(
      products.filter(
        (p) => p.category.toLowerCase().trim() === decoded
      )
    );
  }, [category, products]);

  const handleCategoryClick = (cat: string | null) => {
    if (!cat) {
      router.push("/products");
    } else {
      router.push(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div>
      {/* Category Buttons */}
      <div className="mb-3">
        <button onClick={() => handleCategoryClick(null)} className="btn btn-link me-3">
          All
        </button>
        <button onClick={() => handleCategoryClick("smartphones")} className="btn btn-link me-3">
          Smartphones
        </button>
        <button onClick={() => handleCategoryClick("laptops")} className="btn btn-link me-3">
          Laptops
        </button>
        <button onClick={() => handleCategoryClick("fragrances")} className="btn btn-link me-3">
          Fragrances
        </button>
        <button onClick={() => handleCategoryClick("groceries")} className="btn btn-link">
          Groceries
        </button>
      </div>

      {/* Product Grid */}
      <div className="row">
        {filtered.length === 0 && (
          <p className="text-muted">No products found in this category.</p>
        )}

        {filtered.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="card-img-top p-3"
                style={{ objectFit: "contain", height: "200px" }}
              />

              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate">{product.title}</h6>
                <p className="text-muted">${product.price}</p>

                <div className="mt-auto">
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-link p-0 mb-2"
                  >
                    View Details
                  </Link>

                  <AddToCartButton
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}