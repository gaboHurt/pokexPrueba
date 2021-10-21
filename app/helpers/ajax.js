export const getPokemons = async (url) => {
  url ? url : 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  try {
    let res = await fetch(url);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    let msg = err.statusText || 'Ocurrio un error';
    document.querySelector('.pokemon-container').innerHTML = `
    <p class="error">
      Error ${err.status}:${msg}
    </p>`;
  }
};

export const getPokemonData = async (props) => {
  let { url, cbSuccess } = props;
  try {
    let res = await fetch(url);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    let data = await res.json();
    cbSuccess(data);
    return data;
  } catch (err) {
    console.log(err);
    let msg = err.statusText || 'Ocurrio un error';
    let $span = document.createElement('span');
    $span.textContent = `Error ${err.status}:${msg}`;
    document.querySelector('.pokemon-container').appendChild($span);
  }
};

export const searchPokemon = async (props) => {
  let { url, cbSuccess, query } = props;
  try {
    let res = await fetch(url);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    let data = await res.json();
    cbSuccess(data);

    return data;
  } catch (err) {
    console.log(err);
    let msg = err.statusText || `No se encontro la busqueda "${query}"`;
    document.querySelector('.pokemon-container').innerHTML = `
    <p class="error">
      Error ${err.status}:${msg}
    </p>`;
  }
};
