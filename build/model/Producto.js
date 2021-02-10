"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const productoSchema = new mongoose_1.Schema({
    _nombre: String,
    _precio: Number,
    _tipo: String,
    _cantidad: Number,
    _caducidad: Date,
}, {
    collection: 'productos'
});
exports.Productos = mongoose_1.model('productos', productoSchema);
