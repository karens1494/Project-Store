import React, { useState } from "react";
import { authFacebook, authGoogle, firebaseAuth, userSignOut } from "../firebase/config";
import { useHistory } from "react-router-dom";
import logoFacebook from "../../images/logo-facebook-auth.png";
import logoGoogle from "../../images/logo-google.png";
import { createUser } from "../firebase/database";
import ModalMessage from "../ModalMessage";
import PropTypes from "prop-types";

const ModalRegister = ({ setModalRegister }) => {
  const history = useHistory();
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState();

  const registerUser = async (provider) => {
    try {
      await firebaseAuth()
        .signInWithPopup(provider)
        .then(async (result) => {
          const credential = result.credential;
          const token = credential.accessToken;
          const userRegister = {
            userId: result.user.uid,
            userName: result.user.displayName,
            userEmail: result.user.email,
            userphotoURL: `${result.user.photoURL}?access_token=${token}`,
          };

          if (provider === authFacebook) {
            result.user.updateProfile({
              photoURL: userRegister.userphotoURL,
            });
          }
          console.log(userRegister);
          const resultado = await createUser(userRegister);
          console.log(resultado.message);
          switch (resultado.message) {
            case "Realizado":
              history.go(0);
              break;
            case "Registrado":
              alert("Usuario ya registrado, por favor inicie sesión");
              setMessage();
              setShowModalMessage(true);
              userSignOut();
              break;
          }
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error ${errorCode}: ${errorMessage}`);
    }
  };

  return (
    <>
      {showModalMessage ? (
        <ModalMessage
          message={message}
          setShowModalMessage={setShowModalMessage}
          setShowModalPrincipal={setModalRegister}
        />
      ) : null}
      <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="bg-content bg-login border-0 h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div
                onClick={() => setModalRegister(false)}
                className="flex items-start justify-between p-2 border-gray-300 rounded-t"
              >
                <button className="ml-auto  text-black font-semibold opacity-75 border-0 float-right text-3xl leading-none outline-none focus:outline-none">
                  X
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto items-center text-center">
                <img src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" className="rounded-full m-auto w-24 h-24" alt="" />
                <h1 className="p-2 text-center font-header m-auto text-5xl">BIENVENIDO!</h1>
                {/* <button
                  className="inline-flex items-center bg-facebook border-2 text-white active:bg-blue-800 font-bold text-lg rounded-3xl hover:shadow-2xl focus:outline-none p-2 mb-2 w-4/5"
                  onClick={() =>
                    registerUser(authFacebook).then(() => {
                      history.go(0);
                    })
                  }
                >
                  <img src={logoFacebook} className="mr-2 w-8 h-8 rounded-full" alt="" />
                  <span className="align-middle text-justify">Continuar con Facebook</span>
                </button> */}
                <button
                  className="inline-flex items-center bg-google border-2 text-black active:bg-blue-800 font-bold text-lg rounded-3xl hover:shadow-2xl focus:outline-none p-2 mb-2 w-4/5"
                  onClick={() =>
                    registerUser(authGoogle).then(() => {
                      history.go(0);
                    })
                  }
                >
                  <img src={logoGoogle} className="mr-2 w-8 h-8 rounded-full" alt="" />
                  <span className="text-center">Continuar con Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </>
  );
};

ModalRegister.propTypes = {
  setModalRegister: PropTypes.func.isRequired,
};

export default ModalRegister;
