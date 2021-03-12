import btn_pokemonFavorito from './btn-favorito.js';
import pintarTipoPokemon from './pintarTiposPokemon.js';

const d = document,
  $main = d.querySelector('main'),
  $templatePok = d.getElementById('pokemon-template').content,
  $loader = d.querySelector('.loader'),
  $fragment = d.createDocumentFragment(),
  $links = d.querySelector('.links'),
  $footer = d.querySelector('footer');
let pok_fav = [];
let breakpoint = window.matchMedia('(max-width:680px)');

//devolvera los 100 primeros pokemon al cargar la pagina
let offset = 0,
  limit = 20,
  pokeAPI = `https://pokeapi.co/api/v2/pokemon`;

d.addEventListener('DOMContentLoaded', (e) => {
  loadPokemon();
  //Validamos si exiten pokemon favoritos en el localStorage
  if (localStorage.getItem('pokemonFav')) {
    //Convertimos el resultado a formato json y agregamos los pokemon al arreglo
    JSON.parse(localStorage.getItem('pokemonFav')).forEach((el) => {
      pok_fav.push(el);
    });
  }
  btn_pokemonFavorito(pok_fav);
});
s
d.addEventListener('submit', (e) => {
  if (e.target.matches('.form-pokemon')) {
    e.preventDefault();
    if (e.target['input-pokemon'].value.trim() === '') {
      return;
    }
    console.log('click');
    location.href = `./v/pokemon.html?idName=${e.target[
      'input-pokemon'
    ].value.toLowerCase()}`;
    e.target['input-pokemon'].value = '';
  }
});

d.addEventListener('click', (e) => {
  if (e.target.matches('.links a')) {
    e.preventDefault();
    $main.innerHTML = '';
    offset = offset + limit;
    loadPokemon();
  }
});

//al momento de recargar el scrollTop pasara a 0
window.addEventListener('unload', (e) => {
  d.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', (e) => {
  const { scrollTop, clientHeight, scrollHeight } = d.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    offset = offset + limit;
    loadPokemon();
  }
});

//Obtener los datos desde la pokeapi
const loadPokemon = async () => {
  $loader.classList.add('visible');
  $footer.classList.remove('visible');
  try {
    let res = await fetch(`${pokeAPI}/?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    let data = await res.json();
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
    breakpoint.addListener(responsive);
    responsive(breakpoint, data.previous, data.next);

    $loader.classList.remove('visible');
    $footer.classList.add('visible');
  } catch (err) {
    console.log(err);
    let msg = err.statusText || 'Ocurrió un error';
    $main.innerHTML = `<h2>Error ${err.status}: ${msg}</h2>`;
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
    .setAttribute('href', `./v/pokemon.html?idName=${pokemon.name}`);
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

const responsive = (e, dataprevious, datanext) => {
  if (e.matches) {
    let $prevLink = '',
      $nextLink = '';
    $prevLink = dataprevious ? `<a href="${dataprevious}">⏪</a>` : '';
    $nextLink = datanext ? `<a href="${datanext}">⏩</a>` : '';
    $links.innerHTML = $prevLink + '' + $nextLink;
  } else {
    $links.innerHTML = '';
  }
};
