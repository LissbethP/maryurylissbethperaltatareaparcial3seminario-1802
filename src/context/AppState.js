import { useState, useEffect } from 'react'
import AppContext from './AppContext'
import { dataProductos } from '../data'

const AppState = ({ children }) => {
    const [articulos, guardarArticulo] = useState([])
    const [carrito, guardarCarrito] = useState([])

    
    // Carga la lista de los productos.
    useEffect(() => {
        guardarArticulo(dataProductos)
    }, [])


    /**
    * Agrega producto al carro.    
     * @param {text} producto Producto a añadir al carrito
     * @returns 
     */
    const agregarAlCarro = (producto) => {
         // Ejecuta si el producto haciendo click ya está listo en el carro.
        if (carrito.find(x => x.id === producto.id)) {
            // De lo contrario de estar en el carro, se aumenta la cantidad en 1.
            const carritoCopia = carrito.map(x => x.id === producto.id ? ({ ...x, cantidad: x.cantidad + 1 }) : x)
            guardarCarrito(carritoCopia)
            return
        }
        guardarCarrito([...carrito, { ...producto, cantidad: 1 }])
    }

    /**
     * Elimina producto del carro.
     * @param {text} producto Producto a eliminar del carrito.
     */
    const eliminarProducto = producto => {
        //Se filtrará la lista de productos y se eliminará el articulo que se ha definido.
        const nuevaLista = carrito.filter(item => item.id !== producto.id)
        // Se guardará la nueva lista de los productos.
        guardarCarrito(nuevaLista)
    }

    /**
     * Filtrará la lista de los productos para mostrar solos los que contengan la cadena de texto que se envió como parametro de la función.
     * @param {text} nombre letra o palabra para filtrar los productos.
     */
    const filtrarProducto = nombre => {
        let nuevaLista = []
        // Se verificará si la cadena de texto que se suministró no se encuentre vacía, y si es así mostrará todos los productos
        // caso contrario unicamente mostrar los productos que se han filtrado.
        nombre !== ''? nuevaLista = dataProductos.filter(x=>x.nombre.toLowerCase().includes(nombre.toLowerCase()) ):
        nuevaLista = dataProductos
        // Se guarda la nueva lista de productos.
        guardarArticulo(nuevaLista)
    }


    return (
        <AppContext.Provider
            value={{
                articulos: articulos,
                carrito: carrito,
                agregarAlCarro,
                eliminarProducto,
                filtrarProducto
            }}
        >
            {children}
        </AppContext.Provider>
    )

}


export default AppState
