export type Product = {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  icms: number; // Imposto sobre Circulação de Mercadorias e Serviços
  fornecedor: string;
  marca: string;
  categoria: string;
  colecao: string;
  ncm: string; // Nomenclatura Comum do Mercosul
  barcode: string; // Código de barras
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductDto = Omit<Product, "_id">;

export type UpdateProductDto = Partial<Product>;
