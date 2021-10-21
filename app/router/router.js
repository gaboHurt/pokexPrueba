import poke_api from '../helpers/poke_api.js';
import { getPokemons, getPokemonData, searchPokemon } from '../helpers/ajax.js';
import { PokemonCard } from '../components/PokemonCard.js';
import { Pagination } from '../components/Pagination.js';
import { PokemonSolo } from '../components/PokemonSolo.js';
import { Favorite } from '../components/Favorite.js';
import { CantFavoritos } from '../components/CantFavoritos.js';

export const Router = async () => {
  const d = document,
    $main = d.querySelector('.pokemon-container');
  $main.innerHTML = '';
  d.documentElement.scrollTop = 0;

  let { hash } = location;

  if (!hash || hash === '#/') {
    d.querySelector('.loader').classList.add('visible');
    //Llamamos a todos los pokemons mediante la funcion getPokemons
    //Los parametros son el offset y el limit

    let apiURL = localStorage.getItem('pokeApi')
      ? localStorage.getItem('pokeApi')
      : poke_api.POKEMONS;

    const data = await getPokemons(apiURL);

    //creamos un array para almacenar los datos que nos traera las url de los pokemon
    const template = d.createDocumentFragment();
    let promise = data.results.map(async (pokemon) => {
      return await getPokemonData({
        url: pokemon.url,
        cbSuccess: (pok) => {
          template.append(PokemonCard(pok));
        },
      });
    });

    //esperamos las promesas con los datos de cada pokemon
    let results = await Promise.all(promise);

    results.forEach((pok) => {});

    $main.appendChild(template);
    $main.prepend(Pagination(data));
    $main.appendChild(Pagination(data));
  }
  if (hash === '#/favorites') {
    let fragmentFav = d.createDocumentFragment();
    poke_api.pokeFav.forEach((pokemon) => {
      fragmentFav.append(Favorite(pokemon));
    });

    $main.insertAdjacentElement(
      'beforebegin',
      CantFavoritos(poke_api.pokeFav.length)
    );
    $main.appendChild(fragmentFav);
  }

  if (hash.includes('#/pokemon/')) {
    d.querySelector('.loader').classList.add('visible');
    await searchPokemon({
      url: `${poke_api.POKE_API}/${hash.slice(2)}`,
      query: hash.slice(2),
      cbSuccess: (pokemon) => {
        $main.appendChild(PokemonSolo(pokemon));
      },
    });
  }
  d.querySelector('.loader').classList.remove('loader-active');
  d.querySelector('footer').classList.add('visible');
};
