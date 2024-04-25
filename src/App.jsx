import { useEffect } from "react";
import "./App.css";

function App() {
  const getPeliculas = async () => {
    const response = await fetch(
      `https://omdbapi.com/?s=Guardianes*&apikey=dd8f4ac5`
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getPeliculas();
  }, []);
  return <></>;
}

export default App;
