import './App.css';
import { useState } from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonaDetalle from './components/PersonaDetalle';

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const clickHandler = () => {
    setShowWelcomeMessage(false);
    if (selectedOption === "vehicles") {

      const fetchVehicles = async () => {
        let url = 'https://swapi.dev/api/vehicles/';
        let vehiclesData = [];

        setIsLoading(true);

        while (url) {
          const response = await axios.get(url);
          const data = response.data;
          vehiclesData = [...vehiclesData, ...data.results];
          url = data.next;
        }

        if (id <= vehiclesData.length && id > 0) {
          console.log(vehiclesData[id - 1]);

          setResult({
            name: vehiclesData[id - 1].name,
            model: vehiclesData[id - 1].model,
            manufacturer: vehiclesData[id - 1].manufacturer,
            cost_in_credits: vehiclesData[id - 1].cost_in_credits,
            length: vehiclesData[id - 1].length
          });
          setError(null);
        } else {
          setResult([]);
          setError("Estos no son los droides que estás buscando.");
        }
        setIsLoading(false);
      };
      fetchVehicles();
      
    } else {
      const url = `https://swapi.dev/api/${selectedOption}/${id}/`;

      setIsLoading(true);

      axios
        .get(url)
        .then(response => {
          const data = response.data;

          if (selectedOption === "people") {
            setResult({
              name: data.name,
              height: data.height,
              mass: data.mass,
              hair_color: data.hair_color,
              skin_color: data.skin_color,
              eye_color: data.eye_color,
              birth_year: data.birth_year,
              gender: data.gender
            });
          } else if (selectedOption === "films") {
            setResult({
              title: data.title,
              opening_crawl: data.opening_crawl,
              director: data.director
            });
          } else if (selectedOption === "planets") {
            setResult({
              name: data.name,
              rotation_period: data.rotation_period,
              orbital_period: data.orbital_period,
              diameter: data.diameter,
              climate: data.climate,
              gravity: data.gravity
            });
          } else if (selectedOption === "species") {
            setResult({
              name: data.name,
              classification: data.classification,
              designation: data.designation,
              average_height: data.average_height,
              skin_colors: data.skin_colors,
              hair_colors: data.hair_colors
            });
          }
          setError(null);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setResult(null);
          setError("Estos no son los droides que estás buscando.");
          setIsLoading(false);
        });
    }
  };

  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
    setResult(null);
    setError(null);
  };

  const handleIdChange = e => {
    setId(e.target.value);
  };

  return (
    <>
      <div>
      <>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Seleccione una opción</option>
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="films">Films</option>
          <option value="species">Species</option>
          <option value="vehicles">Vehicles</option>
        </select>
        <input type="text" value={id} onChange={handleIdChange} placeholder="Ingrese el ID"/>
        <button onClick={clickHandler}>Buscar</button>
      </>

      {isLoading && (
        <div>
          <p className='Resultado'>Búsqueda en proceso joven Padawan...</p>
          <img className='Resultado' src="https://assets.teenvogue.com/photos/572a3302321c4faf6ae8a317/master/w_2580%2Cc_limit/R2SCREAM.gif" alt="Cargando..." />
        </div>
      )}


          {!isLoading && error && (
            <div>
              <p className='Resultado'>{error}</p>
              <img className='Resultado' src="https://gifdb.com/images/high/obi-wan-drawing-lightsaber-ready-to-fight-3shwqbv0cw11dccs.webp" alt="Error" />
            </div>
          )}

          {result && !isLoading && !error && (
            <div>
              {selectedOption === "people" && (
                <div className='Resultado'>
                  <h2>{result.name}</h2>
                  <p>Height: {result.height}</p>
                  <p>Mass: {result.mass}</p>
                  <p>Hair Color: {result.hair_color}</p>
                  <p>Skin Color: {result.skin_color}</p>
                  <p>Eye Color: {result.eye_color}</p>
                  <p>Birth Year: {result.birth_year}</p>
                  <p>Gender: {result.gender}</p>
                </div>
              )}
              {selectedOption === "films" && (
                <div className='Resultado'>
                  <h2>{result.title}</h2>
                  <h3>Opening Crawl</h3>
                  <p className='Sinopsis'>{result.opening_crawl}</p>
                  <h3>Director</h3>
                  <p>{result.director}</p>
                </div>
              )}
              {selectedOption === "planets" && (
                <div className='Resultado'>
                  <h2>{result.name}</h2>
                  <p>Rotation Period: {result.rotation_period}</p>
                  <p>Orbital Period: {result.orbital_period}</p>
                  <p>Diameter: {result.diameter}</p>
                  <p>Climate: {result.climate}</p>
                  <p>Gravity: {result.gravity}</p>
                </div>
              )}
              {selectedOption === "species" && (
                <div className='Resultado'>
                  <h2>{result.name}</h2>
                  <p>Classification: {result.classification}</p>
                  <p>Designation: {result.designation}</p>
                  <p>Average Height: {result.average_height}</p>
                  <p>Skin Colors: {result.skin_colors}</p>
                  <p>Hair Colors: {result.hair_colors}</p>
                </div>
              )}
              {selectedOption === "vehicles" && (
                <div className='Resultado'>
                  <h2>{result.name}</h2>
                  <p>Model: {result.model}</p>
                  <p>Manufacturer: {result.manufacturer}</p>
                  <p>Cost in credits Height: {result.cost_in_credits}</p>
                  <p>Length: {result.length}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/:id" element={<PersonaDetalle/>} />
            <Route path="/" element={showWelcomeMessage && <h1 className='Resultado' id='mensaje-bienvenida'>May the force be with you...</h1>}/>
          </Routes>
        </BrowserRouter>
    </>    
  );
}

export default App;