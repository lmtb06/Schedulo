import express from "express";
import { createServer } from "http";
import path from "path";

const app = express();
const server = createServer(app);

app.use(express.static(path.join(process.cwd(), "public")));

const PORT = 3000;

server.listen(PORT, () => console.log(`Server launched on http://localhost:${PORT}`));