import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const RecetasContext = createContext();

// crear el provider
const RecetasProvider = props => {
  // crear context
  const [recetas, guardarRecetas] = useState([]);
  const [consulta, guardarConsulta] = useState({
    nombre: "",
    categoria: ""
  });
  const [consultar, validarConsulta] = useState(false);

  const { nombre, categoria } = consulta;

  useEffect(() => {
    if (consultar) {
      const consultarAPI = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const respuesta = await axios.get(url);
        guardarRecetas(respuesta.data.drinks);
      }
      consultarAPI();
    }
  }, [consulta,nombre,categoria,consultar]);

  return (
    <RecetasContext.Provider value={{ recetas, guardarConsulta,validarConsulta }}>
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
