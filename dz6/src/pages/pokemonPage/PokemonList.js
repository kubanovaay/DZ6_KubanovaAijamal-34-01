// PokemonList.js
import React, { useState, useEffect } from 'react';
import PokemonCard from '../../components/pokemonCard/PokemonCard';
import '../pokemonPage/PokemonList.css';


const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPage, setNextPage] = useState('');

    useEffect(() => {
        const fetchPokemonList = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');
            const data = await response.json();
            setPokemonList(data.results);
            setNextPage(data.next);
        };

        fetchPokemonList();
    }, []);

    const loadNextPage = async () => {
        if (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            setPokemonList([...pokemonList, ...data.results]);
            setNextPage(data.next);
        }
    };

    return (
        <div>
            <div>
                <h1 className='h1'>Pokemon</h1>
            </div>
            <div className="pokemon-grid">
                {pokemonList.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </div>
            <button onClick={loadNextPage} className="load-more-btn">Load More</button>
        </div>
    );
};

export default PokemonList;

