import React from "react";
import PropTypes from "prop-types";

function Project({ project, fecha }) {
  const {
    bannerProject,
    logoProject,
    descripcioncProject,
    descripcionlProject,
    urlProject,
    palabrasclaveProject,
    nameProject,
    calificacionProject,
    categoriaProject,
    tipoProject,
  } = project.dataProject;

  return (
    <div className="relative">
      <div className="relative z-0">
        <img src={bannerProject} className="static w-full h-64 mb-4" alt="" />
        <img src={logoProject} className="absolute top-3/4 mr-5 right-5 h-24 w-24 rounded-lg" alt="" />
      </div>
      <div className="m-4">
      <div>
        <h1 className="font-bold text-center text-4xl">{nameProject}</h1>
        <p className="text-center mt-2 mb-5 text-base">{descripcioncProject}</p>
      </div>
      <div className="flex pt-0 mt-10 pb-4">
        <img className="h-14 w-14 rounded-full" src={project.userphotoURL} alt="avatar de usuario" alt="" />
        <h4 className="align-middle text-lg ml-3 font-semibold mt-4">{project.userName}</h4>
        <div className="absolute right-0 mt-3 mr-6">
          <p className="text-lg">Fecha de creaci&oacute;n: {fecha}</p>
        </div>
      </div>
      <div className="relative mt-5 pb-6 mb-8 flex-row flex m-2">
        <p className="absolute left-0  top-0  text-lg">
          <b>Categoría: </b>
          {categoriaProject}
        </p>
        <p className="absolute right-0 top-0 text-lg">
          <b>Tipo de Proyecto: </b>
          {tipoProject}
        </p>
      </div>
      {descripcionlProject.map((parrafo) => {
        return (
          <div key={parrafo} className="text-justify text-lg font-light mb-2 m-2">
            {parrafo}
          </div>
        );
      })}
      <div className="flex text-justify text-lg mb-2 mt-6 whitespace-pre-line">
        <h5 className="mr-3 font-semibold">Palabras Clave: </h5>
        {palabrasclaveProject.map((palClave) => {
          return (
            <div key={palClave}>
              <p className="mr-3 ml-3 bg-gray-300 rounded-md px-2 cursor-pointer">{palClave}</p>
            </div>
          );
        })}
      </div>
      <div className="flex text-justify text-lg mb-6 whitespace-pre-line">
        <h5 className="mr-1 font-semibold">Calificaci&oacute;n Promedio:</h5>
        <p className="mr-1 ml-1 px-2 font-semibold">{calificacionProject}</p>
        <a
          className="mb-5 mr-5 absolute right-0 bg-gray-800 text-white p-2 rounded-md cursor-pointer"
          href={urlProject}
          target="_blank"
        >
          Previsualizaci&oacute;n
        </a>
      </div>
      </div>
    </div>
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  fecha: PropTypes.string,
};

export default Project;
