import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/firebaseAuth";
import Project from "../Project";
import StarRatings from "react-star-ratings";
import ModalAddRating from "../ModalAddRating";
import { getProject, getRatingProject } from "../firebase/database";

const DetallesProject = () => {
  const { user } = useContext(UserContext);
  const { idProject } = useParams();
  const [project, setProject] = useState();
  const [fecha, setFecha] = useState();
  const [ratings, setRatings] = useState([]);
  const [showModalRating, setShowModalRating] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const projectData = await getProject(idProject);
      const options = { year: "numeric", month: "long", day: "numeric" };
      setProject(projectData);
      let newDate=ConvertirFecha(projectData.dataProject.fechaProject);
      setFecha(newDate.toLocaleString("es-ES", options));
      let preRatings = [];
      const dataRatings = await getRatingProject(idProject);

      dataRatings.forEach((rating) => {
        const { comentarioUser, calificacionUser, fechaRating, idRating } = rating.ratingData;
        let date = ConvertirFecha(fechaRating)
        let ratingFecha = date.toLocaleString("es-ES", options);
        let ratingHora = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        preRatings.push({
          userData: rating.userData,
          ratingData: {
            comentarioUser: comentarioUser,
            calificacionUser: calificacionUser,
            fechaRating: ratingFecha,
            horaRating: ratingHora,
            idRating: idRating,
          },
        });
      });
      setRatings(preRatings);
    };
    getData();
  }, [idProject]);

  const ConvertirFecha = (timestamp) => {
    const milisegundos = timestamp.seconds * 1000;
    const date = new Date(milisegundos);
    return date;
  };

  if (!project) {
    return (
      <div className="container">
        <p>
          Cargando Proyecto{" "}
          <svg
            className="w-8 h-8 ml-12 animate-spin origin-center align-middle"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <Project project={project} fecha={fecha} />
        <div className="bg-white items-stretch">
          <div className="flex flex-row">
            <h3 className="p-2 items-start font-bold">Comentarios</h3>
            {user ? (
              <button
                onClick={() => setShowModalRating(true)}
                className="absolute right-4 mr-5 text-xl font-semibold mt-2 rounded-md bg-red-600 text-white p-1 hover:bg-red-800 shadow hover:shadow-md"
              >
                Calificar
              </button>
            ) : (
              <p className="absolute right-0 mr-5 pr-2 mt-2 text-xl font-semibold text-black hover:text-blue-600 cursor-default">
                Reg&iacute;strate o inicia sesi&oacute;n para calificar el proyecto
              </p>
            )}
          </div>
          {showModalRating ? <ModalAddRating idProject={idProject} setShowModalRating={setShowModalRating} /> : null}
          <div className="border-separate border border-blue-400 w-full">
            {!(ratings.length > 0) ? (
              <div>
                <h2 className="font-semibold text-xl m-5">No tiene comentarios</h2>
              </div>
            ) : (
              ratings.map((rating) => {
                const { userphotoURL, userName } = rating.userData;
                const { calificacionUser, comentarioUser, fechaRating, horaRating, idRating } = rating.ratingData;
                return (
                  <div key={idRating} className="m-2 p-2 border-2 border-gray-400 flex-col flex">
                    <div className="flex-row flex">
                      <img src={userphotoURL} className="m-2 rounded-full h-10 w-10" alt="" />
                      <div className="flex-col flex items-center mt-2">
                        <p className="text-sm ml-2 origin-bottom">{userName}</p>
                        <div className="absolute py-2 px-2 ml-2">
                          <StarRatings
                            rating={calificacionUser}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            name="rating"
                            starDimension="20px"
                            starSpacing="1px"
                          />
                        </div>
                      </div>
                      <p className="absolute text-sm mt-4 mr-2 right-9 text-gray-500">
                        Calificado el {fechaRating} a las {horaRating}
                      </p>
                    </div>
                    <div className="text-start ml-6 mb-2 text-base">
                      <p>{comentarioUser}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default DetallesProject;
