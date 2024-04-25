import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [peliculas, setPeliculas] = useState("");

  const ultimaBusqueda = useRef(null);

  const getPeliculas = async (peli) => {
    setPeliculas(peli);
    const response = await fetch(
      `https://omdbapi.com/?s=${peli}*&apikey=dd8f4ac5`
    );
    const data = await response.json();
    return data;
  };

  const handleInputChange = (event) => {
    setPeliculas(event.target.value);
  };

  const handleButtonClick = () => {
    if (peliculas.trim() !== ultimaBusqueda.current) {
      ultimaBusqueda.current = peliculas.trim();
      getPeliculas(ultimaBusqueda.current);
    }
  };

  useEffect(() => {
    if (peliculas.trim() !== "") {
      getPeliculas(peliculas);
    }
  }, [peliculas]);
  return (
    <>
      <form action="#">
        <h1>Buscador de peliculas</h1>
        <label htmlFor="peliculas">
          <legend>Introduce pelicula</legend>
          <input
            type="text"
            name="peliculas"
            id="peliculas"
            placeholder="Introduce pelicula"
            value={peliculas}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleButtonClick}>Buscar Pelicula</button>
      </form>
      <table></table>
    </>
  );
}

export default App;
