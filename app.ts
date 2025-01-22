import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './src/routes/todos'
import { error } from 'console';

const app = express();

app.use('/todos', todoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({message: error.message})
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})