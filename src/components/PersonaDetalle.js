import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const PersonaDetalle = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      const url = `https://swapi.dev/api/people/${id}/`;

      setIsLoading(true);

      try {
        const response = await axios.get(url);
        const data = response.data;

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

        setError(null);
      } catch (error) {
        console.log(error);
        setResult(null);
        setError("Estos no son los droides que estás buscando.");
      }

      setIsLoading(false);
    };

    fetchPerson();
  }, [id]);

  return (
    <div>
      {isLoading && <p className='Resultado'>Búsqueda en proceso joven Padawan...</p>}

      {!isLoading && error && <p>{error}</p>}

      {result && !isLoading && !error && (
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
    </div>
  );
}

export default PersonaDetalle;