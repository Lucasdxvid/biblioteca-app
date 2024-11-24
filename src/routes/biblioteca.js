const express = require('express');
const router = express.Router();
const pool = require('../db');

// Rutas para libros
router.post('/libros', async (req, res) => {
    const { titulo, autor, genero, anio } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO libros (titulo, autor, genero, anio, disponible) VALUES (?, ?, ?, ?, true)',
            [titulo, autor, genero, anio]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el libro' });
    }
});

router.get('/libros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM libros');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

router.put('/libros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, anio } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE libros SET titulo = ?, autor = ?, genero = ?, anio = ? WHERE id = ?',
            [titulo, autor, genero, anio, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
        res.json({ message: 'Libro actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

router.delete('/libros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

// Rutas para miembros
router.post('/miembros', async (req, res) => {
    const { nombre, id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO miembros (nombre, id) VALUES (?, ?)',
            [nombre, id]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el miembro' });
    }
});

router.get('/miembros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM miembros');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los miembros' });
    }
});

router.delete('/miembros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM miembros WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Miembro no encontrado' });
        res.json({ message: 'Miembro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el miembro' });
    }
});

// Rutas para préstamos
router.post('/prestamos', async (req, res) => {
    const { idMiembro, idLibro } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO prestamos (idMiembro, idLibro) VALUES (?, ?)',
            [idMiembro, idLibro]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el préstamo' });
    }
});

router.post('/devoluciones', async (req, res) => {
    const { idMiembro, idLibro } = req.body;
    try {
        const [result] = await pool.query(
            'DELETE FROM prestamos WHERE idMiembro = ? AND idLibro = ?',
            [idMiembro, idLibro]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
        res.json({ message: 'Libro devuelto correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al devolver el libro' });
    }
});

module.exports = router;