import express from "express";
import fs from "fs";
import path from "path";
import process from "process";

export const vidRouter = express.Router();

vidRouter.get("/:folder/:videoFile", async (req, res) => {
	const { folder, videoFile } = req.params;
	const range = req.headers.range;

	if (!range) {
		return res.status(400).send("Requires Range header");
	}

	// Construct the file path securely
	const videoPath = path.join(process.cwd(), "video", folder, videoFile);

	// Check if file exists
	if (!fs.existsSync(videoPath)) {
		return res.status(404).send("File not found");
	}

	const stat = fs.statSync(videoPath);
	const fileSize = stat.size;

	const parts = range.replace(/bytes=/, "").split("-");
	const start = parseInt(parts[0], 10);
	const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

	if (start >= fileSize || end >= fileSize) {
		return res.status(416).send("Requested range not satisfiable");
	}

	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${fileSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};

	res.writeHead(206, headers);

	const stream = fs.createReadStream(videoPath, { start, end });
	stream.pipe(res);
});
