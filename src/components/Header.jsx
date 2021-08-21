import React, { useState, useContext } from "react";
//import avatarDefault from '../images/avatar-default.png';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./context/firebaseAuth";
import { firebaseAuth } from "./firebase/config";
import ModalLogin from "./auth/ModalLogin";
import ModalRegister from "./auth/ModalRegister";

const Header = () => {
  const [menuShow, setMenuShow] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  return (
    <nav className=" bg-header">
      <div className="w-auto h-24 px-2">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start mt-6">
            <div className="flex items-center">
              {/* <img className=" h-24 w-24" src={logoAppland} alt="Appland" /> */}
              <Link to="/" className="cursor-pointer text-4xl font-bold text-white font-header">
                Project Store
              </Link>
            </div>
          </div>
          {user ? (
            <div className="absolute inset-y-0 z-10 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-white flex text-sm mt-8 rounded-full focus:outline-none focus:ring-offset-gray-800 "
                    onClick={() => {
                      menuShow ? setMenuShow(false) : setMenuShow(true);
                    }}
                  >
                    <img className="h-14 w-14 rounded-full" src={user.photoURL} alt="foto de perfil" />
                  </button>
                </div>
                <div
                  className={
                    (menuShow ? "block " : "hidden ") +
                    "origin-top-right absolute right-0 list-none mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  }
                  aria-orientation="vertical"
                >
                  <button
                    onClick={() => {
                      setMenuShow(false);
                      history.replace("/userProjects");
                    }}
                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 focus:cursor-pointer"
                  >
                    Mis Proyectos
                  </button>
                  <button
                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    onClick={() => {
                      setMenuShow(false);
                      firebaseAuth().signOut();
                      history.replace("/");
                    }}
                  >
                    Cerrar Sesi&oacute;n
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 ">
              <div className="ml-3 block">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 my-4 mt-10 ">
                    <button
                      onClick={() => setModalLogin(true)}
                      className="bg-transparent border-white border-2 text-white font-bold uppercase text-sm px-4 py-3 rounded-3xl shadow hover:shadow-2xl outline-none"
                      type="button"
                    >
                      Iniciar Sesi&oacute;n
                    </button>
                    <button
                      onClick={() => setModalRegister(true)}
                      className="bg-black border-black border-2 text-white font-bold uppercase text-sm px-4 py-3 rounded-3xl shadow hover:shadow-2xl outline-none"
                      type="button"
                    >
                      Registrarse
                    </button>
                    {modalLogin ? <ModalLogin setModalLogin={setModalLogin} /> : null}
                    {modalRegister ? <ModalRegister setModalRegister={setModalRegister} /> : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
