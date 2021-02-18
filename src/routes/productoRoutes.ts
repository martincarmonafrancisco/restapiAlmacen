import {Request, Response, Router } from 'express'
import { Productos} from '../model/Producto'
import { db } from '../database/database'

class ProductoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getProductos = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query:any  = await Productos.find({})
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        await db.desconectarBD()
    }

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
 private getProducto = async (req: Request, res: Response) => {
    const { _nombre } = req.params
    await db.conectarBD()
    await Productos.find(
            { _nombre: _nombre },
        )
         // concatenando con cadena muestra mensaje
    await db.desconectarBD()
}

    private nuevoProductoPost = async (req: Request, res: Response) => {
        console.log(req.body)
        // Observar la diferencia entre req.body (para POST) 
        // y req.params (para GET con los parámetros en la URL
        const { nombre, precio, tipo, cantidad, caducidad } = req.body

        console.log(nombre)

        const dSchema = {
            _nombre: nombre,
            _precio: parseInt(precio),
            _tipo: tipo,
            _cantidad: parseInt(cantidad),
            _caducidad: new Date(caducidad)
        }
        console.log(dSchema)
        const oSchema = new Productos(dSchema)
        await db.conectarBD()
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    }     

    private nuevoProductoGet = async (req: Request, res: Response) => {
        const { nombre, precio, tipo, cantidad, caducidad } = req.params
        console.log(req.params)

        await db.conectarBD()
        const dSchema = {
            _nombre: nombre,
            _precio: parseInt(precio),
            _tipo: tipo,
            _cantidad: parseInt(cantidad),
            _caducidad: new Date(caducidad)
        }
        const oSchema = new Productos(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    }  
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
    private getDelete = async (req: Request, res: Response) => {
        const {nombre } = req.params
        await db.conectarBD()
        await Productos.findOneAndDelete(
            { _nombre: nombre }, 
            (err: any, doc) => {
                if(err) console.log(err)
                else{
                    if (doc == null) {
                        console.log(`No encontrado`)
                        res.send(`No encontrado`)
                    }else {
                        console.log('Borrado correcto: '+ doc)
                        res.send('Borrado correcto: '+ doc)
                    }
                }
            })
        await db.desconectarBD()
    }
    
    private actualiza = async (req: Request, res: Response) => {
        const { nombre } = req.params
        const {precio, tipo, cantidad, caducidad } = req.body
        await db.conectarBD()
        await Productos.findOneAndUpdate(
                { _nombre: nombre }, 
                {
                    _nombre: nombre,
                    _precio: precio,
                    _tipo: tipo,
                    _cantidad: cantidad,
                    _caducidad: caducidad
                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('El producto que desea modificar no existe')
                        res.json({"Error":"No existe: "+nombre})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) // concatenando con cadena muestra mensaje
        await db.desconectarBD()
    }



    misRutas(){
        this._router.get('/', this.getProductos)
        this._router.get('/nuevoG/:nombre&:precio&:tipo&:cantidad&:caducidad', this.nuevoProductoGet)
        this._router.post('/nuevoP', this.nuevoProductoPost)
       // this._router.get('/iva/:nombre', this.getiva)
        //this._router.get('/dias/:nombre', this.getdias)
        this._router.get('/borrar/:nombre', this.getDelete)
        this._router.post('/actualiza/:nombre', this.actualiza)
        this._router.get('/:_nombre', this.getProducto)
    }
}

const obj = new ProductoRoutes()
obj.misRutas()
export const productoRoutes = obj.router