import express from "npm:express@4.18.2";
import cors from "npm:cors@2.8.5";
import { maeRouter } from "./routes/maestranza.ts";

const app = express();
const port = Number(Deno.env.get("PORT")) || 8000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("hi");
});

app.use("/maestranza", maeRouter);

app.listen(port);
