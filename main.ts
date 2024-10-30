import express from "npm:express@4.18.2";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("hi");
});

app.listen(3000);
