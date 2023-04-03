import { NextFunction, Request, Response } from "express";
import { market } from "./database";

const existingNameCheck = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productName = req.body;

  if (Array.isArray(productName)) {
    const duplicateName = productName.findIndex(
      (product) =>
        market.findIndex(marketProduct => marketProduct.name == product.name) >= 0
    );

    if (duplicateName >= 0) {
      return res.status(409).json({
        error: "Product already registered",
      });
    }
  } else {
    const duplicateName = market.findIndex(marketProduct => marketProduct.name === productName.name);
    
    if (duplicateName >= 0) {
        return res.status(409).json({
          error: "Product already registered",
        });
    }
  }

  return next();
};

const checkIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(req.params.id);
  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.locals.market = {
    indexProduct: findIndex,
  };

  return next();
};

export { existingNameCheck, checkIdExists };
