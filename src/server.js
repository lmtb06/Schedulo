import { createServer } from "http";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;
const URL_API = process.env.URL_API || `http://localhost:${PORT}/api`;
// Rendre URL_API disponible globalement
app.set('URL_API', URL_API);

const server = createServer(app);


server.listen(PORT, () => console.log(`Server launched on http://localhost:${PORT}`));