import btn_pokemonFavorito from './btn-favorito.js';
import pintarTipoPokemon from './pintarTiposPokemon.js';

const d = document,
  $main = d.querySelector('main'),
  $links = d.querySelector('.links'),
  $templatePok = d.getElementById('pokemon-template').content,
  $loader = d.querySelector('.loader'),
  $fragment = d.createDocumentFragment(),
  $footer = d.querySelector('footer');
let pok_fav = [];

//devolvera los 100 primeros pokemon al cargar la pagina
let pokeAPI = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30';

d.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('pagPokemon')) {
    loadPokemon(localStorage.getItem('pagPokemon'));
  } else {
    loadPokemon(pokeAPI);
  }
  //Validamos si exiten pokemon favoritos en el localStorage
  if (localStorage.getItem('pokemonFav')) {
    //Convertimos el resultado a formato json y agregamos los pokemon al arreglo
    JSON.parse(localStorage.getItem('pokemonFav')).forEach((el) => {
      pok_fav.push(el);
    });
  }
  btn_pokemonFavorito(pok_fav);
});

d.addEventListener('click', (e) => {
  if (e.target.matches('.links a')) {
    e.preventDefault();
    $main.innerHTML = '';
    let url = e.target.getAttribute('href');
    localStorage.setItem('pagPokemon', url);
    loadPokemon(e.target.getAttribute('href', url));
  }
});

//Obtener los datos desde la pokeapi
const loadPokemon = async (url) => {
  $loader.classList.add('visible');
  $footer.classList.remove('visible');
  try {
    let res = await fetch(url);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    let data = await res.json(),
      $prevLink = '',
      $nextLink = '';
    //console.log(data);
    //Acediendo a los pokemon
    for (let i = 0; i < data.results.length; i++) {
      try {
        let resPokemon = await fetch(data.results[i].url);

        if (!resPokemon.ok)
          throw {
            status: resPokemon.status,
            statusText: resPokemon.statusText,
          };
        let pokemonData = await resPokemon.json(),
          pokemon = {
            name: pokemonData.name,
            img: pokemonData.sprites.front_default,
            id: pokemonData.id,
            type: pokemonData.types,
          };
        //console.log(pokemon.id);
        showPokemon(pokemon, data.results[i].url);
      } catch (error) {
        console.log(error);
        let msgPok = error.statusText || 'Ocurrio un problema con este pokemon';
        let $clonError = d.importNode($templatePok, true);
        $clonError.querySelector(
          '.pokemon-name'
        ).textContent = `Error ${error.status}: ${msgPok}`;
        $fragment.append($clonError);
      }
    }

    $main.append($fragment);
    //Agregamos las flechas prev y next y las insertamos en el DOM
    $prevLink = data.previous ? `<a href="${data.previous}">⏪</a>` : '';
    $nextLink = data.next ? `<a href="${data.next}">⏩</a>` : '';
    $links.innerHTML = $prevLink + '' + $nextLink;
  } catch (err) {
    console.log(err);
    let msg = err.statusText || 'Ocurrió un error';
    $main.innerHTML = `<h2>Error ${error.status}: ${msg}</h2>`;
  } finally {
    $loader.classList.remove('visible');
    $footer.classList.add('visible');
  }
};

//Mostrar informacion de los pokemon en el index
const showPokemon = (pokemon, url) => {
  let $clonePokemon = d.importNode($templatePok, true);
  $clonePokemon.querySelector('.pokemon-img').src = `${pokemon.img}`;
  $clonePokemon
    .querySelector('.pokemon-name a')
    .setAttribute(
      'href',
      `./v/pokemon.html?name=${pokemon.name}&id=${pokemon.id}`
    );
  $clonePokemon.querySelector('.pokemon-name a').textContent = pokemon.name;
  $clonePokemon.querySelector('.btn-pokemon-fav').dataset.name = pokemon.name;
  $clonePokemon.querySelector('.btn-pokemon-fav').dataset.url = url;
  $clonePokemon.querySelector('.btn-pokemon-fav').dataset.img = pokemon.img;
  $clonePokemon.querySelector('.btn-pokemon-fav').dataset.id = pokemon.id;
  $clonePokemon.querySelector('.btn-pokemon-fav').dataset.type =
    pokemon.type[0].type.name;

  pok_fav.forEach((el) => {
    if (el.name === pokemon.name) {
      $clonePokemon.querySelector('.btn-pokemon-fav').textContent = '💚';
    }
  });
  pintarTipoPokemon(pokemon.type[0].type.name, $clonePokemon);

  $fragment.append($clonePokemon);
};
