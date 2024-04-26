/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function ListaPeliculas({ peliculas }) {
  return (
    <div className="pelicula">
      {peliculas.map((pelicula) => (
        <div
          key={pelicula.imbdID}
          className="grid grid-flow-col justify-center"
        >
          <div className="info-pelicula ">
            <h3>{pelicula.Title}</h3>
            <p className="font-bold">Año: {pelicula.Year}</p>
            <img src={pelicula.Poster} alt={pelicula.Title} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
