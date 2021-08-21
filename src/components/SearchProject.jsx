import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectList from "./ProjectList";
import { getSearchProjects } from "./firebase/database";

const SearchProject = () => {
  const { palabraBusqueda, tipoBusqueda } = useParams();
  const [projects, setProjects] = useState();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataProjects = await getSearchProjects(palabraBusqueda, tipoBusqueda);
        setProjects(dataProjects);
        setChecking(false);
      } catch (error) {
        alert("Ha ocurrido un error");
      }
    };
    getData();
  }, []);

  if (checking) {
    return (
      <div>
        <h4>Cargando Resultados...</h4>
      </div>
    );
  }

  if (!projects) {
    return (
      <div className="container">
        <p>No se encuentran elementos de la b&uacute;squeda</p>
      </div>
    );
  } else {
    return (
      <div>
        <ProjectList projects={projects} />
      </div>
    );
  }
};

export default SearchProject;
