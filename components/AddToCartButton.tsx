import { useCart } from "./CartContext";

type CartProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ product }: { product: CartProduct }) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  );
}