import express from "express";
import fs from "fs";
import path from "path";
import process from "process";

export const vidRouter = express.Router();

vidRouter.get("/:folder/:videoFile", (req, res) => {
	const { folder, videoFile } = req.params;

	// Construct the file path securely
	const videoPath = path.join(process.cwd(), "storage", folder, videoFile);

	// Check if file exists
	if (!fs.existsSync(videoPath)) {
		return res.status(404).send("File not found");
	}

	const stat = fs.statSync(videoPath);
	const fileSize = stat.size;

	res.writeHead(200, {
		"Content-Length": fileSize,
		"Content-Type": "video/mp4",
		"Accept-Ranges": "none",
	});

	const stream = fs.createReadStream(videoPath);
	stream.pipe(res);
});
