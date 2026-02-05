import Carousel from "../components/Carousel";
import Link from "next/link";
import { fetchCategoryPreview } from "../lib/productsService";

type Product = {
  id: number;
  title: string;
  image: string;
};

type HomePageProps = {
  categories: string[];
  previews: Product[][];
};

export default function HomePage({ categories, previews }: HomePageProps) {
  return (
    <div>
      <Carousel />

      {categories.map((cat, index) => {
        const products = previews[index] || [];

        return (
          <section key={cat} className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="h5 text-capitalize">{cat}</h2>

              <Link
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="btn btn-link"
              >
                View all
              </Link>
            </div>

            {products.length === 0 ? (
              <p className="text-muted">No products found.</p>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-md-3 mb-3">
                    <div className="card h-100">
                      <img
                        src={product.image.replace("http://", "https://")}
                        className="card-img-top p-3"
                        style={{ height: "180px", objectFit: "contain" }}
                      />

                      <div className="card-body">
                        <h6 className="card-title text-truncate">
                          {product.title}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  // Updated categories (DummyJSON)
  const categories = ["smartphones", "laptops", "fragrances", "groceries"];

  const previews = await Promise.all(
    categories.map(async (cat) => {
      try {
        const data = await fetchCategoryPreview(cat, 4);
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error("Failed to fetch category preview:", err);
        return [];
      }
    })
  );

  return {
    props: {
      categories,
      previews,
    },
  };
}