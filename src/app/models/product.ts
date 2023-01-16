export interface Product {
    id?:any;
    title?: string;
    price?: number;
    description?: string;
    category: {
        id?: number;
        name?: string;
      }
    images?: string[];
  }