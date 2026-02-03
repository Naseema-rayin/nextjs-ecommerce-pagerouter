import Carousel from "../components/Carousel";
import Link from "next/link";
import { fetchCategoryPreview } from "../lib/productsService";

export default function HomePage({ previews }: any) {
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <div>
      <Carousel />

      {categories.map((cat, index) => (
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

          <div className="row">
            {previews[index].map((product: any) => (
              <div key={product.id} className="col-md-3 mb-3">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title text-truncate">{product.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

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
      previews,
    },
  };
}