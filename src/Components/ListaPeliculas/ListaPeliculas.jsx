/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function ListaPeliculas({ peliculas }) {
  return (
    <div className="pelicula grid grid-cols-auto-fit-minmax gap-4 content-center">
      {peliculas.map((pelicula) => (
        <div
          key={pelicula.imbdID}
          className="grid grid-flow-col bg-white rounded-xl p-4 mt-4"
        >
          <div className="info-pelicula grid grid-cols-1 gap-2 items-center">
            <h3 className="overflow-hidden whitespace-no-wrap line-clamp-2 text-xl">
              {pelicula.Title}
            </h3>
            <p className="font-bold">Año: {pelicula.Year}</p>
            <div className="flex justify-center">
              <img
                src={pelicula.Poster}
                alt={pelicula.Title}
                className="h-52 object-contain"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
