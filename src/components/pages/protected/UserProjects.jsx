import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CardProject from "../../CardProject";
import AddProject from "../../AddProject";
import { UserContext } from "../../context/firebaseAuth";
import { deleteProject, getUserProjects } from "../../firebase/database";

const UserProjects = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [checking, setChecking] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const userProjects = await getUserProjects(user.uid);
        setProjects(userProjects);
        setChecking(false);
      } catch (error) {
        alert("Ha ocurrido un error");
      }
    };
    getData();
  }, [user.uid]);

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center">
        <h2 className="text-5xl origin-center m-auto">Espere...</h2>
      </div>
    );
  }

  const DeleteProject = async (projectId) => {
    try {
      let response = await deleteProject(user.uid, projectId);
      if (response.success === false) {
        throw response;
      }else{
        history.go(0)
      }
    } catch (error) {
      alert("Ha ocurrido un error");
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex-grow text-2xl bg-body ml-2">
          <div className="">
            <h1 className="font-bold mt-2">Mis Proyectos</h1>
          </div>
          <hr className="mt-4 border-b-4 border-black mr-2 self-center" />
          <button
            onClick={() => setShowModal(true)}
            className=" text-lg mt-4  mb-8 rounded-lg px-2 py-1 text-center bg-black text-white shadow font-semibold hover:border-none hover:shadow-2xl"
          >
            Crear Proyecto
          </button>
          {showModal ? <AddProject setShowModal={setShowModal} /> : null}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {(projects.length > 0) ? (
              projects.map((project) => {
                return (
                  <div className="relative" key={project.idProject}>
                    <div className="relative">
                      <button
                        onClick={() => DeleteProject(project.idProject)}
                        className="p-1 rounded-md bg-red-700 absolute ml-6 -my-10 text-center text-lg font-semibold text-white left-0"
                      >
                        Eliminar
                      </button>
                      <Link to={`userProjects/projects/${project.idProject}`}>
                        <CardProject
                          key={project.idProject}
                          nameProject={project.dataProject.nameProject}
                          logoProject={project.dataProject.logoProject}
                          calificacionProject={project.dataProject.calificacionProject}
                        ></CardProject>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="container">
                <h1>No tienes proyectos</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        history.replace("/")
      )}
    </div>
  );
};

export default UserProjects;
