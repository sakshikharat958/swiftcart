import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./CheckoutPage.module.scss";

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    clearCart();

    navigate("/success");
  };

  return (
    <section className={styles.page}>
      <h1>Checkout</h1>

      {/* ORDER SUMMARY */}
      <div className={styles.summary}>
        <h2>Order Summary</h2>

        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map((item) => (
            <div key={item.product.id} className={styles.item}>
              <img src={item.product.image} />

              <div>
                <h4>{item.product.title}</h4>
                <p>
                  {item.selectedColor} / {item.selectedSize}
                </p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.product.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}

        <h3>Total: ₹{total}</h3>
      </div>

      {/* DELIVERY FORM */}
      <div className={styles.form}>
        <h2>Delivery Details</h2>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Pincode" />
        <input type="text" placeholder="Phone Number" />
        <button className={styles.placeOrder} onClick={handlePlaceOrder}>
          Place Order
        </button>{" "}
      </div>
    </section>
  );
}

export default CheckoutPage;
