import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { Link } from "react-router-dom";
import styles from "./CategoriesPage.module.css";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector(state => state.categories);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [status, dispatch]);

  return (
    <div>
      <h2 className={styles.title}>Категории</h2>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

      {status === "succeeded" && (
        <div className={styles.grid}>
  {list.map(c => (
    <Link
      key={c.id}
      to={`/category/${c.id}`}
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <img
          src={c.image}
          alt={c.title}
          className={styles.image}
        />
      </div>

      <div className={styles.cardTitle}>
        {c.title}
      </div>
    </Link>
  ))}
</div>
      )}
    </div>
  );
}
