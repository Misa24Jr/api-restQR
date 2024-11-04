import express from 'express';
import  employesRoutes  from './routes/employes.routes.js';
import indexRoutes from './routes/index.routes.js';
import {PORT} from './config.js';

const app = express();
app.use(express.json());

app.use(employesRoutes);
app.use(indexRoutes);

app.use((req, res) => {
    res.status(404).json({message: 'Endpoint Not found'});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

