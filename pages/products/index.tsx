import { fetchProducts } from "../../lib/productsService";
import FilterClient from "../../components/FilterClient";

export default function ProductsPage({ products }: any) {
  return (
    <div>
      <h1 className="fw-bold mb-3">Products</h1>
      <FilterClient products={products} />
    </div>
  );
}

export async function getServerSideProps() {
  const products = await fetchProducts();

  return {
    props: {
      products,
    },
  };
}