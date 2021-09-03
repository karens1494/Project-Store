import { firestoreDB, timestamp } from "./config";

export const getAllProjects = async () => {
  let projects = [];
  try {
    const data = await firestoreDB.collectionGroup("projects").get();
    data.forEach((doc) => {
      projects.push({
        idProject: doc.id,
        nameProject: doc.data().nameProject,
        logoProject: doc.data().logoProject,
        calificacionProject: doc.data().calificacionProject,
      });
    });
  } catch (error) {
    projects = [];
    console.log(error);
  }
  return projects;
};

export const getUserProjects = async (idUser) => {
  let projectsUser = [];
  try {
    const data = await firestoreDB.collection(`users/${idUser}/projects`).get();
    data.forEach((doc) => {
      projectsUser.push({
        idProject: doc.id,
        dataProject: doc.data(),
      });
    });
  } catch (error) {
    projectsUser = [];
    console.log(error);
  }
  return projectsUser;
};

export const getSearchProjects = async (palabraBusqueda, tipoBusqueda) => {
  let projectsFilter = [];
  try {
    let data = {};
    switch (tipoBusqueda) {
      case "palabrasclave":
        data = await firestoreDB
          .collectionGroup("projects")
          .where("palabrasclaveProject", "array-contains", palabraBusqueda)
          .get();
        break;
      case "project":
        data = await firestoreDB.collectionGroup("projects").where("nameProject", "==", palabraBusqueda).get();
        break;
      case "categoria":
        data = await firestoreDB.collectionGroup("projects").where("categoriaProject", "==", palabraBusqueda).get();
        break;
      case "tipoProject":
        data = await firestoreDB.collectionGroup("projects").where("tipoProject", "==", palabraBusqueda).get();
        break;
      default:
        break;
    }
    data.forEach((doc) => {
      projectsFilter.push({
        idProject: doc.id,
        dataProject: doc.data(),
      });
    });
  } catch (error) {
    projectsFilter = [];
    console.log(error);
  }
  return projectsFilter;
};

export const createUser = async (userRegister) => {
  let response = {};
  console.log(userRegister);
  const { userId, userName, userEmail, userphotoURL } = userRegister;
  const newUser = {
    userName: userName,
    userEmail: userEmail,
    userphotoURL: userphotoURL,
  };
  try {
    const user = await firestoreDB.collection("users").doc(userId).get();
    if (user.exists) {
      response = { message: "Registrado" };
    } else {
      await firestoreDB.collection("users").doc(userId).set(newUser);
      response = { message: "Realizado" };
    }
  } catch (error) {
    response = { message: error.message };
  }
  return response;
};

export const getCategorias = async () => {
  let response = [];
  try {
    let query = await firestoreDB.collection("Categorías").get();
    response = query.docs.map((category) => category.data().nombreCategoria);
  } catch (error) {
    console.log(`Error ${error.code}: ${error.message}`);
    response = [];
  }
  return response;
};

export const getTiposProjects = async () => {
  let response = [];
  try {
    let query = await firestoreDB.collection("TipoProyecto").get();
    response = query.docs.map((category) => category.data().nombreTipo);
  } catch (error) {
    console.log(`Error ${error.code}: ${error.message}`);
    response = [];
  }
  return response;
};

export const createProjectUser = async (project, idUser) => {
  let response = {};
  try {
    const {
      fechaProject,
      nameProject,
      bannerProject,
      logoProject,
      descripcioncProject,
      descripcionlProject,
      urlProject,
      categoriaProject,
      tipoProject,
      palabrasclaveProject,
    } = project;
    const date = new Date(fechaProject);

    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const fecha = timestamp.fromDate(date);
    const palabrasclave = palabrasclaveProject.split(",");
    const descripcionl = descripcionlProject.match(/[^\r\n]+/g);

    const newProject = {
      nameProject: nameProject,
      bannerProject: bannerProject,
      logoProject: logoProject,
      descripcioncProject: descripcioncProject,
      descripcionlProject: descripcionl,
      urlProject: urlProject,
      categoriaProject: categoriaProject,
      tipoProject: tipoProject,
      palabrasclaveProject: palabrasclave,
      fechaProject: fecha,
      calificacionProject: 0,
    };

    await firestoreDB.collection(`users/${idUser}/projects`).add(newProject);
    response = { success: true, message: "Proyecto creado exitosamente" };
  } catch (error) {
    console.log(`Error ${error.code}: ${error.message}`);
    response = { success: false, message: "Ha habido un error" };
  }

  return response;
};

export const getProject = async (idProject) => {
  let resProjects = [];

  let resUsers = await firestoreDB.collection("users").get();

  let resultado = resUsers.docs.map(async (user) => {
    let data = await firestoreDB.doc(`users/${user.id}/projects/${idProject}`).get();
    if (data.exists) {
      return {
        idUser: user.id,
        idProject: data.id,
        userphotoURL: user.data().userphotoURL,
        userName: user.data().userName,
        dataProject: data.data(),
      };
    }
  });
  resProjects = await Promise.all(resultado);
  let response = resProjects.find((value) => value !== undefined);
  return response;
};

export const deleteProject = (userId, projectId) => {
  let response = {};
  firestoreDB
    .collection(`users/${userId}/projects`)
    .doc(projectId)
    .delete()
    .then(function () {
      response = { success: true, message: "Proyecto eliminado exitosamente" };
    })
    .catch(function (error) {
      console.error(error);
      response = { success: false, message: "Hubo un error" };
    });
  return response;
};

export const getRatingProject = async (idProject) => {
  let response = [];
  try {
    const ratingsSnapshot = await firestoreDB.collection("calificaciones").where("idProject", "==", idProject).get();

    const promises = [];

    ratingsSnapshot.forEach((rating) => {
      const u = firestoreDB.doc(`users/${rating.data().idUser}`).get();
      promises.push(u);
    });

    const users = await Promise.all(promises);

    const results = [];
    ratingsSnapshot.forEach((rating) => {
      const datauser = users.filter((user) => user.id === rating.data().idUser);
      const { comentario, calificacion, fechaRating } = rating.data();

      results.push({
        userData: {
          userName: datauser[0].data().userName,
          userphotoURL: datauser[0].data().userphotoURL,
        },
        ratingData: {
          idRating: rating.id,
          comentarioUser: comentario,
          calificacionUser: calificacion,
          fechaRating: fechaRating,
        },
      });
    });

    results.sort((a, b) => {
      return new Date(b.ratingData.fechaRating) - new Date(a.ratingData.fechaRating);
    });
    response = results;
  } catch (error) {
    console.error(error);
    response = [];
  }
  return response;
};

export const createRatingProject = async (comentarioUser, calificacionUser, idProject, userId) => {
  let response = {};
  const date = Date.now();
  const fecha = timestamp.fromMillis(date);
  try {
    const project = await firestoreDB.doc(`users/${userId}/projects/${idProject}`).get();
    if (project.exists) {
      response = { message: "Usuario Propietario" };
      throw response;
    } else {
      let data = await firestoreDB
        .collection("calificaciones")
        .where("idProject", "==", idProject)
        .where("idUser", "==", userId)
        .get();

      if (!data.empty) {
        response = { message: "Calificacion de usuario ya existe" };
        throw response;
      } else {
        firestoreDB.collection("calificaciones").add({
          idUser: userId,
          idProject: idProject,
          fechaRating: fecha,
          comentario: comentarioUser,
          calificacion: calificacionUser,
        });

        const ratingsSnapshot = await firestoreDB
          .collection("calificaciones")
          .where("idProject", "==", idProject)
          .get();
        let sumaRatings = 0;
        let cantRatings = 0;
        ratingsSnapshot.forEach((rating) => {
          sumaRatings = sumaRatings + rating.data().calificacion;
          cantRatings = cantRatings + 1;
        });

        const projectsData = await firestoreDB.collectionGroup("projects").get();

        projectsData.forEach((project) => {
          if (project.id === idProject) {
            project.ref.set({
              ...project.data(),
              calificacionProject: sumaRatings / cantRatings,
            });
          }
        });
        response = { message: "Calificacion agregada exitosamente" };
      }
    }
  } catch (error) {
    console.error(error);
    response = { message: error.message };
  }
  return response;
};
