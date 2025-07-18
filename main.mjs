import express from "express";
import cors from "cors";
import { vidRouter } from "./routes/video.mjs";

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("hello world from tako");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use("/video", vidRouter);

export default app;
