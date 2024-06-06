export type Product = {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
};

export type CreateProduct = Omit<Product, "_id">;

export type UpdateProduct = Partial<Product>;
