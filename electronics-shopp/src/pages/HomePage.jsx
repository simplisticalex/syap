import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const { list: products, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  return (
    <div>
      <h2>Catalog</h2>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

      {status === "succeeded" && (
        <div className={styles.grid}>
          {products.map(p => (
            <div key={p.id} className={styles.card}>
              {p.image && <img className={styles.img} src={p.image} alt={p.title} />}
              <div className={styles.title}>{p.title}</div>

              <div className={styles.priceRow}>
                <div className={styles.price}>
                  {p.price}
                  <span className={styles.currency}>$</span>
                </div>

                <button
                  className={styles.btn}
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )} 
    </div>
  );
}
