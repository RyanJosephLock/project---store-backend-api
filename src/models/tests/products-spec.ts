import { Product, ProductStore } from '../products'

const store = new ProductStore()

describe("----- Products Model -----", () => {
    
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a product', async () => {
        const product: Product = {
            "product_name": "Chicken",
            "product_category": "Food",
            "product_price": 7
        }
        const newProduct = await store.create(product)
        expect(newProduct).toEqual(jasmine.objectContaining(
            {
                "product_name": "Chicken",
                "product_category": "Food",
                "product_price": "7"
            }
        ));
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result[result.length-1]).toEqual(jasmine.objectContaining(
            {
                "product_name": "Chicken",
                "product_category": "Food",
                "product_price": "7"
            }
        ));
    });

    it('show method return the correct product', async () => {
        const allProducts = await store.index();
        const result = await store.show(allProducts.length);
        expect(result).toEqual(jasmine.objectContaining(
            {
                "product_name": "Chicken",
                "product_category": "Food",
                "product_price": "7"
            }
        ));
    });

});
