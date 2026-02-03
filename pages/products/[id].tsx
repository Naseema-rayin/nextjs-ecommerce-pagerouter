import { fetchProductById } from "../../lib/productsService";
import Image from "next/image";
import AddToCartButton from "../../components/AddToCartButton";

export default function ProductDetailPage({ product }: any) {
  return (
    <div className="row">
      <div className="col-md-5">
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

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const product = await fetchProductById(id);

  return {
    props: {
      product,
    },
  };
}