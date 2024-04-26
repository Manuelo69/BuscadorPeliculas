/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function ListaPeliculas({ peliculas }) {
  return (
    <div className="pelicula grid grid-cols-auto-fit-minmax gap-4 content-center">
      {peliculas.map((pelicula) => (
        <div
          key={pelicula.imbdID}
          className="grid grid-flow-col bg-white rounded-xl p-4 mt-4 flex"
        >
          <div className="info-pelicula grid" key={pelicula.imbdID + "2"}>
            <h3 className="content-start gap-3 grid overflow-hidden whitespace-no-wrap">
              {pelicula.Title}
            </h3>
            <p className="font-bold content-center">Año: {pelicula.Year}</p>
            <div className="content-end">
              <img
                src={pelicula.Poster}
                alt={pelicula.Title}
                className="content-end"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
