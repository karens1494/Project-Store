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
      if (a.calificacionProject < b.calificacionProject) {
        return sort === "ascendente" ? 1 : -1;
      }
      if (a.calificacionProject > b.calificacionProject) {
        return sort === "ascendente" ? -1 : 1;
      }
    });

    setSortprojects(sorted);
    setIsSorted(false);
  }, [sort]);

  if (isSorted) {
    return (
      <div className="h-auto">
        <p>No hay Proyectos</p>
      </div>
    );
  }

  return (
    <div className="mx-4">
      <div className="flex-row-reverse flex">
        <select className=" text-sm rounded-md p-2" onChange={ActualizarSorted}>
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
        </select>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
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
