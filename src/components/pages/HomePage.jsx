import React, { useState, useEffect } from "react";
import { getAllProjects } from "../firebase/database";
import ProjectList from "../ProjectList";

export default function HomePage() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    const getProjects = async () => {
      const refProjects = await getAllProjects();
      setProjects(refProjects);
    };
    getProjects();
  }, []);

  if (!projects) {
    return (
      <div className="mx-4">
        <p>No hay Proyectos</p>
      </div>
    );
  } else {
    return <ProjectList projects={projects} />;
  }
}
