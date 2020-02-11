import React, {createContext, useState, useEffect} from "react";
import Axios from 'axios';
// crear el Context

export const CategoriasContext = createContext();
// Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) =>{
    // crear el state del context
    const [categorias, guardarCategorias] = useState([]);

    useEffect(()=>{
        
        // Método para consumir API
        const consultarAPI = async()=>{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const resultado = await Axios(url);
            guardarCategorias(resultado.data.drinks);
        }
        consultarAPI();
    },[])
    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;
