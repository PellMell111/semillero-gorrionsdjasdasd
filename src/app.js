const express = require('express');
const { ProductManager } = require('./productManager');

const app = express();
const PORT = process.env.PORT || 3000;

const productManager = new ProductManager('../data/products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  
        const products = await productManager.getProducts();
  
        const limitedProducts = limit ? products.slice(0, limit) : products;
  
        res.json({ products: limitedProducts });

    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ha ocurrido un error interno.' });
    }
});
  
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
  
        const product = await productManager.getProductById(productId);
  
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
  
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ha ocurrido un error interno.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});