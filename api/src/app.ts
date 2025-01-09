import express from 'express';
import emailRoutes from './routes/emailRoutes';

const app = express();

app.use(express.json());

app.use('/api/emails', emailRoutes);

export default app;