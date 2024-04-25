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
    console.log(data);
  };

  useEffect(() => {
    getPeliculas();
  }, [peliculas]);
  return <></>;
}

export default App;
