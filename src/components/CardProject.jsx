import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

const CardProject = ({ nameProject, logoProject, calificacionProject }) => {
  return (
    <div className="group border-2 border-gray-600 bg-white shadow-xl w-full m-4 rounded-xl hover:underline hover:shadow-2xl hover:scale-95 transform delay-150 transition duration-300 ease-in-out">
      <div className="m-auto items-center">
        <img src={logoProject} className=" h-40 w-full m-auto origin-center rounded-xl" alt=""/>
        <h1 className=" text-center font-semibold cursor-pointer m-2 align-middle text-xl">{nameProject}</h1>
        <div className="mb-2 text-center w-full">
          <StarRatings
            rating={calificacionProject}
            starRatedColor="yellow"
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="2px"
          />
        </div>
      </div>
    </div>
  );
};

CardProject.propTypes = {
  nameProject: PropTypes.string.isRequired,
  logoProject: PropTypes.string.isRequired,
  calificacionProject: PropTypes.number.isRequired,
};

export default CardProject;
