import { useEffect, useState } from 'react'
import './App.css'

const pokemonNames = [
  "charmander",
  "squirtle",
  "ditto",
  "pikachu",
  "eevee",
  "bulbasaur"
];

function usePokemonBatch() {
  const [pokemonImageBatch, setPokemonImageBatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Kick off all fetches in parallel
        const results = await Promise.all(
          pokemonNames.map((name) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, {
              signal: controller.signal,
            }).then((res) => {
              if (!res.ok) throw new Error(`Failed for ${name}`);
              return res.json();
            })
          )
        );

        // Map to a simpler structure for your game
        setPokemonImageBatch(
          results.map((d) => ({
            name: d.name,
            imageURL: d.sprites?.front_default || "",
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }
      load();
      return () => controller.abort();
    });

  return { pokemonImageBatch, loading, error };
}

function Card() {

}

function Cards({ pokemonImageBatch }) {

}

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedPokemon, setPickedPokemon] = useState([]);

  const { pokemonImageBatch, loading, error } = usePokemonBatch();

  if (loading) return <p>Loading Pokémon…</p>;
  if (error) return <p>Oops: {error.message}</p>;
  
  const handleCardClick = () => {
    if 
  }

  return (
    <>
      <div className="app-container">
        <div className="header">
          <div className="title">Pokemon Memory Game</div>
          <div className="score">
            <div>Score: { score }</div>
            <div>Best Score: { bestScore }</div> 
          </div>
          <div className="game">
            generate cards
          </div>
        </div>
      </div>
    </>
  )
}
