const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch('https://pokeapi.co/api/v2/pokemon/'+ pokemon);
    const data = APIresponse.json;
    return data;
}

const renderPokemon = (pokemon) => {
        
}