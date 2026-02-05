import { GetServerSideProps } from "next";
import { fetchProducts } from "../../lib/productsService";
import FilterClient from "../../components/FilterClient";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type ProductsPageProps = {
  products: Product[];
};

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-3">Products</h1>
      <FilterClient products={products} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = (context.query.category as string) || null;

  const products = await fetchProducts(category ?? undefined);

  return {
    props: {
      products,
    },
  };
};