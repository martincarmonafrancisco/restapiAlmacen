import {Schema, model } from 'mongoose'
// Definimos el Schema
const productoSchema = new Schema({
    _nombre: String,
    _precio: Number,
    _tipo: String,
    _cantidad: Number,
    _caducidad: Date,
},
{
    collection:'productos'
})
export const Productos = model('productos', productoSchema)