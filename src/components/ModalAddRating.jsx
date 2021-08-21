import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
//import api from "../api";
import { UserContext } from "./context/firebaseAuth";
import StarRatings from "react-star-ratings";
import ModalMessage from "./ModalMessage";
import PropTypes from "prop-types";
import { createRatingProject } from "./firebase/database";

function ModalAddRating({ setShowModalRating, idProject }) {
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [rating, setRating] = useState({
    comentarioUser: "",
    calificacionUser: 0,
  });

  const { comentarioUser, calificacionUser } = rating;

  const actualizarRating = (e) => {
    setRating({
      ...rating,
      [e.target.name]: e.target.value,
    });
  };

  const setCalificacionUser = (newRating) => {
    setRating({
      ...rating,
      calificacionUser: newRating,
    });
  };

  const SubmitAddRating = async (e) => {
    e.preventDefault();

    if (comentarioUser.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    try {
      const resultado = await createRatingProject(comentarioUser, calificacionUser, idProject, user.uid);
      console.log(resultado);
      switch (resultado.message) {
        case "Calificacion agregada exitosamente":
          setShowModalRating(false);
          history.go(0);
          break;
        case "Calificacion de usuario ya existe":
          setMessage("Ya añadiste una calificación a este proyecto");
          setShowModalMessage(true);
          break;
        case "Usuario Propietario":
          setMessage("Eres el creador del proyecto, no puedes agregar una calificación");
          setShowModalMessage(true);
          break;
        default:
          throw resultado;
      }
    } catch (error) {
      alert("Ha ocurrido un error");
    }
  };

  return (
    <>
      {showModalMessage ? (
        <ModalMessage
          message={message}
          setShowModalMessage={setShowModalMessage}
          setShowModalPrincipal={setShowModalRating}
        />
      ) : null}
      <div className="justify-center items-center h-auto flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <div className="relative w-auto mx-auto max-w-3xl">
          <div className="z-20 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start p-2 h-full border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-xl font-semibold ml-2">Añadir Calificaci&oacute;n</h3>
              <button
                className="ml-auto bg-transparent border-0 text-black opacity-75 float-right leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalRating(false)}
              >
                <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none">X</span>
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
                <h4 className="m-2 text-base text-white text-center font-bold">Todos los campos son obligatorios</h4>
              </div>
            ) : null}
            {/*formulario*/}
            <div className="relative p-2 m-2 flex-auto">
              <form className="items-start w-full">
                <StarRatings
                  rating={calificacionUser}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name="calificacionUser"
                  changeRating={setCalificacionUser}
                />
                <div className="text-base">
                  <label className=" block text-gray-500 font-medium m-1">Escribe tu comentario</label>
                  <textarea
                    required
                    value={comentarioUser}
                    onChange={actualizarRating}
                    className="font-semibold border-2 rounded-md w-full p-2 focus:outline-none"
                    name="comentarioUser"
                  />
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end pt-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModalRating(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className=" bg-blue-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 p-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                    type="button"
                    onClick={SubmitAddRating}
                  >
                    Guardar Calificaci&oacute;n
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
    </>
  );
}

ModalAddRating.propTypes = {
  setShowModalRating: PropTypes.func.isRequired,
  idProject: PropTypes.string.isRequired,
};

export default ModalAddRating;
