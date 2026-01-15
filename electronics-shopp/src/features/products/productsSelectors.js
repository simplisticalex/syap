import { createSelector } from "reselect";

const selectProducts = (state) => state.products.list;
const selectFilters = (state) => state.filters;

export const selectPriceSortedProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    const min = Number(filters.minPrice || 0);
    const max = Number(filters.maxPrice || 999999);

    const result = products.filter((p) => {
      const price = Number(p.price || 0);
      return price >= min && price <= max;
    });

    const sorted = [...result];

    switch (filters.sort) {
      case "price_desc":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "title_asc":
        sorted.sort((a, b) => String(a.title).localeCompare(String(b.title)));
        break;
      case "title_desc":
        sorted.sort((a, b) => String(b.title).localeCompare(String(a.title)));
        break;
      default:
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
    }

    return sorted;
  }
);
