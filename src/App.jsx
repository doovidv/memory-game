import { useEffect, useState } from 'react'
import './App.css'

const POKEMON_NAMES = [
  "charmander",
  "squirtle",
  "ditto",
  "pikachu",
  "eevee",
  "bulbasaur"
]

function usePokemonImageBatch(names) {
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
          names.map((name) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
              signal: controller.signal,
            }).then((res) => {
              if (!res.ok) throw new Error(`Failed for ${name}`);
              return res.json();
            })
          )
        );

        console.log(results);

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
    }, [names]); // dependency arrays are important - without one, bc I change a state variable in the useEffect, it triggers infinite rerender loop

  return { pokemonImageBatch, loading, error };
}

function Card({ id, name, imageURL, onClick }) {
  return(
    <>
    </>
  )
}

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedPokemon, setPickedPokemon] = useState([]);

  const pokemonNames = POKEMON_NAMES;

  const { pokemonImageBatch, loading, error } = usePokemonImageBatch(pokemonNames);

  if (loading) return <p>Loading Pokémon…</p>;
  if (error) return <p>Oops: {error.message}</p>;

  if (!loading) { console.log(pokemonImageBatch) } 
  
  const handleCardClick = () => {
    console.log('hello');
  }
  //TODO: Change the pokemonImageBatch object to be in the format {[name:string]:string} so after shuffling the list of pokemon, 
  // I can generate them in that order accessing the url of the pokemon by name 
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
            {
              pokemonImageBatch.map((pokemon) => {
                <Card id='123' name={ pokemon?.name } imageURL={ pokemon?.imageURL } onClick={ handleCardClick } />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
