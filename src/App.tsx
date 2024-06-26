import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ListaPeliculas from "./Components/ListaPeliculas/ListaPeliculas";

function App(): JSX.Element {
  const [busqueda, setBusqueda] = useState<string>("One piece"); // Estado para la búsqueda
  const [peliculas, setPeliculas] = useState<any[]>([]); // Estado para las películas
  const [buscando, setBuscando] = useState<boolean>(false); // Estado de la búsqueda
  const [ordenadoPorTitulo, setOrdenadoPorTitulo] = useState<boolean>(false); // Estado para indicar si las películas están ordenadas por título

  const ultimaBusqueda = useRef<string>(""); // Referencia para la última búsqueda
  const timeoutRef = useRef<number | null>(null); // Referencia para el timeout del debounce

  const getPeliculas = async (peli: string) => {
    try {
      setBuscando(true);
      const response = await fetch(
        `https://omdbapi.com/?s=${peli}*&apikey=dd8f4ac5` //Llamada de la api dinámica
      );
      const data = await response.json();
      setPeliculas(data.Search || []); // Actualizar el estado de las películas
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setBuscando(false); // Finalizar la búsqueda, establecer buscando a false
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    setBusqueda(inputValue); // Actualizar el estado de la búsqueda
    // Limpiar el timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Establecer un nuevo timeout para realizar la búsqueda después de 500ms
    timeoutRef.current = setTimeout(() => {
      // Realizar la búsqueda con el valor actualizado
      if (inputValue.trim() !== ultimaBusqueda.current.trim()) {
        getPeliculas(inputValue.trim());
        ultimaBusqueda.current = inputValue.trim(); // Actualizar la última búsqueda
      }
    }, 500);
  };

  const handleButtonClick = () => {
    // Realizar la búsqueda cuando se haga clic en el botón
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
    // Reordenar las películas cuando cambie el estado de ordenadoPorTitulo
    if (ordenadoPorTitulo) {
      setPeliculas((prevPeliculas) =>
        [...prevPeliculas].sort((a, b) => a.Title.localeCompare(b.Title))
      );
      if (busqueda !== "One piece") { 
        getPeliculas(busqueda);
      }
      getPeliculas("One piece");
    } else {
      // Si no está ordenado, restaurar el orden original
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
