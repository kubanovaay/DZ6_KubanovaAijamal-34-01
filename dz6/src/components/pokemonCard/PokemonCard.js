// PokemonCard.js
import React, { useState, useEffect } from 'react';
import '../../components/pokemonCard/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchPokemonData = async () => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            setPokemonData(data);
        };

        fetchPokemonData();
    }, [pokemon.url]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="pokemon-card">
            {pokemonData && (
                <>
                    <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemon.name} />
                    <p>{pokemon.name}</p>
                    {showDetails && (
                        <div>
                            <p>Weight: {pokemonData.weight}</p>
                            <p>Height: {pokemonData.height}</p>
                        </div>
                    )}
                    <button onClick={toggleDetails} className="pokemon-details-btn">{showDetails ? 'Hide Details' : 'Подробнее'}</button>
                </>
            )}
        </div>
    );
};

export default PokemonCard;
