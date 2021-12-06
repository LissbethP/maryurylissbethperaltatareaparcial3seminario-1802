import { useContext } from 'react'
import { BUTTON } from './styles'
import AppContext from "../../context/AppContext";
export const Button = ({children, prod}) => {

    //Uso del contexto en el que se declara la función para añadir un producto al carro.
    const { agregarAlCarro } = useContext(AppContext)
    const clickAgregar = (prod) =>{
        agregarAlCarro(prod)
    }

    return (
        <BUTTON onClick={() => clickAgregar(prod)} >{children}</BUTTON>
    )
    
}
