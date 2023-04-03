import { Request, Response } from "express";
import { IProduct, TProductRequest } from "./interfaces";
import { market } from "./database";

const createProducts = (req: Request, res: Response): Response => {
  const productData: TProductRequest[] = req.body;
  let id = market.length + 1;
  const total = productData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  const newProduct: IProduct[] = productData.map((product) => ({
    id: id++,
    ...product,
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  }));

  market.push(...newProduct);

  return res.status(201).json({
    total: total,
    marketProducts: newProduct,
  });
};

const listProducts = (req: Request, res: Response): Response => {
  const total = market.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return res.status(200).json({
    total: total,
    marketProducts: market,
  });
};

const listProductsID = (req: Request, res: Response): Response => {
  const productIndex = res.locals.market.indexProduct;
  const product = market[productIndex];

  return res.status(200).json(product);
};


const updateProduct = (req: Request, res: Response): Response => {
  const productIndex = res.locals.market.indexProduct;
  const { id, expirationDate, section, ...update } = req.body;  

  const updateProduct = {
    ...market[productIndex],
    ...update
  }

  market[productIndex] = updateProduct;

  return res.status(200).json(market[productIndex]);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const index = res.locals.market.indexProduct;
  market.splice(index, 1);

  return res.status(204).send();
};

export {
  createProducts,
  listProducts,
  listProductsID,
  updateProduct,
  deleteProduct,
};
