import { client } from "../client.ts";

type Product = {
	id: number;
	name: string;
	category: string;
	pictures: string;
	description: string;
};

export async function getProducts() {
	try {
		const response = await client.query("SELECT * FROM mae_products");
		const products = response.map((product: Product) => ({
			id: product.id,
			name: product.name,
			category: product.category,
			pictures: product.pictures,
			description: product.description,
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
			"SELECT * FROM mae_products WHERE id = ?",
			[id]
		);
		const product = response.map((product: Product) => ({
			id: product.id,
			name: product.name,
			category: product.category,
			pictures: product.pictures,
			description: product.description,
		}));
		return product;
	} catch (error) {
		console.error(error);
	}
	return null;
}

export async function insertProduct(product: Product) {
	try {
		const response = await client.execute(
			"INSERT INTO mae_products (name, category, pictures, description) VALUES (?, ?, ?, ?)",
			[product.name, product.category, product.pictures, product.description]
		);
		return { message: "Product inserted successfully" };
	} catch (error) {
		console.error(error);
	}
	return { message: "An error occurred" };
}
