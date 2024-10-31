import { client } from "../client.ts";

export async function getProducts() {
	const result = client.query("SELECT * FROM mae_products");
	return await result;
}
