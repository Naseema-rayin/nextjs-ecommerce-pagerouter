import { GetServerSideProps } from "next";
import { fetchProductById } from "../../lib/productsService";
import Image from "next/image";
import AddToCartButton from "../../components/AddToCartButton";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type ProductDetailProps = {
  product: Product | null;
};

export default function ProductDetailPage({ product }: ProductDetailProps) {
  if (!product) {
    return <h2 className="text-danger">Product not found</h2>;
  }

  return (
    <div className="row mt-4">
      <div className="col-md-5 text-center">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="col-md-7">
        <h1 className="h3">{product.title}</h1>
        <p className="text-muted text-capitalize">{product.category}</p>
        <p className="h4">${product.price}</p>

        <p className="mt-3">{product.description}</p>

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
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const product = await fetchProductById(id);

  return {
    props: {
      product,
    },
  };
};