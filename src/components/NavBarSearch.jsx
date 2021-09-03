import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function NavBarSearch({ palabraBusqueda, tipoBusqueda, ActualizarBusqueda }) {
  let history = useHistory();

  const Buscar = () => {
    if (palabraBusqueda === "") {
      history.push("/");
    } else {
      history.replace(`/search/${tipoBusqueda}/${palabraBusqueda}`);
      history.go(0);
    }
  };

  return (
    <div className="flex-1 flex-col sm:flex-row m-4 items-center">
      <input
        className=" text-sm m-2 rounded-md h-8 p-1"
        placeholder="Buscar..."
        name="palabraBusqueda"
        value={palabraBusqueda}
        onChange={ActualizarBusqueda}
      />
      <select
        name="tipoBusqueda"
        onChange={ActualizarBusqueda}
        value={tipoBusqueda}
        className=" rounded-md text-sm m-2 h-8 p-1"
      >
        <option value="project">Proyecto</option>
        <option value="categoria">Categor&iacute;a</option>
        <option value="tipoProject">Tipo de Proyecto</option>
        <option value="palabrasclave">Palabra Clave</option>
      </select>

      <button className="bg-gray-500 text-sm w-8 h-full p-2 m-1  rounded-md text-white hover:bg-gray-800" onClick={Buscar}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}

NavBarSearch.propTypes = {
  palabraBusqueda: PropTypes.string.isRequired,
  tipoBusqueda: PropTypes.string.isRequired,
  ActualizarBusqueda: PropTypes.func.isRequired,
};

export default NavBarSearch;
