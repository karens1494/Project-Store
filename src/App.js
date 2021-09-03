import React, { useEffect, useState } from "react";
import HomePage from "./components/pages/HomePage";
import Header from "./components/Header";
import { firebaseAuth } from "./components/firebase/config";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import UserProjects from "./components/pages/protected/UserProjects";
import { UserContext } from "./components/context/firebaseAuth";
import DetallesProject from "./components/pages/DetallesProject";
import DetallesProjectsUser from "./components/pages/protected/DetallesProjectUser";
import SearchProject from "./components/SearchProject";
import NavBarSearch from "./components/NavBarSearch";

function App() {
  const [user, setUser] = useState();
  const [checking, setChecking] = useState(true);
  const [busqueda, setBusqueda] = useState({
    palabraBusqueda: "",
    tipoBusqueda: "project",
  });

  const ActualizarBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const { palabraBusqueda, tipoBusqueda } = busqueda;

  useEffect(() => {
    const unsubscribe = firebaseAuth().onAuthStateChanged((userActivo) => {
      if (userActivo) {
        setUser(userActivo);
        setChecking(false);
      } else {
        setUser(false);
        setChecking(false);
      }
      return unsubscribe;
    });
  });

  if (checking) {
    return (
      <div className="min-h-screen text-center items-center flex-col flex">
        <h2 className="text-5xl m-auto align-middle">
          Espere...
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
        </h2>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow text-2xl bg-body">
            <Switch>
              <Route exact path="/projects/:idProject">
                <DetallesProject />
              </Route>
              <Route path="/search/:tipoBusqueda/:palabraBusqueda">
                <div>
                  <NavBarSearch
                    palabraBusqueda={palabraBusqueda}
                    tipoBusqueda={tipoBusqueda}
                    ActualizarBusqueda={ActualizarBusqueda}
                  />
                  <SearchProject tipoBusqueda={tipoBusqueda} />
                </div>
              </Route>
              <Route exact path="/userProjects/projects/:idProject">
                <DetallesProjectsUser />
              </Route>
              <Route path="/userProjects" component={UserProjects} />
              <Route exact path="/">
                <div>
                  <NavBarSearch
                    palabraBusqueda={palabraBusqueda}
                    tipoBusqueda={tipoBusqueda}
                    ActualizarBusqueda={ActualizarBusqueda}
                  />
                  <HomePage />
                </div>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
