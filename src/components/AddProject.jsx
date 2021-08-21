import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import api from "../api";
import { UserContext } from "./context/firebaseAuth";
import PropTypes from "prop-types";
import { createProjectUser, getCategorias, getTiposProjects } from "./firebase/database";

function AddProject({ setShowModal }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [tiposProjects, setTiposProjects] = useState([]);
  const [checking, setChecking] = useState(true);
  const [project, setProject] = useState({
    nameProject: "",
    bannerProject: "",
    logoProject: "",
    fechaProject: "",
    urlProject: "",
    palabrasclaveProject: "",
    descripcioncProject: "",
    descripcionlProject: "",
    categoriaProject: "",
    tipoProject: "",
  });
  const [error, setError] = useState(false);

  const {
    nameProject,
    bannerProject,
    logoProject,
    fechaProject,
    descripcionlProject,
    descripcioncProject,
    urlProject,
    categoriaProject,
    tipoProject,
    palabrasclaveProject,
  } = project;

  const actualizarProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const obtenerData = async () => {
      try {
        const resCategories = await getCategorias();
        setCategorias(resCategories);
        const resTiposProjects = await getTiposProjects();
        setTiposProjects(resTiposProjects);
      } catch (error) {
        alert(error.message);
      }
      setChecking(false);
    };
    obtenerData();
  }, []);

  const isUrlValid = (urlInput) => {
    var res = urlInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  };

  const SubmitProject = async (e) => {
    e.preventDefault();

    if (
      nameProject.trim() === "" ||
      logoProject.trim() === "" ||
      fechaProject.trim() === "" ||
      descripcionlProject.trim() === "" ||
      descripcioncProject.trim() === "" ||
      palabrasclaveProject.trim() === ""
    ) {
      setError(true);
      return;
    }

    if (!isUrlValid(bannerProject) || !isUrlValid(logoProject) || !isUrlValid(urlProject)) {
      setError(true);
      return;
    }

    setError(false);

    try {
      let response = await createProjectUser(project, user.uid);
      if (response.success === false) {
        throw response;
      } else {
        history.go(0);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center">
        <h2 className="text-5xl origin-center m-auto">Cargando...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="justify-center items-center h-auto flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start p-2 h-full border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold ml-2">Crear Proyecto</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-75 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            {error ? (
              <div className="bg-red-600 items-center p-2 m-2 h-12 flex-row flex">
                <svg
                  className=" text-white w-8 h-8 m-2 font-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h4 className="m-2 text-lg text-white text-center font-bold">
                  Todos los campos son obligatorios y con formato v&aacute;lido
                </h4>
              </div>
            ) : null}
            {/*formulario*/}
            <div className="relative p-2 m-2 flex-auto">
              <form className="items-start w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="m-5">
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className=" block text-gray-500 font-medium">Nombre de Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <svg
                          className="h-6 w-6 m-1 mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <input
                          type="text"
                          required
                          value={nameProject}
                          onChange={actualizarProject}
                          placeholder="Proyecto"
                          className="font-semibold border-transparent rounded-md w-full p-2 focus:outline-none"
                          name="nameProject"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className="  block text-gray-500 font-medium">Logo del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <svg
                          className="h-6 w-6 m-1 mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <input
                          type="url"
                          id="url-type-styled-input"
                          required
                          value={logoProject}
                          onChange={actualizarProject}
                          placeholder="URL del Logo de Proyecto"
                          className="font-semibold w-full p-2 border-transparent rounded-md focus:outline-none"
                          name="logoProject"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className="  block text-gray-500 font-medium">Banner del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <svg
                          className="h-6 w-6 m-1 mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <input
                          type="url"
                          id="url-type-styled-input"
                          required
                          value={bannerProject}
                          onChange={actualizarProject}
                          placeholder="URL del Banner de Proyecto"
                          className="font-semibold w-full p-2 focus:outline-none border-transparent rounded-md"
                          name="bannerProject"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className="  block text-gray-500 font-medium">Categor&iacute;a del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <svg
                          className="h-6 w-6 m-1 mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <select
                          name="categoriaProject"
                          required
                          value={categoriaProject}
                          onChange={actualizarProject}
                          className="font-semibold w-full p-2 focus:outline-none border-transparent rounded-md"
                        >
                          <option>-Seleccione una opci&oacute;n-</option>
                          {categorias
                            ? categorias.map((categoria) => {
                                return (
                                  <option key={categoria} value={categoria}>
                                    {categoria}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                    </div>

                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className=" text-gray-500 block font-medium">Tipo de Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <svg
                          className="h-6 w-6 m-1 mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                        <select
                          name="tipoProject"
                          required
                          value={tipoProject}
                          onChange={actualizarProject}
                          className="font-semibold w-full p-2 focus:outline-none border-transparent rounded-md"
                        >
                          <option value="">-Seleccione una opci&oacute;n-</option>
                          {tiposProjects
                            ? tiposProjects.map((tipo) => {
                                return (
                                  <option key={tipo} value={tipo}>
                                    {tipo}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="m-4">
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className="  block text-gray-500 font-medium">URL del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <input
                          type="url"
                          id="url-type-styled-input"
                          required
                          value={urlProject}
                          onChange={actualizarProject}
                          placeholder="URL del Proyecto"
                          className=" font-semibold w-full p-2 border-transparent rounded-md focus:outline-none"
                          name="urlProject"
                        />
                        <svg
                          className="h-6 w-6 mr-3 mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base font-semibold">
                      <label className=" block text-gray-500 font-medium">Fecha del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <input
                          type="date"
                          required
                          value={fechaProject}
                          onChange={actualizarProject}
                          className=" w-full p-2 border-transparent rounded-md focus:outline-none"
                          name="fechaProject"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className="  block text-gray-500 font-medium">Descripci&oacute;n Corta del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <textarea
                          required
                          onChange={actualizarProject}
                          value={descripcioncProject}
                          className="font-semibold border-transparent rounded-md w-full p-2 focus:outline-none"
                          name="descripcioncProject"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4 text-base">
                      <label className="  block text-gray-500 font-medium">Descripci&oacute;n Larga del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <textarea
                          required
                          onChange={actualizarProject}
                          value={descripcionlProject}
                          className="font-semibold border-transparent rounded-md w-full p-2 focus:outline-none"
                          name="descripcionlProject"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-base">
                      <label className="  block text-gray-500 font-medium">Palabras Clave del Proyecto</label>
                      <div className="flex flex-row border-2 border-blue-400 rounded-md">
                        <input
                          required
                          onChange={actualizarProject}
                          value={palabrasclaveProject}
                          className="font-semibold border-transparent rounded-md w-full p-2 focus:outline-none"
                          name="palabrasclaveProject"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className=" bg-blue-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 p-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={SubmitProject}
                  >
                    Guardar Proyecto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

AddProject.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};

export default AddProject;
