import { useCart } from "./CartContext";

export default function AddToCartButton({ product }: any) {
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