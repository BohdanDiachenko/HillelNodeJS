import express from 'express';
import userRoutes from './routes/userRoutes.js'; 
import { ensureDbFileExists } from './services/fileServise.js';

const app = express();
app.use(express.json());

ensureDbFileExists();

app.use("/api/v1", userRoutes);

export { app };
