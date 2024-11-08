import express from "npm:express@4.18.2";
import * as mae from "../db/maestranza/products.ts";

export const maeRouter = express.Router();

maeRouter.get(
	"/products",
	async (req: express.Request, res: express.Response) => {
		const products = await mae.getProducts();
		res.send(products);
	}
);

maeRouter.get(
	"/products/:id",
	async (req: express.Request, res: express.Response) => {
		const product = await mae.getProductById(req?.params?.id);
		res.send(product);
	}
);

maeRouter.post(
	"/products",
	async (req: express.Request, res: express.Response) => {
		const product = await mae.insertProduct(req.body);
		res.send(product);
	}
);
