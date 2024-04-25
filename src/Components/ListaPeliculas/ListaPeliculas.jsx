/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function ListaPeliculas({ peliculas }) {
  return (
    <div className="peliculas">
      {peliculas.map((pelicula) => (
        <div key={pelicula.imbdID}>
          <div className="info-pelicula">
            <h3>{pelicula.Title}</h3>
            <p>Año: {pelicula.Year}</p>
            <img src={pelicula.Poster} alt={pelicula.Title} />
            <p>
              -----------------------------------------------------------------------------
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
