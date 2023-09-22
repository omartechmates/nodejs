import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Item } from './Models/item';

const app = express();
const port = 3312;

app.use(bodyParser.json());

let items: Item[] = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 6" },
];

app.get('/api/items', (req: Request, res: Response) => {
    res.json(items);
});

app.get('/api/items/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find((item) => item.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.post('/api/items', (req: Request, res: Response) => {
    const maxId = Math.max(...items.map(item => item.id));
    const newItem = {
        id: maxId + 1,
        name: req.body.name
    };
    items.push(newItem);

    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedItem = req.body;

    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.delete('/api/items/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
        items.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});