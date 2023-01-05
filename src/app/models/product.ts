export interface Product {
    title?: string;
    price?: number;
    description?: string;
    category: {
        id?: number;
        name?: string;
      }
    images?: string[];
}
