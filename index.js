import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRoute from './routes/indexRoute.js';
import aboutRoute from './routes/aboutRoute.js';
import contactRoute from './routes/contactRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar EJS como el motor de visualización
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejo de formularios
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/contact', contactRoute);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('404: Page not found');
});

// Manejo de errores internos del servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500: Internal Server Error');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
