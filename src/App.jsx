import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [peliculas, SetPeliculas] = useState("");
  const getPeliculas = async (peli) => {
    SetPeliculas(peli);
    const response = await fetch(
      `https://omdbapi.com/?s=${peliculas}*&apikey=dd8f4ac5`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getPeliculas();
  }, [peliculas]);
  return (
    <>
      <form action="">
        <h1>Buscador de peliculas</h1>
        <label htmlFor="peliculas">
          <legend>Introduce pelicula</legend>
          <input
            type="text"
            name="peliculas"
            id="peliculas"
            placeholder="Introduce pelicula"
          />
        </label>
      </form>
      <table></table>
    </>
  );
}

export default App;
