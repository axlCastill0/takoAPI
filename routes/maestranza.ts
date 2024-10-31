import express from "npm:express@4.18.2";

export const maeRouter = express.Router();

maeRouter.get("/products", (req: express.Request, res: express.Response) => {
    res.send("gettings products...");
});
