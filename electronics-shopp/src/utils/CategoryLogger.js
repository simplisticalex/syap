import { BaseLogger } from "./BaseLogger";

export class CategoryLogger extends BaseLogger {
  opened(categoryId) {
    this.log("Category opened", { categoryId });
  }

  search(categoryId, query) {
    this.log("Category search", { categoryId, query });
  }
}
