import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../context/firebaseAuth";
import { getProject } from "../../firebase/database";
import Project from "../../Project";

const DetallesProject = () => {
  const { idProject } = useParams();
  const [project, setProject] = useState({});
  const [fecha, setFecha] = useState();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let projectData = await getProject(idProject);
        setProject(projectData);
        ConvertirFecha(projectData.dataProject.fechaProject);
      } catch (error) {
        alert("Ha ocurrido un error");
      }
      setLoading(false);
    };
    getData();
  }, [idProject]);

  const ConvertirFecha = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const milisegundos = timestamp.seconds * 1000;
    const date = new Date(milisegundos);
    const fecha = date.toLocaleString("es-ES", options);
    setFecha(fecha);
  };

  if (loading) {
    return (
      <div className="container">
        <p>Cargando Proyecto...</p>
      </div>
    );
  } else {
    return (
      <div>
        {user ? (
          <div className="mt-4">
            <button
              onClick={() => history.goBack()}
              className=" items-center flex flex-row rounded-lg w-28 font-sans h-8 mb-2 bg-blue-600 text-white"
            >
              <svg
                className="w-5 h-5 ml-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              <p className="origin-center text-base font-semibold">Volver</p>
            </button>
            {/* {project !== {} ? <Project project={project} fecha={fecha} key={idProject} /> : null} */}
            <Project project={project} fecha={fecha} key={idProject} />
          </div>
        ) : (
          history.replace("/")
        )}
      </div>
    );
  }
};

export default DetallesProject;
