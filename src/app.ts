import express, { Application } from "express";
import { createProducts, deleteProduct, listProducts, listProductsID, updateProduct } from "./logics";
import { checkIdExists, existingNameCheck } from "./middlewares";

const app: Application = express()
app.use(express.json())

app.post('/products', existingNameCheck, createProducts)
app.get('/products', listProducts)
app.get('/products/:id', checkIdExists, listProductsID)
app.patch('/products/:id', existingNameCheck, checkIdExists, updateProduct)
app.delete('/products/:id', checkIdExists, deleteProduct)

const PORT: number = 3000
const runningMsg = `Server running on http://localhost:${PORT}`
app.listen(PORT, () => {
    console.log(runningMsg)
})