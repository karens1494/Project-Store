import React from "react";
import imgAdvertencia from "../images/advertencia.png";
import PropTypes from "prop-types";

function ModalMessage({ message, setShowModalMessage, setShowModalPrincipal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className=" block relative w-auto my-6 mx-auto max-w-sm">
          <div className=" bg-gray-200 z-50 border-1 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="relative p-2 ml-3 flex-auto flex-row flex">
              <img className=" w-12 h-12 mr-5 mt-5" src={imgAdvertencia} alt="" />
              <p className="my-4 font-semibold text-gray-800 text-lg leading-relaxed">{message}</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end border-solid border-gray-300 rounded-b">
              <button
                className="bg-blue-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => {
                  setShowModalMessage(false);
                  setShowModalPrincipal(false);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

ModalMessage.propTypes = {
  message: PropTypes.string.isRequired,
  setShowModalMessage: PropTypes.func.isRequired,
  setShowModalPrincipal: PropTypes.func.isRequired,
};

export default ModalMessage;
