import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProject from "./CardProject";
import PropTypes from "prop-types";

const ProjectList = ({ projects }) => {
  const [sort, setSort] = useState("ascendente");
  const [sortprojects, setSortprojects] = useState();
  const [isSorted, setIsSorted] = useState(true);

  const ActualizarSorted = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  useEffect(() => {
    const sorted = [...projects].sort((a, b) => {
      let value = 0;
      if (a.calificacionProject < b.calificacionProject) {
        value = sort === "ascendente" ? 1 : -1;
      }
      if (a.calificacionProject > b.calificacionProject) {
        value = sort === "ascendente" ? -1 : 1;
      }
      return value;
    });
    setSortprojects(sorted);
    setIsSorted(false);
  }, [sort, projects]);

  if (isSorted) {
    return (
      <div className="h-auto">
        <p>No hay Proyectos</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="flex-row-reverse flex mr-6">
        <select className=" text-sm rounded-md p-2" onChange={ActualizarSorted}>
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
        </select>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6 w-full justify-center">
        {sortprojects.map((project) => {
          return (
            <Link key={project.idProject} to={`/projects/${project.idProject}`}>
              <CardProject
                key={project.idProject}
                nameProject={project.nameProject}
                logoProject={project.logoProject}
                calificacionProject={project.calificacionProject}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectList;
