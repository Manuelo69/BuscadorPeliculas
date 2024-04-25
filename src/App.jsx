import { useRef, useState } from "react";
import "./App.css";
import ListaPeliculas from "./Components/ListaPeliculas/ListaPeliculas";

function App() {
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda
  const [peliculas, setPeliculas] = useState([]); // Estado para las películas
  const [buscando, setBuscando] = useState(false); //Estado de la busqueda
  const [ordenadoPorTitulo, setOrdenadoPorTitulo] = useState(false); // Estado para indicar si las películas están ordenadas por título

  const ultimaBusqueda = useRef(""); // Referencia para la última búsqueda

  const getPeliculas = async (peli) => {
    try {
      setBuscando(true);
      const response = await fetch(
        `https://omdbapi.com/?s=${peli}*&apikey=dd8f4ac5` //Llamada de la api dinamica con la s
      );
      const data = await response.json();
      setPeliculas(data.Search || []); // Actualizar el estado de las películas
      if (ordenadoPorTitulo) {
        // Ordenar películas por título si está habilitado
        peliculas.sort((a, b) => a.Title.localeCompare(b.Title));
      }
      console.log("Data from API:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setBuscando(false); // Finalizar la búsqueda, establecer buscando a false
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
          {buscando ? "Buscando..." : "Buscar Película"}
        </button>
      </form>
      <ListaPeliculas peliculas={peliculas} />
    </>
  );
}

export default App;
