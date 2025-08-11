/**
 * Angular app routes
 */

import express, {Request, Response, Router} from "express";
import process from "node:process";
import path from "path";

import { fileURLToPath } from 'url';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router: Router = express.Router();

const frontendFilesPath = process.env.NODE_ENV === "production"
  ? process.env.FRONTEND_FILES_PATH // Absolute path in production
  : path.resolve(`${__dirname}${process.env.FRONTEND_FILES_PATH}`); // Relative path in development

router.use(`/`, express.static(`${frontendFilesPath}`) );

// If the file is not found serve the index
router.use(`/*`, (_req: Request, res: Response) => {
  console.log(frontendFilesPath);
  res.sendFile(`${frontendFilesPath}/index.html`);
});

export { router as FrontEndRouter }
