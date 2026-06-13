import { Link } from "react-router-dom";
import styles from "./OrderSuccess.module.scss";

function OrderSuccess() {
  return (
    <div className={styles.page}>
      <h1>Order Placed Successfully!</h1>

      <p>Thank you for shopping with us.</p>

      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
