const { ProductManager } = require('./productManager');

async function runTest() {
    const productManager = new ProductManager('../data/products.json');

    const newProduct1 = {
        title: 'Nuevo producto 1',
        description: 'Descripción del nuevo producto 1',
        price: 99.99,
        thumbnail: 'imagen1.jpg',
        code: 'abc456',
        stock: 50
    };

    const newProduct2 = {
        title: 'Nuevo producto 2',
        description: 'Descripción del nuevo producto 2',
        price: 149.99,
        thumbnail: 'imagen2.jpg',
        code: 'xyz789',
        stock: 30
    };

    await productManager.addProduct(newProduct1.title, newProduct1.description, newProduct1.price, newProduct1.thumbnail, newProduct1.code, newProduct1.stock);
    await productManager.addProduct(newProduct2.title, newProduct2.description, newProduct2.price, newProduct2.thumbnail, newProduct2.code, newProduct2.stock);

    const products = await productManager.getProducts();
    console.log('Productos después de agregar:', products);
}

runTest();