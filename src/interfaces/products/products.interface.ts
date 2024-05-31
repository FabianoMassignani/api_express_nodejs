export type Product = {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
};

export type CreateProductsDto = Omit<Product, "_id">;

export type UpdateProductDto = Partial<Product>;
