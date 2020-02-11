import React,{createContext,useState,useEffect} from 'react';
import Axios from 'axios';

// crear el context 
export const ModalContext = createContext();

const ModalProvider = (props) => {
    //State del provider
    const [idReceta, guardarIdReceta] = useState(null);
    const [detallesReceta, guardarDetallesReceta] = useState({})

    useEffect(()=>{
        const consultarAPI = async()=>{
            if(idReceta === null)return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const respuesta = await Axios(url);
            guardarDetallesReceta(respuesta.data.drinks[0]);
        }
        consultarAPI();
    },[idReceta]);
    return (
        <ModalContext.Provider
            value={{guardarIdReceta,detallesReceta,guardarDetallesReceta}}
        >
            {props.children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;