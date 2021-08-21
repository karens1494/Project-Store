import React from "react";
import logoFacebook from "../../images/logo-facebook-auth.png";
import logoGoogle from "../../images/logo-google.png";
import { authFacebook, authGoogle, firebaseAuth } from "../firebase/config";

const ModalLogin = ({ setModalLogin }) => {
  const IniciarSesion = (provider) => {
    firebaseAuth()
      .signInWithPopup(provider)
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          alert("La cuenta esta asociada a otro proveedor, por favor inicie sesión con el proveedor registrado");
        }
      });
  };

  return (
    <>
      <div>
        <div className="items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="bg-content bg-login border-0 h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-2 border-gray-300 rounded-t">
                <button
                  onClick={() => {
                    setModalLogin(false);
                  }}
                  className="ml-auto  text-black font-semibold opacity-75 border-0 float-right text-3xl leading-none outline-none focus:outline-none"
                >
                  X
                </button>
              </div>

              {/*body*/}
              <div className="relative p-6 flex-auto items-center text-center">
                <img src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" className="rounded-full m-auto w-24 h-24 origin-center" alt="" />
                <h1 className="p-2 text-center font-header m-auto text-5xl">BIENVENIDO!</h1>
                <div className="container items-center">
                  {/* <button
                    onClick={() => IniciarSesion(authFacebook)}
                    className=" mt-6 inline-flex items-center bg-facebook border-2 text-white active:bg-blue-800 font-bold text-lg rounded-3xl hover:shadow-2xl focus:outline-none p-2 mb-2 w-11/12"
                  >
                    <img src={logoFacebook} className="mr-2 w-8 h-8 rounded-full" alt="" />
                    <span className="align-middle text-justify">Continuar con Facebook</span>
                  </button> */}
                  <button
                    onClick={() => {
                      IniciarSesion(authGoogle);
                    }}
                    className="inline-flex items-center bg-google border-2 text-black active:bg-blue-800 font-bold text-lg rounded-3xl hover:shadow-2xl focus:outline-none p-2 mb-2 w-11/12"
                  >
                    <img src={logoGoogle} className="mr-2 w-8 h-8 rounded-full" alt="" />
                    <span className="text-center">Continuar con Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </>
  );
};

export default ModalLogin;
