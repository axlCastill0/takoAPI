import { client } from "../client.ts";

type Product = {
	id: number;
	name: string;
	category: string;
	description: string;
	imageIds: string;
};

export async function getProducts() {
	try {
		const response = await client.query(
			"SELECT prod.*, GROUP_CONCAT(pics.image_id) as imageIds FROM mae_products prod LEFT JOIN mae_prod_images pics ON prod.id = pics.product_id GROUP BY prod.id"
		);
		const products = response.map((product: Product) => ({
			id: product.id,
			name: product.name,
			category: product.category,
			description: product.description,
			imageIds: product.imageIds ? product.imageIds.split(",").map(Number) : [],
		}));
		return products;
	} catch (error) {
		console.error(error);
	}
	return null;
}

export async function getProductById(id: number) {
	try {
		const response = await client.query(
			"SELECT prod.*, GROUP_CONCAT(pics.image_id) as imageIds FROM mae_products prod LEFT JOIN mae_prod_images pics ON prod.id = pics.product_id WHERE prod.id = ? GROUP BY prod.id",
			[id]
		);
		const product = response.map((product: Product) => ({
			id: product.id,
			name: product.name,
			category: product.category,
			description: product.description,
			imageIds: product.imageIds ? product.imageIds.split(",").map(Number) : [],
		}));
		return product;
	} catch (error) {
		console.error(error);
	}
	return null;
}

export async function insertProduct(product: Product) {
	try {
		await client.execute(
			"INSERT INTO mae_products (name, category, pictures, description) VALUES (?, ?, ?, ?)",
			[product.name, product.category, product.description]
		);
		return { message: "Product inserted successfully" };
	} catch (error) {
		console.error(error);
	}
	return { message: "An error occurred" };
}
