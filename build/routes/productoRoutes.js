"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoRoutes = void 0;
const express_1 = require("express");
const Producto_1 = require("../model/Producto");
const database_1 = require("../database/database");
class ProductoRoutes {
    constructor() {
        this.getProductos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Producto_1.Productos.find({});
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        /*private getProducto = async (req: Request, res: Response) => {
            const { nombre } = req.params
            const {precio, tipo, cantidad, caducidad } = req.body
            await db.conectarBD()
            await Productos.find(
                    { _nombre: nombre },
                    {
                        _nombre: nombre,
                        _precio: precio,
                        _tipo: tipo,
                        _cantidad: cantidad,
                        _caducidad: caducidad
                    },
                )
                 // concatenando con cadena muestra mensaje
            await db.desconectarBD()
        }
      */
        this.getProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD();
            const p = yield Producto_1.Productos.find({ _nombre: nombre });
            // concatenando con cadena muestra mensaje
            yield database_1.db.desconectarBD();
            res.json(p);
        });
        this.nuevoProductoPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { id, nombre, precio, tipo, cantidad, caducidad } = req.body;
            console.log(nombre);
            const dSchema = {
                _id: id,
                _nombre: nombre,
                _precio: parseInt(precio),
                _tipo: tipo,
                _cantidad: parseInt(cantidad),
                _caducidad: new Date(caducidad)
            };
            console.log(dSchema);
            const oSchema = new Producto_1.Productos(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.nuevoProductoGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, precio, tipo, cantidad, caducidad } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _precio: parseInt(precio),
                _tipo: tipo,
                _cantidad: parseInt(cantidad),
                _caducidad: new Date(caducidad)
            };
            const oSchema = new Producto_1.Productos(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        /*private getiva = async (req: Request, res: Response) => {
            const { nombre } = req.params
            await db.conectarBD()
            .then( async (mensaje) => {
                console.log(mensaje)
                const query: any = await Productos.findOne({_nombre: nombre})
                if (query == null){
                    console.log(query)
                    res.json({})
                }else{
                    const producto = new Producto(query._nombre, query._precio,
                        query._tipo, query._cantidad, query._caducidad)
                    res.json({"Nombre": producto.nombre, "Precio sin IVA": producto.precio, "Precio + IVA": producto.iva()})
                }
            })
            .catch((mensaje) => {
                res.send(mensaje)
                console.log(mensaje)
            })
            await db.desconectarBD()
        }
    */
        /*private getdias = async (req: Request, res: Response) => {
            const { nombre } = req.params
            await db.conectarBD()
            .then( async (mensaje) => {
                console.log(mensaje)
                const query: any = await Productos.findOne({_nombre: nombre})
                if (query == null){
                    console.log(query)
                    res.json({})
                }else{
                    const producto = new Producto(query._nombre, query._precio,
                        query._tipo, query._cantidad, query._caducidad)
                    res.json({"Nombre": producto.nombre, "Fecha de caducidad": producto.caducidad, "Días restantes hasta caducidad": producto.dias()})
                }
            })
            .catch((mensaje) => {
                res.send(mensaje)
                console.log(mensaje)
            })
            await db.desconectarBD()
        }
    */
        this.getDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD();
            const p = yield Producto_1.Productos.findOneAndDelete({ _nombre: nombre }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        console.log(`No encontrado`);
                        res.send(`No encontrado`);
                    }
                    else {
                        console.log('Borrado correcto: ' + doc);
                        res.send('Borrado correcto: ' + doc);
                    }
                }
            });
            yield database_1.db.desconectarBD();
            res.json(p);
        });
        this.actualiza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { precio, tipo, cantidad, caducidad } = req.body;
            yield database_1.db.conectarBD();
            yield Producto_1.Productos.findOneAndUpdate({ _nombre: nombre }, {
                _nombre: nombre,
                _precio: precio,
                _tipo: tipo,
                _cantidad: cantidad,
                _caducidad: caducidad
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El producto que desea modificar no existe');
                    res.json({ "Error": "No existe: " + nombre });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getProductos);
        this._router.get('/nuevoG/:nombre&:precio&:tipo&:cantidad&:caducidad', this.nuevoProductoGet);
        this._router.post('/nuevoP', this.nuevoProductoPost);
        // this._router.get('/iva/:nombre', this.getiva)
        //this._router.get('/dias/:nombre', this.getdias)
        this._router.get('/borrar/:nombre', this.getDelete);
        this._router.post('/actualiza/:nombre', this.actualiza);
        this._router.get('/:nombre', this.getProducto);
    }
}
const obj = new ProductoRoutes();
obj.misRutas();
exports.productoRoutes = obj.router;
