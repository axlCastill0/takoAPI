import { client } from "../client.ts";

export async function getProducts() {
	const result = client.query("SELECT * FROM mae_products");
	return await result;
}

export async function getProductById(id: number) {
	const result = client.query("SELECT * FROM mae_products WHERE id = ?", [id]);
	return await result;
}
