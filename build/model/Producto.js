"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = exports.Supermercados = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const productoSchema = new mongoose_1.Schema({
    _id: String,
    _nombre: String,
    _precio: Number,
    _tipo: String,
    _cantidad: Number,
    _caducidad: Date,
}, {
    collection: 'productos'
});
const supermercadoSchema = new mongoose_1.Schema({
    _id: String,
    _nombre: String,
    _direccion: String,
    _numtelefono: Number,
}, {
    collection: 'supermercados'
});
exports.Supermercados = mongoose_1.model('supermercados', supermercadoSchema);
exports.Productos = mongoose_1.model('productos', productoSchema);
