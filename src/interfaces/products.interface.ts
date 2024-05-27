export interface Product {
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

export interface CreateProductsDto {
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

export interface UpdateProductDto {
  nome?: string;
  descricao?: string;
  preco?: number;
  quantidade?: number;
}
