const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Asegúrate de que cors esté instalado
const app = express();

// Configurar strictQuery
mongoose.set('strictQuery', true);

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Prueba01', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const libroSchema = new mongoose.Schema({
    id: String,
    titulo: String,
    autor: String,
    editorial: String,
    anio: String,
    genero: String
});

const bodegaSchema = new mongoose.Schema({
    id: String,
    direccion: String,
    nombre: String,
    detalles: String
});

const productoSchema = new mongoose.Schema({
    id: String,
    nombre: String,
    categoria: String,
    bodegas: String,
    descripcion: String
});

const User = mongoose.model('User', userSchema, 'users');
const Libro = mongoose.model('Libro', libroSchema, 'libros');
const Bodega = mongoose.model('Bodega', bodegaSchema, 'bodegas');
const Producto = mongoose.model('Producto', productoSchema, 'productos');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta básica para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de LibreriaBenja');
});

// Crear cuenta
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la cuenta' });
    }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
        }
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
});

// Rutas para libros
app.post('/libros', async (req, res) => {
    const { id, titulo, autor, editorial, anio, genero } = req.body;
    try {
        const newLibro = new Libro({ id, titulo, autor, editorial, anio, genero });
        await newLibro.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar el libro' });
    }
});

app.put('/libros', async (req, res) => {
    const { id, titulo, autor, editorial, anio, genero } = req.body;
    try {
        const libro = await Libro.findOneAndUpdate(
            { id },
            { titulo, autor, editorial, anio, genero },
            { new: true }
        );
        if (libro) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el libro' });
    }
});

app.delete('/libros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Libro.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el libro' });
    }
});

// Rutas para bodegas
app.post('/bodegas', async (req, res) => {
    const { id, direccion, nombre, detalles } = req.body;
    try {
        const newBodega = new Bodega({ id, direccion, nombre, detalles });
        await newBodega.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar la bodega' });
    }
});

app.put('/bodegas', async (req, res) => {
    const { id, direccion, nombre, detalles } = req.body;
    try {
        const bodega = await Bodega.findOneAndUpdate(
            { id },
            { direccion, nombre, detalles },
            { new: true }
        );
        if (bodega) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Bodega no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la bodega' });
    }
});

app.delete('/bodegas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Bodega.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Bodega no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la bodega' });
    }
});

// Rutas para productos
app.post('/productos', async (req, res) => {
    const { id, nombre, categoria, bodegas, descripcion } = req.body;
    try {
        const newProducto = new Producto({ id, nombre, categoria, bodegas, descripcion });
        await newProducto.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar el producto' });
    }
});

app.put('/productos', async (req, res) => {
    const { id, nombre, categoria, bodegas, descripcion } = req.body;
    try {
        const producto = await Producto.findOneAndUpdate(
            { id },
            { nombre, categoria, bodegas, descripcion },
            { new: true }
        );
        if (producto) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el producto' });
    }
});

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Producto.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
