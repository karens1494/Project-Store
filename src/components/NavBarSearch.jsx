import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function NavBarSearch({ palabraBusqueda, tipoBusqueda, ActualizarBusqueda }) {
  let history = useHistory();

  const Buscar = () => {
    if (palabraBusqueda.trim() === "") {
      history.push("/");
    } else {
      history.replace(`/search/${tipoBusqueda}/${palabraBusqueda}`);
      history.go(0);
    }
  };

  return (
    <div className="flex flex-row m-4 p-2 justify-items-center ">
      <input
        className=" text-sm p-2 mr-2 rounded-md"
        placeholder="Buscar..."
        name="palabraBusqueda"
        value={palabraBusqueda}
        onChange={ActualizarBusqueda}
      />
      <select
        name="tipoBusqueda"
        onChange={ActualizarBusqueda}
        value={tipoBusqueda}
        className=" rounded-md text-sm mr-2 p-1"
      >
        <option value="project">Proyecto</option>
        <option value="categoria">Categor&iacute;a</option>
        <option value="tipoProject">Tipo de Proyecto</option>
        <option value="palabrasclave">Palabra Clave</option>
      </select>

      <button className="border bg-gray-500 rounded-md text-white p-2 hover:bg-gray-800" onClick={() => Buscar()}>
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
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
