import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos'
import { json } from 'body-parser';

const app = express();

app.use(json())

app.use('/todos', todoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({message: error.message})
})

const port = 3011;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})