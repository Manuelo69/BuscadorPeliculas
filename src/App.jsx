import { useEffect, useRef, useState } from "react";
import "./App.css";
import ListaPeliculas from "./Components/ListaPeliculas/ListaPeliculas";

function App() {
  const [busqueda, setBusqueda] = useState("One piece"); // Estado para la búsqueda
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

  const handleCheckboxChange = () => {
    setOrdenadoPorTitulo(!ordenadoPorTitulo); // Alternar el estado del checkbox
  };

  useEffect(() => {
    // Obtener las primeras 10 películas al cargar la página
    getPeliculas(busqueda);
    setBusqueda("");
  }, []);

  useEffect(() => {
    if (ordenadoPorTitulo) {
      setPeliculas((prevPeliculas) =>
        [...prevPeliculas].sort((a, b) => a.Title.localeCompare(b.Title))
      );
    }
  }, [ordenadoPorTitulo]);

  return (
    <>
      <form action="#" className="flex flex-col gap-3 items-center">
        <h1 className="mb-2 font-bold shadow-sm">Buscador de películas</h1>
        <label htmlFor="peliculas">
          <input
            type="text"
            name="peliculas"
            id="peliculas"
            placeholder="Introduce película"
            value={busqueda}
            onChange={handleInputChange}
            className="p-2 rounded-xl w-72"
          />
        </label>
        <label htmlFor="ordenar">
          Ordenador por titulo
          <input
            type="checkbox"
            id="ordenar"
            name="ordenar"
            checked={ordenadoPorTitulo}
            onChange={handleCheckboxChange}
            className=""
          />
        </label>
        <button type="button" onClick={handleButtonClick} className="w-40">
          {buscando ? "Buscando..." : "Buscar Película"}
        </button>
      </form>
      <ListaPeliculas peliculas={peliculas} />
    </>
  );
}

export default App;
