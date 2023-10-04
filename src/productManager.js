const fs = require('fs').promises;

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
        this.products = [];
        this.idCounter = 1;
    }

    generateId() {
        const id = this.idCounter;
        this.idCounter++;
        return id;
    }

    async isCodeUnique(products, code) {
        try {
            const results = await Promise.all(products.map(async (product) => {
                return product.code === code;
            }));

            return !results.some(result => result === true);

        } catch(error) {
            console.error("Error a verificar el código del producto: ", error);
            return false;
        }
    }

    async saveProducts(products) {
        try {
            const data = JSON.stringify(products, null, 2);
            await fs.writeFile(this.pathFile, data, 'utf8');
        } catch (error) {
            console.error("Error al guardar los productos: ", error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
            const id = this.generateId();

            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            products.push(newProduct);
            await this.saveProducts(products);
            return newProduct;

        } catch(error) {
            console.error("Error al agregar el producto: ", error);
            return null;
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.pathFile, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error("Error al leer el archivo de productos: ", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            console.log("Productos cargados:", products);
            for (const product of products) {
                if (product.id === id) {
                    console.log("Producto encontrado:", product);
                    return product;
                }
            }
            return null;
        } catch (error) {
            console.error("Error al buscar el producto por ID: ", error);
            return null;
        }
    }

    async updateProduct(id, updateProduct) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((item) => item.id === id);
            if(index !== -1) {
                updateProduct.id = id;
                products[index] = updateProduct;
                return true;
            } else {
                return false;
            }
        } catch(error) {
            console.error("Error al actualizar el producto: ", error);
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((item) => item.id === id);

            if (index !== -1) {
                products.splice(index, 1);
                await this.saveProducts(products);
            } else {
                console.log("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
}

module.exports = {
    ProductManager,
};