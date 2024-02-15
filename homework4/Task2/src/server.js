import express from 'express';
import cartRoutes from './routes/cartRoutes.js'; 
import productRoutes from './routes/productRoutes.js'; 

const app = express();
app.use(express.json());

app.use("/api/v1", productRoutes);
app.use("/api/v1", cartRoutes);

export { app };
