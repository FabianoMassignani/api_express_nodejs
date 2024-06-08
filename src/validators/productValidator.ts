import { body, param, query } from "express-validator";

export const validateProductId = [
  param("id").isString().withMessage("Id deve ser uma string"),
];

export const validateProductData = [
  body("nome").notEmpty().withMessage("Nome não informado"),
  body("preco").isFloat({ gt: 0 }).withMessage("Preço deve ser maior que 0"),
  body("quantidade")
    .isInt({ gt: 0 })
    .withMessage("Quantidade deve ser maior que 0"),
];

export const validateQuery = [
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit deve ser um número maior que 0"),
  query("skip")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Skip deve ser um número maior que 0"),
];
