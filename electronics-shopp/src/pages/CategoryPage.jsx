import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { setSearch, setMinPrice, setMaxPrice, setSort, resetFilters } from "../features/filters/filtersSlice";
import { useDebounce } from "../hooks/useDebounce";
import { selectPriceSortedProducts } from "../features/products/productsSelectors";
import { CategoryLogger } from "../utils/CategoryLogger";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id);
  const logger = new CategoryLogger();
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const [categoryTitle, setCategoryTitle] = useState(`Категория #${categoryId}`);

  useEffect(() => {
    fetch(`http://localhost:3001/categories/${categoryId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => data?.title && setCategoryTitle(data.title))
      .catch(() => {});
  }, [categoryId]);

  const debouncedSearch = useDebounce(filters.search, 500); 

  useEffect(() => {
    logger.opened(categoryId);
  }, [categoryId]);

  useEffect(() => {
    logger.search(categoryId, debouncedSearch);
    dispatch(fetchProducts({ categoryId, search: debouncedSearch }));
  }, [categoryId, debouncedSearch, dispatch]);
  const filteredProducts = useSelector(selectPriceSortedProducts);
  return (
    <div>
      <div className={styles.topRow}>
        <h2 className={styles.pageTitle}>{categoryTitle}</h2>
        <Link to="/" className={styles.backLink}>← Назад</Link>
      </div>

      <div className={styles.filters}>
        <div className={styles.field}>
          <label>Искать</label>
          <input
            className={styles.input}
            value={filters.search}
            onChange={e => dispatch(setSearch(e.target.value))}
            placeholder="Напишите название товара..."
          />
        </div>

        <div className={styles.field}>
          <label>Мин цена</label>
          <input
            className={styles.input}
            value={filters.minPrice}
            onChange={e => dispatch(setMinPrice(e.target.value))}
            placeholder="0"
            inputMode="numeric"
          />
        </div>

        <div className={styles.field}>
          <label>Макс цена</label>
          <input
            className={styles.input}
            value={filters.maxPrice}
            onChange={e => dispatch(setMaxPrice(e.target.value))}
            placeholder="9999"
            inputMode="numeric"
          />
        </div>

        <div className={styles.field}>
          <label>Сортировать по</label>
          <select
            className={styles.select}
            value={filters.sort}
            onChange={e => dispatch(setSort(e.target.value))}
          >
            <option value="price_asc">Цена: от низкой → высокой</option>
            <option value="price_desc">Цена: от высокой → низкой</option>
            <option value="title_asc">Название: A → Z</option>
            <option value="title_desc">Название: Z → A</option>
          </select>
        </div>

        <button className={styles.btn} onClick={() => dispatch(resetFilters())}>Сбросить</button>
      </div>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

      {status === "succeeded" && (
        <div className={styles.productsGrid}>
          {filteredProducts.map(p => (
            <div key={p.id} className={styles.productCard}>
              <div className={styles.imageWrap}>
                {p.image ? (
                  <img className={styles.image} src={p.image} alt={p.title} />
                ) : (
                  <div className={styles.noImage}>No image</div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.productTitle}>{p.title}</div>

                <div className={styles.bottomRow}>
                  <div className={styles.price}>
                    {p.price}<span className={styles.currency}>$</span>
                  </div>

                  <button className={styles.addBtn} onClick={() => dispatch(addToCart(p))}>Добавить</button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && <div>Ничего не найдено</div>}
        </div>
      )}
    </div>
  );
}