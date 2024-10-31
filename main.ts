import express from "npm:express@4.18.2";
import { maeRouter } from "./routes/maestranza.ts";

const app = express();
const port = Number(Deno.env.get("PORT")) || 8000;

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("hi");
});

app.use("/maestranza", maeRouter);

app.listen(port);
