import {Schema, model } from 'mongoose'
import { identificacionRoutes } from '../routes/identificacionRoutes'
// Definimos el Schema
const productoSchema = new Schema({
    _id: String,
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