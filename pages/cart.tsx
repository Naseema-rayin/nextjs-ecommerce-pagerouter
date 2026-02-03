import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="fw-bold mb-3">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <small className="text-muted">
                    ${item.price} × {item.quantity}
                  </small>
                </div>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ${total.toFixed(2)}</h4>

            <div>
              <button
                className="btn btn-outline-secondary me-2"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <button className="btn btn-primary">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}