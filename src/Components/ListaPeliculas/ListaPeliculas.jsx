/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function ListaPeliculas({ peliculas }) {
  return (
    <div className="peliculas">
      {peliculas.map((pelicula) => (
        <div key={pelicula.imbdID}></div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
