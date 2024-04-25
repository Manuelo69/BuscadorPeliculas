import { useRef, useState } from "react";
import "./App.css";
import ListaPeliculas from "./Components/ListaPeliculas/ListaPeliculas";

function App() {
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda
  const [peliculas, setPeliculas] = useState([]); // Estado para las películas

  const ultimaBusqueda = useRef(""); // Referencia para la última búsqueda

  const getPeliculas = async (peli) => {
    try {
      const response = await fetch(
        `https://omdbapi.com/?s=${peli}*&apikey=dd8f4ac5`
      );
      const data = await response.json();
      setPeliculas(data.Search || []); // Actualizar el estado de las películas
      console.log("Data from API:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    setBusqueda(event.target.value); // Actualizar el estado de la búsqueda
  };

  const handleButtonClick = () => {
    if (busqueda.trim() !== ultimaBusqueda.current.trim()) {
      getPeliculas(busqueda.trim());
      ultimaBusqueda.current = busqueda.trim(); // Actualizar la última búsqueda
    }
  };

  return (
    <>
      <form action="#">
        <h1>Buscador de películas</h1>
        <label htmlFor="peliculas">
          <legend>Introduce película</legend>
          <input
            type="text"
            name="peliculas"
            id="peliculas"
            placeholder="Introduce película"
            value={busqueda} // Usar el valor del estado de búsqueda
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleButtonClick}>
          Buscar Película
        </button>
      </form>
      <ListaPeliculas peliculas={peliculas} />
    </>
  );
}

export default App;
