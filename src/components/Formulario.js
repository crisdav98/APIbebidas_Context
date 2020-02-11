import React, { useState, useContext } from 'react';
import {CategoriasContext} from '../context/CategoriaContext';
import {RecetasContext} from '../context/RecetasContext';

const Formulario = () => {
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria:''
    });

    const {categorias} = useContext(CategoriasContext);
    const {guardarConsulta,validarConsulta} = useContext(RecetasContext);

    // Función para leer los contenidos
    const obtenerDatosReceta = e =>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    // Enviar Datos a RecetasContext
    const enviarDatosReceta = e =>{
        e.preventDefault();
        
        validarConsulta(true);
        guardarConsulta(busqueda);
        
    }
    return (
        <form className="col-12" onSubmit={enviarDatosReceta}>
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar Ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-Selecciona Categoría-</option>
                        {categorias.map(categoria =>(
                            <option value={categoria.strCategory} key= {categoria.strCategory}>{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
    );
};

export default Formulario;